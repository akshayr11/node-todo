const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { pick } = require("lodash");

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

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.generateAuthToken = function() {
	var user = this;
	const access = "auth";
	const token = jwt.sign({ _id: user._id.toHexString(), access }, "abc123").toString();
	user.tokens = user.tokens.concat([{ access, token }]);
	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.toJSON = function() {
	var user = this;
	const userObject = user.toObject();
	return pick(userObject, ["_id", "email"]);
};

const User = mongoose.model("User", UserSchema);

module.exports = { Todo, User };
