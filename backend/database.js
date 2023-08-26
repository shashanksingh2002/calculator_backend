const {MongoClient} = require('mongodb');
const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;

let db = null;

module.exports = {
    connectToDb:cb => {
        MongoClient.connect(uri)
                    .then(client => {
                        db = client.db(dbName);
                        cb();
                    })
                    .catch(err => cb(err))
    },
    databaseHistory:() => {
        let history = [];
        return db.collection('history')
                  .find({})
                  .limit(20)
                  .forEach(data => {
                    const obj = {
                        "query":data.query,
                        "answer":data.answer
                    }
                    history.push(obj);
                  })
                  .then(() => history)
                  .catch(err => console.error(err));
    },
    historyUpdate: async (arr, ans) => {
        try {
            const count = await db.collection('history').countDocuments({});
            if (count >= 20) {
                const oldestDocument = await db.collection('history')
                                               .findOne({}, { sort: { time: 1 } });
    
                if (oldestDocument) {
                    await db.collection('history').deleteOne({ _id: oldestDocument._id });
                }
            }
    
            const data = {
                "query": arr,
                "answer": ans,
                "time": Date.now()
            };
    
            const result = await db.collection('history').insertOne(data);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }    
}
