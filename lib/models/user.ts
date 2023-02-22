import { fireStore } from "../firestore"
    
    const collection = fireStore.collection("user")
export class User{
    id:string
    ref:FirebaseFirestore.DocumentReference
    data:FirebaseFirestore.DocumentData
    constructor(id){
        this.id = id
        this.ref = collection.doc(id)
    }
    async pull(){
        const snap = await this.ref.get()
        this.data = snap.data() 
    }

    async push(){
        await this.ref.update(this.data)
    }
    static async createNewUser(data){
        const newSnap = await collection.add(data)
        const newUser = new User(newSnap.id)
        newUser.data = data
        return newUser
    }
}