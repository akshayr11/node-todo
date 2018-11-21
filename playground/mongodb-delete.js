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

		// delete many
		// db.collection("Todos")
		// 	.deleteMany({
		// 		task: "learn Node"
		// 	})
		// 	.then(results => {
		// 		console.log(results);
		// 	});

		// delete One
		// db.collection("Todos")
		// 	.deleteOne({
		// 		_id: new ObjectID("5bf4f93735eee3374cc3fb99")
		// 	})
		// 	.then(results => {
		// 		console.log(results);
		// 	});

		// findOneAndDelete
		// db.collection("Todos")
		// 	.findOneAndDelete({
		// 		completed: true
		// 	})
		// 	.then(results => {
		// 		console.log(results);
		// 	});

		// client.close();
	}
);
