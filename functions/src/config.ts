import * as admin from "firebase-admin";

admin.initializeApp();

export default admin;
export const auth = admin.auth();
export const db = admin.firestore();
