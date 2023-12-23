import { MongoClient } from "mongodb";

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const MONGO_USER_DATABASE = process.env.MONGO_USER_DATABASE;
const MONGO_ITEM_DATABASE = process.env.MONGO_ITEM_DATABASE;
const MONGO_AUTH_DATABASE = process.env.MONGO_AUTH_DATABASE;

let connectString;

let itemClient: Promise<MongoClient>;
connectString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@coffee-mogul-cluster.hxh6ejn.mongodb.net/${MONGO_ITEM_DATABASE}?retryWrites=true&w=majority`;
itemClient = MongoClient.connect(connectString);

let userClient: Promise<MongoClient>;
connectString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@coffee-mogul-cluster.hxh6ejn.mongodb.net/${MONGO_USER_DATABASE}?retryWrites=true&w=majority`;
userClient = MongoClient.connect(connectString);

let authClient: Promise<MongoClient>;
connectString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@coffee-mogul-cluster.hxh6ejn.mongodb.net/${MONGO_AUTH_DATABASE}?retryWrites=true&w=majority`;
authClient = MongoClient.connect(connectString);

export { authClient, itemClient, userClient };
