const MongoClient = require('mongodb').MongoClient;
const common=require('./common');

//const uri = process.env.DB_URI;
const uri = 'mongodb+srv://nageshajab:password1!@cluster0.jbixq.mongodb.net/?retryWrites=true&w=majority';

exports.list = async function list(req, res) {
    await MongoClient.connect(uri, function (err, db) {
        if (err) common.sendError(err);
        var dbo = db.db("firstdb");
        dbo.collection("firstcollection").find({}).toArray(function (err, result) {
            if (err) common.sendError(err);
            common.sendSuccess(result);
            db.close();
        });
    });
}

exports.insert = async function insert(req, res) {
    await MongoClient.connect(url, function (err, db) {
        if (err) common.sendError(err);
        var dbo = db.db("firstdb");

        dbo.collection("firstcollection").insertOne(req.body, function (err, res) {
            if (err) common.sendError(err);
            console.log("1 document inserted");
            res.status(200);
            res.send('inserted');
            db.close();
        });
    });
}