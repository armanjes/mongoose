// 🚀 Create Operation

/*
To insert data into a MongoDB collection using Mongoose, we have two main methods:
1️⃣ .save() → Create a document and save it manually.
2️⃣ Model.create() → Create and save in one step.
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect("mongodb://127.0.0.1/gettingstarted")
  .then(() => console.log("Connection to MongoDB"))
  .catch((err) => console.log(err.message));

const user = new User({
  name: "Mahim",
  age: 44,
  city: "Maymonshingh",
});

/*
🔹 When to use .save()?
1. When you need to modify the document before saving.
2. When you need to trigger middleware (pre-save hooks).
*/

user
  .save()
  .then(() => console.log("Document saved!"))
  .catch((err) => console.log(err.message));

/*
🔹 When to use Model.create()?
1. When you want a simpler way to insert data.
2. When you don’t need to modify the document before saving.
*/

User.create({
  name: "aliza",
  age: 28,
  city: "mumbai",
})
  .then(() => console.log(`user created and saved successfully: ${User}`))
  .catch((err) => console.log(err.message));

// 🚀 Read Operation
/*
We have 3 main methods to read data
1️⃣ find() -> Retrieve multiple document
2️⃣ findOne() -> Retrieves a single document matching a condition.
3️⃣ findById() → Retrieves a document by its unique _id.
*/

// 1️⃣ .find()
User.find({})
  .then((users) => console.log(users))
  .catch((err) => console.log(err.message));

// 2️⃣ .findOne()
User.findOne({ city: "khulna" })
  .then((user) => console.log(user))
  .catch((err) => console.log(err.message));
User.findOne({ name: "Mahim" })
  .then((user) => console.log(user))
  .catch((err) => console.log(err.message));
User.findOne({ age: "18" })
  .then((user) => console.log(user))
  .catch((err) => console.log(err.message));

// 3️⃣ findById()
User.findById("6788f57e41d8c4a5361d4061")
  .then((user) => console.log(user))
  .catch((err) => console.log(err.message));

// 🚀 Update Operation

/*
Update operations
1️⃣ .updateOne() → Updates the first matching document
2️⃣ .findByIdAndUpdate() → Finds a document by _id and updates it
*/

// 1️⃣ .updateOne()
User.updateOne({ name: "Rahim" }, { age: 44 })
  .then((user) => console.log(user))
  .catch((err) => console.log(err));

// 2️⃣ .findByIdAndUpdate()
User.findByIdAndUpdate(
  "6788f57e41d8c4a5361d4061",
  { city: "New York" },
  { new: true }
)
  .then((user) => console.log(user))
  .catch((err) => console.log(err.message));

// 🚀 Delete Operation

User.deleteOne({ name: "Zorina" })
  .then((deletedUser) => console.log(deletedUser))
  .catch((err) => console.log(err.message));

User.findByIdAndDelete("6788f57e41d8c4a5361d4061")
  .then((deletedUser) => console.log(deletedUser))
  .catch((err) => console.log(err.message));
