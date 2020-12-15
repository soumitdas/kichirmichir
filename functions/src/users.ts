import * as functions from "firebase-functions";
import { auth, db } from "./config";

// Update user auth details when user document updates
export const createOrUpdateUser = functions.firestore
  .document("users/{userId}")
  .onWrite(async (change, context) => {
    const { userId } = context.params;
    const isDeleted = !change.after.exists;

    if (isDeleted) {
      return auth.deleteUser(userId);
    }
    const beforeDocData = change.before.data();
    const afterDocData = change.after.data();

    // check if data change from previous or not
    const isAuthDataChanged =
      beforeDocData?.displayName !== afterDocData?.displayName ||
      beforeDocData?.photoURL !== afterDocData?.photoURL;

    if (!isAuthDataChanged) {
      return;
    }

    const { displayName, photoURL, userName } = afterDocData || {};

    await auth.updateUser(userId, { displayName, photoURL });

    // Stop if the userDoc is new
    if (!change.before.exists) return;

    //Update any profile change in all of the post and comments user did
    interface AuthorData {
      uid: String;
      displayName: String;
      photoURL: String;
      userName: String;
    }

    const updatedAuthorData: AuthorData = {
      uid: userId,
      displayName,
      photoURL,
      userName,
    };

    const batch = db.batch();

    //Update Posts by User (limited to max 50 doc)
    const postsDocs = await db
      .collection("posts")
      .where("author.uid", "==", userId)
      .limit(50)
      .get();

    postsDocs.forEach((doc) => {
      if (doc.exists) {
        batch.update(doc.ref, { author: updatedAuthorData });
      }
    });

    //Update comments by User (limited to max 100 doc)
    const commentsDoc = await db
      .collectionGroup("comments")
      .where("author.uid", "==", userId)
      .limit(100)
      .get();

    commentsDoc.forEach((snap) => {
      if (snap.exists) {
        batch.update(snap.ref, { author: updatedAuthorData });
      }
    });

    return batch.commit();
  });
