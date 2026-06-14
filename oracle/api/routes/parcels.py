"""
/api/oracle/parcels/{pin}               ← parcel details
/api/oracle/parcels/{pin}/history/peek  ← free preview
/api/oracle/parcels/{pin}/history       ← full history (x402 gated) + ZoneProof seal
/api/oracle/verify/{report_hash}        ← verify a report seal
"""
import hashlib
import json
import os
from datetime import datetime, timezone

from eth_account import Account
from eth_account.messages import encode_defunct
from fastapi import APIRouter, HTTPException

from oracle.api.store import get_parcel, get_parcel_history, get_parcel_history_peek

router = APIRouter(tags=["parcels"])

# In-memory registry of issued report seals  { hash: seal_dict }
_REPORT_REGISTRY: dict[str, dict] = {}

ORACLE_PRIVATE_KEY = os.getenv("HEDERA_PRIVATE_KEY", "")
ORACLE_ADDRESS     = os.getenv("HEDERA_EVM_ADDRESS", "").lower()
ORACLE_ENS         = os.getenv("ORACLE_ENS", "zoneproof.eth")


def _sign_report(data: dict) -> dict:
    """Hash the report payload and sign it with the oracle ECDSA key."""
    generated_at = datetime.now(timezone.utc).isoformat()

    # Canonical payload — only stable fields so the hash is reproducible
    payload = {
        "pin":            data.get("parcel", {}).get("pin", ""),
        "site_address":   data.get("parcel", {}).get("site_address", ""),
        "total_petitions":data.get("total_petitions", 0),
        "on_chain_count": data.get("on_chain_count", 0),
        "oracle_ens":     ORACLE_ENS,
        "oracle_address": ORACLE_ADDRESS,
        "generated_at":   generated_at,
    }
    payload_json  = json.dumps(payload, sort_keys=True, separators=(",", ":"))
    report_hash   = "0x" + hashlib.sha256(payload_json.encode()).hexdigest()

    # ECDSA sign with oracle private key (Ethereum personal_sign / EIP-191)
    signature = ""
    if ORACLE_PRIVATE_KEY:
        msg       = encode_defunct(text=f"ZoneProof Report\n{report_hash}")
        signed    = Account.sign_message(msg, private_key=ORACLE_PRIVATE_KEY)
        signature = signed.signature.hex()
        if not signature.startswith("0x"):
            signature = "0x" + signature

    seal = {
        "report_hash":    report_hash,
        "oracle_signature": signature,
        "oracle_ens":     ORACLE_ENS,
        "oracle_address": ORACLE_ADDRESS,
        "generated_at":   generated_at,
        "verify_url":     f"/verify/{report_hash}",
    }

    # Register so the verify endpoint can look it up
    _REPORT_REGISTRY[report_hash] = {**seal, "pin": payload["pin"], "site_address": payload["site_address"]}
    return seal


@router.get("/parcels/{pin}")
def get_parcel_detail(pin: str):
    parcel = get_parcel(pin)
    if not parcel:
        raise HTTPException(status_code=404, detail=f"Parcel {pin} not found")
    return parcel


@router.get("/parcels/{pin}/history/peek")
def get_parcel_history_peek_route(pin: str):
    result = get_parcel_history_peek(pin)
    if not result:
        raise HTTPException(status_code=404, detail=f"Parcel {pin} not found")
    return result


@router.get("/parcels/{pin}/history")
def get_parcel_history_route(pin: str):
    result = get_parcel_history(pin)
    if not result:
        raise HTTPException(status_code=404, detail=f"Parcel {pin} not found")
    result["verification_seal"] = _sign_report(result)
    return result


@router.get("/verify/{report_hash}")
def verify_report(report_hash: str):
    """Verify a ZoneProof report seal — resolves oracle identity and checks signature."""
    seal = _REPORT_REGISTRY.get(report_hash)
    if not seal:
        return {
            "valid":   False,
            "reason":  "Report hash not found. This report was not issued by this oracle, or the oracle has restarted.",
            "report_hash": report_hash,
        }

    # Re-verify signature
    valid = False
    if ORACLE_PRIVATE_KEY and seal.get("oracle_signature"):
        try:
            msg      = encode_defunct(text=f"ZoneProof Report\n{report_hash}")
            recovered = Account.recover_message(msg, signature=seal["oracle_signature"])
            valid    = recovered.lower() == ORACLE_ADDRESS
        except Exception:
            valid = False

    return {
        "valid":            valid,
        "report_hash":      report_hash,
        "oracle_ens":       seal["oracle_ens"],
        "oracle_address":   seal["oracle_address"],
        "pin":              seal["pin"],
        "site_address":     seal["site_address"],
        "generated_at":     seal["generated_at"],
        "message":          "✅ Authentic ZoneProof report" if valid else "❌ Signature verification failed",
    }