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
		db.collection("Todos")
			.find({
				_id: new ObjectID("5bf4ef1daa62a1326a7a83ee")
			})
			.toArray()
			.then(
				docs => {
					console.log(JSON.stringify(docs, undefined, 2));
				},
				err => {
					console.log("Unable to fetch todos", err);
				}
			);
		db.collection("Todos")
			.find()
			.count()
			.then(
				counts => {
					console.log(`Total count: ${counts}`);
				},
				err => {
					console.log("Unable to fetch todos", err);
				}
			);
		db.collection("User")
			.find({
				firstName: "Akshay"
			})
			.count()
			.then(
				counts => {
					console.log(`Total count: ${counts}`);
				},
				err => {
					console.log("Unable to fetch todos", err);
				}
			);
		// client.close();
	}
);
