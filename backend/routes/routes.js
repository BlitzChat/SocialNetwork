const express = require("express");
const userModel = require("./user_model");
const chatModel = require("./chat_model");
const postModel = require("./posts_model");
const app = express();

app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});