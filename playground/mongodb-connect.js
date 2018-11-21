const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
	"mongodb://localhost:27017/TodoApp",
	(err, client) => {
		if (err) {
			return console.log("Unable to connect to mongo db server");
		}
		console.log("Connected to MongoDb server");
		const db = client.db("TodoApp");
		db.collection("Todos").insertOne(
			{
				text: "Something Todo",
				completed: false
			},
			(err, results) => {
				if (err) {
					return console.log("Unable to insert todo", err);
				}
				console.log(JSON.stringify(results.ops, undefined, 2));
			}
		);
		client.close();
	}
);
