import * as functions from "firebase-functions";
import firebase, { db } from "./config";

export const addLikeToPost = functions.firestore
  .document("posts/{postId}/likes/{likedUserId}")
  .onCreate((_, context) => {
    const { postId, likedUserId } = context.params;

    return db.doc(`posts/${postId}`).update({
      likedBy: firebase.firestore.FieldValue.arrayUnion(likedUserId || []),
    });
  });

export const removeLikeFromPost = functions.firestore
  .document("posts/{postId}/likes/{likedUserId}")
  .onDelete((_, context) => {
    const { postId, likedUserId } = context.params;

    return db.doc(`posts/${postId}`).update({
      likedBy: firebase.firestore.FieldValue.arrayRemove(likedUserId || []),
    });
  });
