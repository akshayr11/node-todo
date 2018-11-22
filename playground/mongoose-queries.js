const { ObjectId } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo, User } = require("../server/model");

const id = "5bf526197632bc4b78a0f180";
const userId = "5bf5460f0b1e5c6449c8bfd2";

if (!ObjectId.isValid(id)) {
	console.log("Id not Valid");
}
// Todos collection
// Todo.find({
// 	_id: id
// }).then(todos => {
// 	console.log(`Todos: ${todos}`);
// });

// Todo.findOne({
// 	_id: id
// }).then(todo => {
// 	console.log(`Todo: ${todo}`);
// });

// Todo.findById(id)
// 	.then(todo => {
// 		if (!todo) {
// 			console.log("Id not found");
// 		}
// 		console.log(`Todo By Id: ${todo}`);
// 	})
// 	.catch(e => {
// 		console.log(e);
// 	});

// User collection
// User.findById(userId).then(
// 	user => {
// 		if (!user) {
// 			return console.log("User not found");
// 		}
// 		console.log(`User By Id: ${user}`);
// 	},
// 	e => {
// 		console.log(e);
// 	}
// );

// Delete Methods
// Todo.findOneAndRemove({ _id: "5bf53ac18dffe05ab6c62639" }).then(todo => {
// 	console.log(todo);
// });

// Todo.findByIdAndRemove("5bf526197632bc4b78a0f180").then(todo => {
// 	console.log(todo);
// });
