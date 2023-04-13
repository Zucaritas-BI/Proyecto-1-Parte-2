from sqlalchemy import Column, ForeignKey, Integer, String,DateTime
import datetime

from .database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    body = Column(String, index=True)
    sentiment = Column(String, index=True)
    group_search_id = Column(Integer, ForeignKey("searchs.id"))

class Search(Base):
    __tablename__ = "searchs"

    id = Column(Integer, primary_key=True, index=True)
    searched_at = Column(DateTime, default=datetime.datetime.utcnow)
    sentiment = Column(String, index=True)
    
