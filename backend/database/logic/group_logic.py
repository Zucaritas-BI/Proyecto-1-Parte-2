from sqlalchemy.orm import Session
from database.models import Search

def create_search(db: Session):
    db_search = Search()
    db.add(db_search)
    db.commit()
    db.refresh(db_search)
    return db_search

def get_searchs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Search).offset(skip).limit(limit).all()

def get_search(db: Session, search_id: int):
    return db.query(Search).filter(Search.id == search_id).first()