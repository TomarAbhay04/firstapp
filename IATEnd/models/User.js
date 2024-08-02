import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    userType: { type: String, enum:['faculty', 'student'] ,required: true },
});


const facultySchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    semesters : [{type: Number, required: true}],
    branches : [{type: String, required: true}],
    subjects : [{ type: String, required: true }],
});

const Faculty = mongoose.model("Faculty", facultySchema);

const User = mongoose.model("User", userSchema);

export {User, Faculty};