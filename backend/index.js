//writie basic boilerplate code,
// with express.json() middleware

const express = require("express");
const cors = require("cors");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();
app.use(cors());
app.use(express.json());

// input - body {
//     title: string,
//     description: string
// }
app.post("/todo",async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            message: "you sent the wrong inputs",
        })
        return;
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "Todo created"
    })
});

app.get("/todos",async function(req,res){
    const todos = await todo.find({});
    res.json(todos);
});

app.put("/completed",async function(req,res){
    const updatePayload = req.body;
    
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            message: "you sent the wrong inputs",
        })
        return;
    } 
    await todo.updateOne({_id:req.body.id},
        {completed: true});
    
    res.json({
        msg: "Todo marked as completed"
    })
});

app.listen(3000);