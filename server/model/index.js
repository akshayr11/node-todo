const mongoose = require("mongoose");
const validator = require("validator");

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
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "{VALUE} is not a valid email"
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

module.exports = { Todo, User };
