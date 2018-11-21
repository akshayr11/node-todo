const mongoose = require("mongoose");

const Todo = mongoose.model("Todo", {
	text: {
		type: String,
		required: [true, "Enter a todo"],
		minLength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

const User = mongoose.model("User", {
	email: {
		type: String,
		required: true,
		minlength: 5,
		trim: true
	}
});

module.exports = { Todo, User };
