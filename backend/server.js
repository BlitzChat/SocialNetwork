require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./user_model");
const postModel = require("./posts_model");
const { request, response } = require("express");
const path = require("path");

const app = express();

app.use(express.static('../frontend'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.mongodb.net/?retryWrites=true&w=majority`),{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.post("/login", async (request, response) => {
    const user = request.body.username;
    const pass = request.body.password;

    if(user === "" || pass === ""){
        response.status(406).json({msg:"Please fill in all fields"});
    }  else { 
        const user = await userModel.findOne({username: user});
        if(user === null){
            response.status(400).json({ msg:"User not found"});
        } else {
            if(user.password === pass){
                response.status(200).json({msg:"Login successful"});
            } else {
                response.status(400).json({msg:"Wrong password"});
            }
        }
    }
});

app.post("/register", async (request, response) => {
  var user = new userModel({
      nombre : request.body.name,
      username : request.body.username,
      password : request.body.password
  });

  if(user.nombre === "" || user.username === "" || user.password === ""){
      response.status(406).json({msg:"Please fill in all fields"});
  } else {  // Check if username already exists
      const user = await userModel.findOne({username: user.username});
      if(user === null){
          user.save();
          response.status(200).json({msg:"User created successfully"});
      } else {
          response.status(400).json({msg:"Username already exists"});
      }
  }
});

app.post("/add_post", async (request, response) => {
  var posts = new postModel({
      text : request.body.text,
      imagen : request.body.imagen,
      audio : request.body.audio,
      video : request.body.video
  });

  if(posts.text === "" ){
      response.status(406).json({msg: "Please fill atleasat the text field"});
  } else { 
      posts.save(); 
      response.status(200).json({msg: "Post created successfully"});
  } 
});

app.put("/update_post:id", async (request, response) => {
  const id = request.params.id;
  const text = request.body.text;
  const imagen = request.body.imagen;
  const audio = request.body.audio;
  const video = request.body.video;
  
  if(id === ""){
      response.status(406).json({msg: "please enter id of the post"});
  } else {
      const post = await postModel.findById(id);
      if(post === null){
          response.status(400).json({msg: "Post not found"});
      } else {
          post.text = text;
          post.imagen = imagen;
          post.audio = audio;
          post.video = video;
          post.save();
          response.status(200).json({msg: "Post updated successfully"});
      }
  }
});

app.delete("/delete_post:id", async (request, response) => {
  const id = request.params.id;
  if(id === ""){
      response.status(406).json({msg: "please enter id of the post"});
  } else {
    const post = await postModel.findById(id);
    post.remove();
    response.status(200).json({msg: "Post deleted successfully"});
  }
});

app.get('/',(request, response) =>{
    response.status(200).sendFile(path.resolve(__dirname,'../frontend/login.html'))
})

app.get("/user:id", async (request, response) => {
  const id = request.params
  const users = await userModel.find({id});
  response.status(200).json(users);
});

app.get("/posts", async (request, response) => {
  const posts = await postModel.find({});
  response.json(posts);

});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
