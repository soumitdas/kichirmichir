import * as functions from "firebase-functions";
import firebase, { db } from "./config";

export const addCommentToPost = functions.firestore
  .document("posts/{postId}/comments/{commentId}")
  .onCreate((snapshot, context) => {
    const { postId } = context.params;
    const { author } = snapshot.data();

    return db.doc(`posts/${postId}`).update({
      commentedBy: firebase.firestore.FieldValue.arrayUnion(author?.uid || []),
    });
  });

export const removeCommentFromPost = functions.firestore
  .document("posts/{postId}/comments/{commentId}")
  .onDelete((snapshot, context) => {
    const { postId } = context.params;
    const { author } = snapshot.data();

    return db.doc(`posts/${postId}`).update({
      commentedBy: firebase.firestore.FieldValue.arrayRemove(author?.uid || []),
    });
  });
