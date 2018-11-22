const jwt = require("jsonwebtoken");
const data = { id: 4 };

const token = jwt.sign(data, "123abc");
const decoded = jwt.verify(token, "123abc");
console.log("decoded", decoded);

// const { SHA256 } = require("crypto-js");
// const message = "I am user no 3";

// const hash = SHA256(message).toString();

// console.log(`Hash: ${hash}`);

// const data = { id: 4 };
// const token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
// if (resultHash === token.hash) {
// 	console.log("Data was not changed");
// } else {
// 	console.log("Data was changed");
// }
