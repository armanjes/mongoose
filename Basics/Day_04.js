// 🚀 Mongoose built-in validation

const mongoose = require("mongoose");

/*
Mongoose provides built-in validators for schemas, such as:

🔹 required: true → Makes a field mandatory.
🔹 minlength & maxlength → Limits the number of characters in a string.
🔹 min & max → Limits the value of a number.
🔹 enum → Restricts a field to specific values.
🔹 match → Uses regex to enforce a pattern.
*/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Age is required."],
    minlength: [5, "Name must be at least 5 character!"],
    maxlength: [20, "Name cannot exceed 20 character!"],
  },
  age: {
    type: Number,
    required: [true, "Age is required."],
    min: [18, "Age minimum 18 required!"],
    max: [60, "Age cannot be more than 60!"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format!",
    ],
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user", "editor"],
      message:
        "{VALUE} is not valid role. Select form 'admin', 'user', 'editor'.",
      // "VALUE" is a built-in placeholder used in custom error messages to show the invalid value.
    },
    required: true,
  },
});

/*
✅ What is enum?
The enum validator in Mongoose is used to restrict the value of a field to a specific set of values. It's commonly used for fields like status, role, category, etc. where the values are predefined.
✔ enum restricts a field to specific values.
✔ Use message to customize error messages for invalid values.
✔ Good for enforcing consistency in predefined fields like roles, statuses, etc.
*/

// 🚀 Hooks in Mongoose
/*
Mongoose hooks (also called middleware) allow you to define functions that are executed at specific points during the lifecycle of a document. They are useful for performing certain actions before or after an event like saving, deleting, or updating a document.

There are two types of hooks:
1️⃣ Pre Hooks (run before a certain operation)
2️⃣ Post Hooks (run after a certain operation)

Hooks can perform operation:
'save' – Before saving a document.
'remove' – Before removing a document.
'update' – Before updating a document.
'validate' – Before validating a document.
*/

//1️⃣ pre() Hooks
/*
A pre() hook is a function that runs before a specific action. For example, before saving a document, you can hash a password.

📌 syntax:
schema.pre('operation', function(next) {
  // Your logic here
  next();  // Move to the next middleware or operation
});
*/

// 2️⃣ post() Hooks
/*
A post() hook is a function that runs after a specific action. For example, after saving a document, you can log the successful save or send a notification.
📌 syntax:
schema.post('operation', function(doc) {
  // Your logic here
});
*/

userSchema.pre("save", function (next) {
  this.name = this.name + "123";
  next();
});

userSchema.post("save", function (doc) {
  console.log(`${doc.email} was saved.`);
});

const User = mongoose.model("User", userSchema);

User.create({
  name: "Oggy Cat",
  age: 45,
  email: "oggy2021@gamil.com",
  role: "user",
})
  .then(() => console.log(User))
  .catch((err) => console.log(err.message));

mongoose
  .connect("mongodb://127.0.0.1/gettingstarted")
  .then(() => console.log("Connection to MongoDB"))
  .catch((err) => console.log(err.message));
