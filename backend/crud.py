from sqlalchemy.orm import Session
from models import User, Post
from auth import get_password_hash, verify_password

def create_user(db: Session, username: str, password: str):
    hashed = get_password_hash(password)
    user = User(username=username, hashed_password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user and verify_password(password, user.hashed_password):
        return user
    return None

def create_post(db: Session, title: str, content: str, author_id: int):
    post = Post(title=title, content=content, author_id=author_id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

def get_posts(db: Session):
    return db.query(Post).order_by(Post.created_at.desc()).all()

def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

def update_post(db: Session, post_id: int, title: str = None, content: str = None):
    post = get_post(db, post_id)
    if not post:
        return None
    if title:
        post.title = title
    if content:
        post.content = content
    db.commit()
    db.refresh(post)
    return post

def delete_post(db: Session, post_id: int):
    post = get_post(db, post_id)
    if not post:
        return None
    db.delete(post)
    db.commit()
    return post
