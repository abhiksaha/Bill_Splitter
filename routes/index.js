var express = require('express');
var router = express.Router();

var restaurantDataCtrl = require('../controllers/restaurants.server.controller');

router.get('/getAllRestaurantsData', function(req, res, next) {
  return restaurantDataCtrl.getAllData(req, res)
});

router.post('/addRestaurantData', function(req, res){
	return restaurantDataCtrl.createNewData(req, res);
})

router.post('/editRestaurantData', function(req, res){
	return restaurantDataCtrl.editData(req, res);
})


module.exports = router;
