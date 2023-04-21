from fastapi import APIRouter, FastAPI

from .routers import sample


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

api_router = APIRouter()
api_router.include_router(sample.router)

app.include_router(api_router)