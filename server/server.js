var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Todoapp");

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
const newTodo = new Todo({
	text: "Cook Dinner",
	completed: false,
	completedAt: 123
});

newTodo.save().then(
	doc => {
		console.log(`Saved todo: ${doc}`);
	},
	err => {
		console.log(`Unable to save ${err}`);
	}
);
