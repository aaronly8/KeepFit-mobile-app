import BaseModel from "../models/base";

class User extends BaseModel {
    constructor (id, full_name, email, username, gender, weight, height, fitness_level, created_at) {
        // initialize base model with firebase collection name
        super("users");
        
        self.id = id
        self.full_name = full_name
        self.email = email
        self.username = username
        self.gender = gender
        self.weight = weight
        self.height = height
        self.fitness_level = fitness_level
        self.created_at = created_at
    }
}

export default User;
