import express from 'express';
import cors from 'cors';

const app = express();
 const PORT = process.env.PORT || 3000;

 app.use(express.json());
 app.use(cors());
 
 app.get("/", (req,res) => {
    res.send("Hello, World!");
 })

 app.get("/health", (req,res) => {
    res.send("Health check passed!");
 })


 app.get("/users", (req,res) => {
    res.send(users);

 })


 app.get("/todos", (req,res) => {
    res.send(todos);

 })

let users = [];
let todos = [
  { id: 1, title: "read a book" },
  { id: 2, title: "watch a movie" },
  { id: 3, title: "Learning new Technologies" }
];


app.post("/todos", (req,res) => {
     const data = req.body;
     if (!data || !data.title || !String(data.title).trim()) {
        res.status(400).send("Title is required");
        return;
     }

     const nextId = todos.length ? Math.max(...todos.map((todo) => Number(todo.id) || 0)) + 1 : 1;
     const newTodo = {
      id: nextId,
      title: String(data.title).trim()
     };
     todos.push(newTodo);
     res.status(201).send(newTodo);

})


app.delete("/todos", (req,res) => {
    const data = req.body;
    const itemIndex = todos.findIndex(todo => todo.id === data.id);
    if(itemIndex !== -1) {
        todos.splice(itemIndex, 1);
        res.send("Todo deleted!");
    } else {
        res.status(404).send("Todo not found!");
    }
})  

app.put("/todos", (req,res) => {
    const data = req.body;
    const itemIndex = todos.findIndex(todo => todo.id === data.id);     
    if(itemIndex !== -1) {
        todos[itemIndex] = data;
        res.send("Todo updated!");
    } else {
        res.status(404).send("Todo not found!");
    } })



  
 app.post("/users", (req,res) => {

    const data = req.body;

    if(!data) {
        res.status(400).send("Invalid user data");
        return;

    }
    users.push(data);
    res.send("User created!");


 })


 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });

