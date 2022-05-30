const res = require("express/lib/response");

exports.sendError= function sendError(err){
    res.status(500);
    res.send(err);
}

exports.sendSuccess = function sendSuccess(msg){
    res.status(200);
    res.send(msg);
}