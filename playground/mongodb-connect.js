const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/TodoApp";
MongoClient.connect(
	url,
	(err, client) => {
		if (err) {
			return console.log("Unable to connect to mongo db server");
		}
		console.log("Connected to MongoDb server");
		const db = client.db("TodoApp");
		db.collection("Users").insertOne(
			{
				task: "learn Node",
				completed: false
			},
			(err, results) => {
				if (err) {
					return console.log("Unable to insert todo", err);
				}
				console.log(JSON.stringify(results.ops, undefined, 2));
			}
		);
		// db.collection("User").insertOne(
		// 	{
		// 		firstName: "Akshay",
		// 		lastName: "Rajput",
		// 		age: 24
		// 	},
		// 	(err, results) => {
		// 		if (err) {
		// 			return console.log("Unable to insert todo", err);
		// 		}
		// 		console.log(results.ops[0]._id.getTimestamp());
		// 	}
		// );
		client.close();
	}
);
