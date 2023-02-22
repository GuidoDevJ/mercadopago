import admin from "firebase-admin"

let serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE);

if(admin.app.length == 0){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
}


const fireStore = admin.firestore()
export {
    fireStore
}