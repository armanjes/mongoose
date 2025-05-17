import mongoose from "mongoose";
/*
Schema is a constructor function in mongoose and it receives an object as an argument. This object specifies the structure of our documents. A schema defines the structure of the documents in a MongoDB collection. It outlines what fields a document will have, their data types, and any additional options like validation rules and default values.
*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 18,
    },
    email: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/*
model() is a fancy constructor used for compiling schema. A model is a constructor function created from a schema. It allows you to interact with the MongoDB database, such as creating new documents, querying existing ones, and performing other CRUD operations.
*/
const User = mongoose.model("User", userSchema);

/*
Document: Document is the instance of model.
Collection: Multiples documents together is called collection.
*/

const main = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/gettingstarted");
    console.log("Connected to MongoDB!");
    //   create document & save
    const user = new User({ name: "Oggy", email: "b@gmail.com" });
    await user.save();
    // Close the connection
    await mongoose.connection.close();
    console.log("Connection closed!");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};
main();
