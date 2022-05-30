const express = require("express");
const userModel = require("./user_model");
const chatModel = require("./chat_model");
const postModel = require("./posts_model");
const app = express();

app.post("/add_user", async (request, response) => {
    var user = new userModel({
        nombre : request.body.name,
        username : request.body.username,
        password : request.body.password
    });

    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.post("/add_posts", async (request, response) => {
    var posts = new postModel({
        text : request.body.text,
        imagen : request.body.imagen,
        audio : request.body.audio,
        video : request.body.video
    });

    try {
      await user.save();
      response.send(posts);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await userModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get("/posts", async (request, response) => {
    const posts = await postModel.find({});
  
    try {
      response.send(posts);
    } catch (error) {
      response.status(500).send(error);
    }
  });