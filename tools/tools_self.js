const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'SZHM19';
 
// Use connect method to connect to the server

module.exports = {
    mess(response,message,url){
        response.setHeader('content-type', 'text/html');
        response.send(`<script>alert("${message}");window.location.href="${url}"</script>`);
    },
    find(collection,){
        MongoClient.connect(url, function(err, client) {
 
            const db = client.db(dbName);
            const collection = db.collection(collection);
            // Find some documents
            collection.find({}).toArray(function(err, docs) {
            client.close();
          });
    }

}