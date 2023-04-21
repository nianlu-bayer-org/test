from fastapi import APIRouter


router = APIRouter()

@router.get("/sample")
async def root():
    return {"message": "sample router"}
