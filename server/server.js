const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo, User } = require("./model");

const app = express();
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

app.listen(3000, () => {
	console.log(`Started on port 3000`);
});
