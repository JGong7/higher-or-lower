const { MongoClient, ServerApiVersion } = require('mongodb');
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class MongoDriver {
  constructor(uri) {
      this.uri = uri;
      // this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      this.client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
      });
      this.db = null;
  }

  async connect() {
      try {
          await this.client.connect();
          this.db = this.client.db('Weather');
          console.log('Connected to MongoDB');
      } catch (error) {
          console.error('Error connecting to MongoDB:', error);
          throw error;
      }
  }

  async read(collectionName, query = {}){
    const collection = this.db.collection(collectionName);
    try{
      const result = await collection.find(query).toArray();
      console.log(result);
      return result;
    }catch (error){
      console.error("Error reading from MongoDB:", error);
      throw error;
    }
  }
}
module.exports = MongoDriver;