require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${MONGO_USERNAME}:<${MONGO_PASSWORD}>@cluster0.s49jz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
