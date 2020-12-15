import * as functions from "firebase-functions";
import { db } from "./config";

// TODO: Send notification to followers when new post created
export const onPostCreate = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snapshot, context) => {
    const { author } = snapshot.data();
    const { postId } = context.params;

    // Get all the users who follow Post Author
    const users: Array<FirebaseFirestore.DocumentData> = [];
    const userSnap = await db
      .collection("users")
      .where("following", "array-contains", author?.uid)
      .get();

    userSnap.forEach((snap) => {
      if (snap.exists) {
        const data = snap.data();
        users.push({ id: snap.id, ...data });
      }
    });

    // Send notification to all of them
    const notificationPromises = users.map((user) =>
      db.collection(`users/${user.id}/notifications`).add({
        type: "new-post",
        postId,
        seen: false,
        message: `New post from ${author?.displayName}`,
        createdAt: Date.now(),
      })
    );

    return Promise.all(notificationPromises);
  });
