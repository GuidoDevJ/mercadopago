import { fireStore } from "../firestore";
let collection = fireStore.collection("auth");

export class Auth {
  id: string;
  ref: FirebaseFirestore.DocumentReference;
  data: FirebaseFirestore.DocumentData;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push() {
    await this.ref.update(this.data);
  }

  static cleanEmail(email: string) {
    return email.trim().toLocaleLowerCase();
  }

  static async findByEmail(email) {
    const cleanEmail = Auth.cleanEmail(email);
    const result = await collection.where("email", "==", cleanEmail).get();
    if (result.docs.length) {
      let first = result.docs[0];
      let newAuth = new Auth(first.id);
      await newAuth.pull();
      return newAuth;
    } else {
      return null;
    }
  }
  static async createNewAuth(data) {
    const newSnap = await collection.add(data);
    const newUser = new Auth(newSnap.id);
    newUser.data = data;
    return newUser;
  }
  static async findEmailAndCode(email: string, code: number) {
    const cleanEmail = Auth.cleanEmail(email);
    const result = await collection
      .where("email", "==", cleanEmail)
      .where("code", "==", code)
      .get();
    if (result.empty) {
      return null;
    } else {
      const data = result.docs[0];
      let newAuth = new Auth(data.id)
      await newAuth.pull()
      return newAuth
    }
  }
}
