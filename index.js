//🚀 Population and Virtuals

//🧠 What Is Referencing in Mongoose?
// In mongoose a reference means storing the _id of another document inside other document.

/*

✅ Example:

You have two collections:
User: { _id, name, email }
Post: { _id, title, content, author }

We don’t store the whole user in Post. Instead, we store the user's _id:

{
  title: "How to use populate in Mongoose",
  content: "Here’s everything you need to know...",
  author: ObjectId("664735b03d08a2341f45831d") // This is a reference to a User
}

🧱 How to Define References in Schema

{
    type: mongoose.Schema.Types.ObjectId, // 👈 This is a reference
    ref: 'User', // 👈 This tells Mongoose which model to link to
  }

*/

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

mongoose
  .connect("mongodb://127.0.0.1/gettingstarted")
  .then(() => console.log("Connection to MongoDB"))
  .catch((err) => console.log(err.message));

User.create({
  name: "John Doe",
  email: "johndoe@gmail.com",
})
  .then((user) => {
    console.log(user);

    return Post.create({
      title: "this is title",
      content: "this is content",
      author: user._id,
    });
  })
  .then((post) => console.log(post))
  .catch((err) => console.error(err.message));

//🔗 How .populate() Works

/*

.populate() tells mongoose, "Go to the referenced model, find the document with _id and insert it into the this field"

*/

Post.find()
  .populate("author")
  .then((post) => console.log(post[0].author.name))
  .catch((err) => console.log(err.message));
