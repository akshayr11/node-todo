const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const { Todo } = require("./model/todo");
const { User } = require("./model/user");
const { pick, isBoolean } = require("lodash");
const { authenticate } = require("./middleware/authenticate");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
// create a todo by post method
app.post("/todos", authenticate, (req, res) => {
	const todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
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
app.get("/todos", authenticate, (req, res) => {
	Todo.find({
		_creator: req.user._id
	}).then(
		todos => {
			res.send({ todos });
		},
		err => {
			res.status(400).send(err);
		}
	);
});

// get todos by id
app.get("/todos/:id", authenticate, (req, res) => {
	const id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findOne({
		_id: id,
		_creator: req.user._id
	}).then(
		todo => {
			res.send({ todo });
		},
		() => {
			res.status(400).send();
		}
	);
});

// delete a todo
app.delete("/todos/:id", authenticate, (req, res) => {
	const id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findOneAndDelete({
		_id: id,
		_creator: req.user._id
	}).then(
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
app.patch("/todos/:id", authenticate, (req, res) => {
	const id = req.params.id;
	const body = pick(req.body, ["text", "completed"]);
	if (isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findOneAndUpdate(
		{
			_id: id,
			_creator: req.user._id
		},
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

// User Routes
app.post("/users", (req, res) => {
	const body = pick(req.body, ["email", "password"]);
	const user = new User(body);
	user
		.save()
		.then(() => {
			return user.generateAuthToken();
		})
		.then(token => {
			res.header("x-auth", token).send(user);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

app.post("/users/login", (req, res) => {
	const body = pick(req.body, ["email", "password"]);
	User.findByCredentials(body.email, body.password)
		.then(user => {
			return user.generateAuthToken().then(token => {
				res.header("x-auth", token).send(user);
			});
		})
		.catch(e => {
			res.status(400).send();
		});
});
app.delete("/users/me/token", authenticate, (req, res) => {
	req.user
		.removeToken(req.token)
		.then(() => {
			res.send();
		})
		.catch(() => {});
});
app.get("/users/me", authenticate, (req, res) => {
	res.send(req.user);
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});
