import { fireStore } from "../firestore";
let collection = fireStore.collection("order");

export class Order {
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
  static async createNewOrder(data) {
    const newSnap = await collection.add(data);
    const newOrder = new Order(newSnap.id);
    newOrder.data = data;
    return newOrder;
  }

}
