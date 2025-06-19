from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas import PostCreate, PostUpdate, PostOut
from dependencies import get_db, get_current_user
from crud import create_post, get_posts, get_post, update_post, delete_post
from models import Post

router = APIRouter()

@router.post("/", response_model=PostOut)
def create_new_post(post: PostCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    new_post = create_post(db, post.title, post.content, user.id)
    return PostOut(
        id=new_post.id,
        title=new_post.title,
        content=new_post.content,
        created_at=new_post.created_at,
        updated_at=new_post.updated_at,
        author=user.username,
    )

@router.get("/", response_model=list[PostOut])
def read_posts(db: Session = Depends(get_db)):
    posts = get_posts(db)
    return [
        PostOut(
            id=p.id,
            title=p.title,
            content=p.content,
            created_at=p.created_at,
            updated_at=p.updated_at,
            author=p.author.username
        ) for p in posts
    ]

# NEW endpoint: get posts of current logged-in user
@router.get("/me", response_model=list[PostOut])
def read_my_posts(db: Session = Depends(get_db), user=Depends(get_current_user)):
    posts = db.query(Post).filter(Post.author_id == user.id).order_by(Post.created_at.desc()).all()
    return [
        PostOut(
            id=p.id,
            title=p.title,
            content=p.content,
            created_at=p.created_at,
            updated_at=p.updated_at,
            author=user.username
        ) for p in posts
    ]

@router.put("/{post_id}", response_model=PostOut)
def update_existing_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_post = get_post(db, post_id)
    if not db_post or db_post.author_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this post")
    updated_post = update_post(db, post_id, post.title, post.content)
    return PostOut(
        id=updated_post.id,
        title=updated_post.title,
        content=updated_post.content,
        created_at=updated_post.created_at,
        updated_at=updated_post.updated_at,
        author=user.username,
    )

@router.delete("/{post_id}")
def delete_existing_post(post_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    post = get_post(db, post_id)
    if not post or post.author_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this post")
    delete_post(db, post_id)
    return {"msg": "Post deleted"}
