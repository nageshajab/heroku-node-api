const usercontroller = require('./controllers/usercontroller');
const watchlistController = require('./controllers/watchListController');
const middleware = require('./middleware');
const common = require('./controllers/common');
var cors = require('cors');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send('api is up and running....');
    });

    //user routes - anonymous access
    app.post("/user/generateToken", function (req, res) {
        usercontroller.generateToken(req, res);
    });


    //define routes for watchList
    app.post('/watchlist/list', middleware.validateJwt, function (req, res) {
        watchlistController.list(req, res);
    });
    app.post('/watchlist/insert', middleware.validateJwt, function (req, res) {
        watchlistController.insert(req, res);
    });
    app.post('/watchlist/delete', middleware.validateJwt, function (req, res) {
        try {
            watchlistController.delete(req, res);
        } catch (ex) {
            console.log('in error block of watchlist delete route');
            common.sendError(res, ex);
        }
    });
}