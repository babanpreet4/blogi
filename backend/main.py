from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import users, posts

app = FastAPI()

# Create all tables
Base.metadata.create_all(bind=engine)

# Add CORS middleware
origins = [
    "http://localhost:3000",  # React frontend URL
    # add more URLs if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # allow React app to call API
    allow_credentials=True,
    allow_methods=["*"],             # allow all methods including OPTIONS
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="", tags=["users"])
app.include_router(posts.router, prefix="/posts", tags=["posts"])
