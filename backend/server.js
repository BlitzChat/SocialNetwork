require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./user_model");
const postModel = require("./posts_model");
const path = require("path");
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors)
app.use(express.static('../frontend'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

function verifyToken(req, res, next) {
    const token = req.header["Authorization"];

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
        }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
}

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

app.post("/api/blitzchat/auth/login", async (request, response) => {
    const user = request.body.username;
    const pass = request.body.password;
    var hashPassword = bcrypt.hashSync(pass, 10);

    if(user === "" || pass === ""){
        response.status(406).json({msg:"Please fill in all fields"});
    }  else { 
        const user = await userModel.findOne({username: user});
        if(user === null){
            return response.status(400).json({ msg:"User not found"});
        } else {
            if(user.password === hashPassword){
                const token = request.headers.authorization;
                if(token){
                    const decoded = jwt.verify(token, process.env.SECRET);
                    if(decoded.username === user.username){
                        return response.status(400).json({ msg:"You are already logged in"});
                    }
                } else {
                    const token = jwt.sign({username: user.username, id: user._id}, process.env.SECRET, {expiresIn: "1h"});
                    user.token = token;
                    response.header("Authorization", token, "id", user._id);
                    return response.status(200).json({msg: "Login successful"});
                }
            } else {
                return response.status(400).json({msg:"Wrong password"});
            }
        }
    }
});

app.post("/api/blitzchat/auth/register", async (request, response) => {
  var user = new userModel({
      nombre : request.body.name,
      username : request.body.username,
      password : request.body.password
  });

  var hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;

  if(user.nombre === "" || user.username === "" || user.password === ""){
      return response.status(406).json({msg:"Please fill in all fields"});
  } else {  // Check if username already exists
      const user = await userModel.findOne({username: user.username});
      if(user === null){
          user.save();
          return response.status(200).json({msg:"User created successfully"});
      } else {
          return response.status(400).json({msg:"Username already exists"});
      }
  }
});

app.post("/api/blitzchat/add_post",  async (request, response) => {
  var posts = new postModel({
      text : request.body.text,
      imagen : request.body.imagen,
      audio : request.body.audio,
      video : request.body.video
  });

  if(posts.text === "" ){
      return response.status(406).json({msg: "Please fill atleasat the text field"});
  } else { 
      posts.save(); 
      return response.status(200).json({msg: "Post created successfully"});
  } 
});

app.put("/api/blitzchat/update_post:id",async (request, response) => {
  const id = request.params.id;
  const text = request.body.text;
  const imagen = request.body.imagen;
  const audio = request.body.audio;
  const video = request.body.video;
  
  if(id === ""){
      return response.status(406).json({msg: "please enter id of the post"});
  } else {
      const post = await postModel.findById(id);
      if(post === null){
          return response.status(400).json({msg: "Post not found"});
      } else {
          post.text = text;
          post.imagen = imagen;
          post.audio = audio;
          post.video = video;
          post.save();
          return response.status(200).json({msg: "Post updated successfully"});
      }
  }
});

app.put("/api/blitzchat/update/user", async (request, response) => {
    const id = request.headers["id"];
    const nombre = request.body.nombre;
    const username = request.body.username;
    const password = request.body.password;
    const hashPassword = await bcrypt.hash(password, 10);
    
    const user = await userModel.findById(id);
    if(user === null){
        return response.status(400).json({msg: "User not found"});
    }
    else {
        user.nombre = nombre;
        user.username = username;
        user.password = hashPassword;
        user.save();
        return response.status(200).json({msg: "User updated successfully"});
    }
});

app.delete("/api/blitzchat/delete_post:id",  async (request, response) => {
  const id = request.params.id;
  if(id === ""){
      return response.status(406).json({msg: "please enter id of the post"});
  } else {
    const post = await postModel.findById(id);
    post.remove();
    return response.status(200).json({msg: "Post deleted successfully"});
  }
});

app.get('/',(request, response) =>{
    return response.status(200).sendFile(path.resolve(__dirname,'../frontend/login.html'));
    console.log("hola");
});

app.get("/api/blitzchat/posts",verifyToken, async (request, response) => {
  const posts = await postModel.find({});
  return response.json(posts);
});

app.listen(5000, () => {    
  console.log("Server is running at port 5000");
});
