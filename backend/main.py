from fastapi import FastAPI

from database.models import Post, Search
from database.logic import group_logic, post_logic
from pydantic import BaseModel

class Post(BaseModel):
    id: int
    body: str
    sentiment: str
    group_search_id: int

class Search(BaseModel):
    id: int
    sentiment: str
    searched_at: str

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/posts/")
async def create_post(post: Post):
    post = post_logic.create_post(post)
    # create post in pydantic model
    return {"id": post.id, "body": post.body, "sentiment": post.sentiment, "group_search_id": post.group_search_id}
    

@app.get("/posts/")
async def get_posts():
    posts = post_logic.get_posts()
    # Create dictionary to return
    return [{"id": post.id, "body": post.body, "sentiment": post.sentiment, "group_search_id": post.group_search_id} for post in posts]

@app.get("/posts/{post_id}")
async def get_post(post_id: int):
    post = post_logic.get_post(post_id)
    # Create dictionary to return
    return {"id": post.id, "body": post.body, "sentiment": post.sentiment, "group_search_id": post.group_search_id}

@app.get("/searchs/")
async def get_searchs():
    searchs = group_logic.get_searchs()
    # Create dictionary to return
    return [{"id": search.id, "sentiment": search.sentiment} for search in searchs]

@app.get("/searchs/{search_id}")
async def get_search(search_id: int):
    search = group_logic.get_search(search_id)
    # Create dictionary to return
    return {"id": search.id, "sentiment": search.sentiment}

# Render funny gif
@app.get("/funny/")
async def get_funny():
    return {"message": "https://media.giphy.com/media/3o7TKsQ8UQ0Mr6qOZK/giphy.gif"}

