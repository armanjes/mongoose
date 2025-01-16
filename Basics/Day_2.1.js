/*
1️⃣ To insert data into a MongoDB collection using Mongoose, we have two main methods:
1. .save() → Create a document and save it manually.
2. Model.create() → Create and save in one step.
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const User = mongoose.model("Day_02", userSchema);

mongoose
  .connect("mongodb://127.0.0.1/gettingstarted")
  .then(() => console.log("Connection to MongoDB"))
  .catch((err) => console.log(err.message));

const user = new User({
  name: "john doe",
  age: 18,
  city: "las vegas",
});

/*
🔹 When to use .save()?
1. When you need to modify the document before saving.
2. When you need to trigger middleware (pre-save hooks).
*/
// user
//   .save()
//   .then(() => console.log("Document saved!"))
//   .catch((err) => console.log(err.message));

/*
🔹 When to use Model.create()?
1. When you want a simpler way to insert data.
2. When you don’t need to modify the document before saving.
*/

User.create({
  name: "aliza",
  age: 28,
  city: "mumbai",
}).then(() => console.log(`user created and saved successfully: ${User}`))
.catch((err) => console.log(err.message))