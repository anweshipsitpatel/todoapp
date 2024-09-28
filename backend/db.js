/*
    Todo{
    title: string;
    description: string;
    completed: boolean
    }
*/
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://@username:password.gfjph.mongodb.net/userappnew?retryWrites=true&w=majority&appName=Cluster0")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos',todoSchema)

module.exports = {
    todo: todo
}
