const MongoClient = require('mongodb').MongoClient;
const {
    ObjectId
} = require('mongodb');
const common = require('./common');

//const uri = process.env.DB_URI;
const uri = process.env.DB_URI;

exports.list = async function list(req, res) {
    await MongoClient.connect(uri, function (err, db) {
        if (err) common.sendError(res, err);
        console.log(`db is ${process.env.DB_NAME}`);
        var dbo = db.db(process.env.DB_NAME);
        dbo.collection(process.env.COLLECTION_NAME).find({}).toArray(function (err, result) {
            //   console.log(JSON.stringify(result));
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
        var dbo = db.db(process.env.DB_NAME);

        dbo.collection(process.env.COLLECTION_NAME).insertOne(req.body, function (err, result) {
            if (err) common.sendError(res, err);
            common.sendSuccess(res, result);
            db.close();
        });
    });
}

exports.delete = async function delete1(req, res) {
    console.log('in delete api ' + JSON.stringify(req.body.id));

    await MongoClient.connect(uri, function (err, db) {
        try {
            if (err) return err;
            var dbo = db.db(process.env.DB_NAME);
            var o_id = ObjectId(req.body.id);
            var myquery = {
                '_id': o_id
            };
            dbo.collection(process.env.COLLECTION_NAME).find(myquery).toArray(function (err, result) {
                if (err) throw err;
                console.log('found record ' + JSON.stringify(result));
                //                db.close();
            });
            dbo.collection(process.env.COLLECTION_NAME).deleteOne(myquery, function (err, result) {
                if (err) {
                    console.log(err);
                    return err;
                }
                db.close();
                console.log(result);
                common.sendSuccess(res, `deleted ${result.deletedCount} acknowledged ${result.acknowledged}`);
            });
        } catch (e) {
            console.log(e.message);
            common.sendError(res, e.message);
        }
    });
}