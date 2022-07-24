import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import firebase from "firebase/compat/app";

function Post({ postId, username, caption, imageUrl, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comment")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comment").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src="https://cdn-images.rtp.pt/icm/images/d0/d0322d8d63f2fd9802a5e683fc982e30?1200&rect=0,8,1079,592&w=800&q=75"
          alt="QuocNguyen"
        />
        <h3>{username}</h3>
      </div>

      {/* {header -> avatar + username} */}
      <img className="post__image" src={imageUrl} />
      {/* {image} */}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      {/* {username + caption} */}

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={!comment}
          className="post__button"
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
