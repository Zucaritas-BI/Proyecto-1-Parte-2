from fastapi import FastAPI
from database.models import Post, Search
from database.logic import group_logic, post_logic
from pydantic import BaseModel
from database.database import Base, session, engine
from static.logic.pipeline_predict import predict
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware



class Post(BaseModel):
    body: str
    group_search_id: int

class Search(BaseModel):
    sentiment: str
    searched_at: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(engine)
db = session

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/posts/")
async def create_post(post: Post):
    post = post_logic.create_post(db, post)
    prediction = predict(post.body)
    post.sentiment = prediction
    post_logic.update_sentiment(db, post.id, prediction)
    # create post in pydantic model
    response = {"id": post.id, "body": post.body, "sentiment": post.sentiment, "group_search_id": post.group_search_id}
    response = jsonable_encoder(response)
    return JSONResponse(content=response)
    

@app.get("/posts/")
async def get_posts():
    posts = post_logic.get_posts(db)
    # Create dictionary to return
    response = [{"id": post.id, "body": post.body, "sentiment": post.sentiment, "group_search_id": post.group_search_id} for post in posts]
    response = jsonable_encoder(response)
    return JSONResponse(content=response)

@app.get("/posts/{post_id}")
async def get_post(post_id: int):
    post = post_logic.get_post(db, post_id)
    # Create dictionary to return
    response = {"id": post.id, "body": post.body, "sentiment": post.sentiment, "group_search_id": post.group_search_id}
    response = jsonable_encoder(response)
    return JSONResponse(content=response)

@app.get("/searchs/")
async def get_searchs():
    searchs = group_logic.get_searchs(db)
    # Create dictionary to return
    response = [{"id": search.id, "sentiment": search.sentiment} for search in searchs]
    response = jsonable_encoder(response)
    return JSONResponse(content=response)

@app.post("/searchs/")
async def create_search():
    search = group_logic.create_search(db)
    # Create dictionary to return
    response = {"id": search.id, "sentiment": search.sentiment, "searched_at": search.searched_at}
    response = jsonable_encoder(response)
    return JSONResponse(content=response)

@app.get("/searchs/{search_id}")
async def get_search(search_id: int):
    search = group_logic.get_search(db, search_id)
    # Create dictionary to return
    response = {"id": search.id, "sentiment": search.sentiment}
    response = jsonable_encoder(response)
    return JSONResponse(content=response)

# Render funny gif
@app.get("/funny/")
async def get_funny():
    return {"message": "https://media.giphy.com/media/3o7TKsQ8UQ0Mr6qOZK/giphy.gif"}

