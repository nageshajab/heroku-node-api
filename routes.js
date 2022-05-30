const usercontroller = require('./controllers/usercontroller');
const watchlistController = require('./controllers/watchListController');

module.exports = function (app) {

    //user routes
    app.post("/user/generateToken", function (req, res) {
        usercontroller.generateToken(req, res);
    });
    app.post("/user/validateToken", function (req, res) {
        usercontroller.validateToken(req, res);
    });

    //define routes for watchList
    app.post('/watchlist/list', function (req, res) {
        watchlistController.list(req, res);
    });
    app.post('/watchlist/insert', function (req, res) {
        
        watchlistController.insert(req, res);
    });
}