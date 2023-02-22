import admin from "firebase-admin"

let serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE);

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  export const fireStore = admin.firestore();