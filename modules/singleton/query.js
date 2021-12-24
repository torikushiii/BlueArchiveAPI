const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${process.env.MONGO_IP}:${process.env.MONGO_PORT}`;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 60000,
    socketTimeoutMS: 360000,
    connectTimeoutMS: 360000
});

module.exports = class Query extends require("./template") {
    /**
     * @inheritdoc
     * @returns {Query}
     */
    static singleton () {
        if (!Query.module) {
            Query.module = new Query();
        }

        return Query.module;
    }

    constructor () {
        super();

        if (!process.env.MONGO_IP || !process.env.MONGO_PORT) {
            return console.error("MongoDB IP or Port is not defined");
        }
        else if (!process.env.DB_NAME) {
            return console.error("Database name is not defined");
        }

        this.connect();
    }

    async connect () {
        await client.connect()
        .catch(err => console.error(err));
    }

    async disconnect () {
        await client.close()
        .then(() => console.log("Disconnected from MongoDB"))
        .catch(err => console.error(err));
    }

    /**
     * Get a collection from MongoDB
     * @param {string} collection The collection name
     * @param {object} query The query to find the collection
     * @returns {Promise<Array>}
     */
    async get (collection, query = {}) {
        if (!collection) {
            return "No collection is defined";
        }

        return await client.db(process.env.DB_NAME).collection(collection).find(query).toArray();
    }

    /**
     * Insert a new document into a collection
     * @param {string} collection The collection name
     * @param {object} data The data to insert
     */
    async set (collection, data) {
        if (!collection) {
            return "No collection is defined";
        }

        await client.db(process.env.DB_NAME).collection(collection).insertOne(data);
    }

    /**
     * Insert batch of documents into a collection
     * @param {string} collection The collection name
     * @param {Array} data The data to insert
     */
    async setBatch (collection, data) {
        if (!collection) {
            return "No collection is defined";
        }

        await client.db(process.env.DB_NAME).collection(collection).insertMany(data);
    }
    
    /**
     * Update a batch of document in a collection.
     * Delete all documents and insert new ones.
     * @param {string} collection 
     * @param {object} data 
     */
    async updateBatch (collection, data) {
        if (!collection) {
            return "No collection is defined";
        }

        await client.db(process.env.DB_NAME).collection(collection).deleteMany({});
        await client.db(process.env.DB_NAME).collection(collection).insertMany(data);
    }

    /**
     * Get current collection size
     * @param {string} collection The collection name
     * @returns {Promise<number>}
     */
    async getRowID (collection) {
        return await client.db(process.env.DB_NAME).collection(collection).countDocuments() + 1;
    }

    get modulePath () { return "query"; }
}