const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const { Todo, User } = require("./model");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.post("/todos", (req, res) => {
	const todo = new Todo({
		text: req.body.text
	});
	todo.save().then(
		doc => {
			res.send(doc);
		},
		e => {
			res.status(400).send(e);
		}
	);
});
// get all todos
app.get("/todos", (req, res) => {
	Todo.find().then(
		todos => {
			res.send({ todos });
		},
		err => {
			res.status(400).send(err);
		}
	);
});

// get todos by id
app.get("/todos/:id", (req, res) => {
	const id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(400).send();
	}
	Todo.findById(id).then(
		todo => {
			res.send({ todo });
		},
		() => {
			res.status(404).send();
		}
	);
});

app.post("/user", (req, res) => {
	const todo = new User({
		email: req.body.email
	});
	todo.save().then(
		doc => {
			res.send(doc);
		},
		e => {
			res.status(400).send(e);
		}
	);
});

app.get("/user", (req, res) => {
	User.find().then(
		users => {
			res.send({ users });
		},
		err => {
			res.status(400).send(err);
		}
	);
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});
