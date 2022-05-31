const MongoClient = require('mongodb').MongoClient;
const common = require('./common');

//const uri = process.env.DB_URI;
const uri = process.env.DB_URI;

exports.list = async function list(req, res) {
    await MongoClient.connect(uri, function (err, db) {
        if (err) common.sendError(res, err);
        var dbo = db.db("firstdb");
        dbo.collection("firstcollection").find({}).toArray(function (err, result) {
            if (err) common.sendError(res, err);
            common.sendSuccess(res, result);
            db.close();
        });
    });
}

exports.insert = async function insert(req, res) {
    console.log(typeof res);
    await MongoClient.connect(uri, function (err, db) {
        if (err) common.sendError(res, err);
        var dbo = db.db("firstdb");

        dbo.collection("firstcollection").insertOne(req.body, function (err, result) {
            if (err) common.sendError(res, err);
            common.sendSuccess(res, result);
            db.close();
        });
    });
}