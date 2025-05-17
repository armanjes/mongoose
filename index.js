// 🚀 Query Helpers

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
});

const Product = new mongoose.model("Product", productSchema);

mongoose
  .connect("mongodb://127.0.0.1/gettingstarted")
  .then(() => console.log("Connected successfully!"))
  .catch((err) => console.log(err.message));

Product.create({
  name: "Pane Cake",
  price: 4.99,
  rating: 3.0,
})
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));

// 1️⃣ sort()
/*
Use .sort({ field: 1 }) for ascending order.
Use .sort({ field: -1 }) for descending order.
*/

Product.find()
  .sort({ rating: 1 })
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));

Product.find()
  .sort({ price: -1 })
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));

// 2️⃣ limit()
/*
Restrict the numbers of result.
*/
Product.find()
  .limit(2)
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));

// 3️⃣ select()
/*
Select is used to retrieve specific field form a document.
*/
Product.find()
  .select({ _id: 0, name: 1 })
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));

// 4️⃣ skip()
/*
.skip(n) tells Mongoose to ignore the first n documents and return the next ones where n is an integer value.
✅ Perfect for pagination (e.g., e-commerce, blogs, user lists).
✅ Useful when fetching only a portion of large datasets.
❌ Not efficient for very large datasets (use indexed-based pagination instead).
*/

Product.find()
  .select({ _id: 0, name: 1 })
  .skip((2 - 1) * 2)
  .limit(2)
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));

// 🚀 Query Conditions

// 1️⃣ $gt
Product.find({ price: { $gt: 9.99 } })
  .select({ _id: 0, price: 1 })
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));

// 2️⃣ $lt
Product.find({ price: { $lt: 9.99 } })
  .select({ _id: 0, price: 1 })
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));

// 3️⃣ $in
Product.find({ name: { $in: ["laptop", "pane cake", "tv", "Pizza 8"] } })
  .select({ _id: 0, name: 1 })
  .then((product) => console.log(product))
  .catch((err) => console.log(err.message));
