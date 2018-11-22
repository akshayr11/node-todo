const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const { Todo } = require("./model");
const { pick, isBoolean } = require("lodash");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
// create a todo by post method
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
		return res.status(404).send();
	}
	Todo.findById(id).then(
		todo => {
			res.send({ todo });
		},
		() => {
			res.status(400).send();
		}
	);
});

// delete a todo
app.delete("/todos/:id", (req, res) => {
	const id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then(
		todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.send({ todo });
		},
		() => {
			res.status(400).send();
		}
	);
});

// update Route
app.patch("/todos/:id", (req, res) => {
	const id = req.params.id;
	const body = pick(req.body, ["text", "completed"]);
	if (isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(
		id,
		{
			$set: body
		},
		{ new: true }
	).then(
		todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.send(todo);
		},
		e => {
			res.status(400).send();
		}
	);
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});
