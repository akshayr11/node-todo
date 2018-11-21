const { MongoClient, ObjectID } = require("mongodb");

const url = "mongodb://localhost:27017/TodoApp";
MongoClient.connect(
	url,
	(err, client) => {
		if (err) {
			return console.log("Unable to connect to mongo db server");
		}
		console.log("Connected to MongoDb server");
		const db = client.db("TodoApp");

		// find one and update using $set
		db.collection("Todos")
			.findOneAndUpdate(
				{
					_id: new ObjectID("5bf50886fc10863df5ade322")
				},
				{
					$set: {
                        completed: true,
					}
				},
				{
					returnOriginal: false
				}
			)
			.then(results => {
				console.log(results);
			});
		// find one and update using $inc
		db.collection("Todos")
			.findOneAndUpdate(
				{
					_id: new ObjectID("5bf50886fc10863df5ade322")
				},
				{
					$set: {
						task: "Go Home"
					},
					$inc: {
						age: 1
					}
				},
				{
					returnOriginal: false
				}
			)
			.then(results => {
				console.log(results);
			});
	}
);
