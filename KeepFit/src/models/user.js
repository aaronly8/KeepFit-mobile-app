import BaseModel from "../models/base";

class User extends BaseModel {
    constructor (id, full_name, email, photo_url, username, birthday, gender, weight, height, fitness_level, created_at) {
        // initialize base model with firebase collection name
        super("users");
        
        self.id = id
        self.full_name = full_name
        self.email = email
        self.photo_url = photo_url
        self.username = username
        self.birthday = birthday
        self.gender = gender
        self.weight = weight
        self.height = height
        self.fitness_level = fitness_level
        self.created_at = created_at
    }
}

export default User;
