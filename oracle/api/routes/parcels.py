"""
/api/oracle/parcels/{pin}          ← parcel details
/api/oracle/parcels/{pin}/history  ← full rezoning history for a PIN + on-chain proof

Uses the JSON store (oracle/*.json) instead of Supabase while the DB is unavailable.
"""
from fastapi import APIRouter, HTTPException
from oracle.api.store import get_parcel, get_parcel_history, get_parcel_history_peek

router = APIRouter(tags=["parcels"])


@router.get("/parcels/{pin}")
def get_parcel_detail(pin: str):
    parcel = get_parcel(pin)
    if not parcel:
        raise HTTPException(status_code=404, detail=f"Parcel {pin} not found")
    return parcel


@router.get("/parcels/{pin}/history/peek")
def get_parcel_history_peek_route(pin: str):
    """Free preview — petition count only, no details. Not gated by x402."""
    result = get_parcel_history_peek(pin)
    if not result:
        raise HTTPException(status_code=404, detail=f"Parcel {pin} not found")
    return result


@router.get("/parcels/{pin}/history")
def get_parcel_history_route(pin: str):
    result = get_parcel_history(pin)
    if not result:
        raise HTTPException(status_code=404, detail=f"Parcel {pin} not found")
    return result
