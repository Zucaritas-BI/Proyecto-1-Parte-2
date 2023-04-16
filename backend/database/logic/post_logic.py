# Post logic

from sqlalchemy.orm import Session
from database.models import Post, Search

def create_post(db: Session, post: Post):
    db_post = Post(body=post.body, group_search_id=post.group_search_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Post).offset(skip).limit(limit).all()

def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

def get_posts_by_search(db: Session, search_id: int):
    return db.query(Post).filter(Post.group_search_id == search_id).all()

def update_sentiment(db: Session, post_id: int, sentiment: str):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    db_post.sentiment = sentiment
    db.commit()
    db.refresh(db_post)
    return db_post
