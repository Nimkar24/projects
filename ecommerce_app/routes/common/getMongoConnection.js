var { MongoClient } = require("mongodb");
const dbUrl = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(dbUrl);

var mongoDbRef = {
    getMongoDbRef(data, type, collectionName) {
        return getDbConnection(data, type, collectionName);
    }
};

async function getDbConnection(userData, operationType, collectionName) {
    try {
        // Connect to MongoDB server
        await mongoClient.connect();
        console.log('Connected successfully to MongoDB server');

        const db = mongoClient.db("eCommerceDb");
        const collection = db.collection(collectionName);

        if (operationType === 'find') {
            console.log("Finding user in MongoDB:", userData);
            // Find the user by accountId and password hash (no insert operation during login)
            return await collection.find({ accountId: userData.accountId }).toArray();
        } else if (operationType === 'insert') {
            console.log("Inserting user into MongoDB:", userData);
            return await collection.insertOne(userData);
        } else if (operationType == 'findProducts') {
            var userFilter = userData;
            var queryObj = {};
            if (userFilter.category && userFilter.category.length) {
                queryObj.category = { $in: userFilter.category };
            }
            if (userFilter.price) {
                queryObj.price = { $gt: 0, $lt: parseInt(userFilter.price) }
            }
            console.log(queryObj);
            return collection.find(queryObj).toArray();
        }
    } catch (error) {
        console.error("Error in MongoDB operation:", error);
        throw error;
    }
}

module.exports = mongoDbRef;
