var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Todoapp");

const User = mongoose.model("user", {
	email: {
		type: String,
		required: true,
		minlength: 5,
		trim: true
	}
});

const user = new User({
	email: "akshay.rajput@xyz.com"
});

user.save().then(
	doc => {
		console.log(`User Saved: ${doc}`);
	},
	err => {
		console.log(`Unable to save ${err}`);
	}
);
