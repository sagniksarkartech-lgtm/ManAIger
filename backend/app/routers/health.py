from fastapi import APIRouter
from typing import Dict

router = APIRouter(tags=["Health"])

@router.get(
    "/health",
    summary="Perform Health Check",
    description="Returns backend service operational status."
)
async def health_check() -> Dict[str, str]:
    return {"status": "healthy"}
