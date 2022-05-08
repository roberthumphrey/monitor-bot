
// mongoose.connect(`mongodb+srv://${username}:${password}@goliath.ydtpu.mongodb.net/galactic-empire?retryWrites=true&w=majority`).then(() => {
//      this.log(`${chalk.yellow('[DATABASE]')} Connected to database`);
// }).catch(error => this.log(`${chalk.red('[DATABASE]')} Failed to connect to database with error: ${error}`));

import mongoose from "mongoose";

let uri = `mongodb+srv://${process.env.mongodbUsername}:${process.env.mongodbPassword}@goliath.ydtpu.mongodb.net/galactic-empire?retryWrites=true&w=majority`
mongoose.connect(uri);

let connection = mongoose.connection;

connection.on('connected', console.log.bind(console, 'MongoDB Connected'));

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));