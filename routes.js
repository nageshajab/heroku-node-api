const usercontroller = require('./controllers/usercontroller');
const watchlistController = require('./controllers/watchListController');
const middleware = require('./middleware');

module.exports = function (app) {

    app.get('/',function(req,res){
        res.send('api is up and running....');
    });

    //user routes - anonymous access
    app.post("/user/generateToken", function (req, res) {
        usercontroller.generateToken(req, res);
    });
   

    //define routes for watchList
    app.post('/watchlist/list',middleware.validateJwt, function (req, res) {
        console.log('inside api watch list route');
        watchlistController.list(req, res);
    });
    app.post('/watchlist/insert', middleware.validateJwt, function (req, res) {        
        watchlistController.insert(req, res);
    });
}