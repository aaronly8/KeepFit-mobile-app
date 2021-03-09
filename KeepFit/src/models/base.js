import db from "../firebase/firebase.js";

class BaseModel {
    constructor (collection_name) {
        this.collection_name = collection_name
    }

    select() {
        return db.collection(this.collection_name);
    }
}

export default BaseModel;
