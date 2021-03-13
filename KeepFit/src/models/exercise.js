import BaseModel from "../models/base";

class Exercise extends BaseModel {
    static collection_name = "exercises"

    constructor (data) {
        // initialize base model with firebase collection name        
        self.id = data.id
        self.name = data.name
        self.description = data.description
        self.video_link = data.video_link
        self.workout_category = data.workout_category
        self.muscle_group = data.muscle_group
    }
}

export default Exercise;
