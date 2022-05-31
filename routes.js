const usercontroller = require('./controllers/usercontroller');
const watchlistController = require('./controllers/watchListController');
const middleware = require('./middleware');

module.exports = function (app) {

    //user routes - anonymous access
    app.post("/user/generateToken", function (req, res) {
        usercontroller.generateToken(req, res);
    });
   

    //define routes for watchList
    app.post('/watchlist/list',middleware.validateJwt, function (req, res) {
        watchlistController.list(req, res);
    });
    app.post('/watchlist/insert', middleware.validateJwt, function (req, res) {        
        watchlistController.insert(req, res);
    });
}