var RestaurantData = require('../models/restaurants.server.model');

exports.getAllData =  function(req, res){
	var query = RestaurantData.find();
	
	query.sort({restaurantName: 'asc'})
		.exec(function(err, result){
			if(err){
				return res.status(500).json({
					title: 'An error has occurred',
					error: err
				});
			}
			return res.status(200).json({
				title: 'Data Successfully Fetched',
				data: result
			});		
		});
}

exports.createNewData =  function(req, res){
	
	var newRestaurantEntry = new RestaurantData({
		restaurantName: req.body.restaurantName,
		restaurantAddress: req.body.restaurantAddress,
		foodMenu: req.body.foodMenu,
		drinksMenu: req.body.drinksMenu
	})
	
	newRestaurantEntry.save(function(err, result){
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				// Duplicate
				return res.status(500).send({ 
					title: 'Restaurant with same name and address already exists!' ,
					error: err
				});
			}
            return res.status(500).json({
                title: 'An error has occurred',
                error: err
            });
        }
		
		return res.status(200).json({
			title: 'Data Successfully Added',
			data: result
		});		
	})
}

exports.editData =  function(req, res){
	var condition = { _id: req.body._id };
	var updateData = {
		restaurantName: req.body.restaurantName,
		restaurantAddress: req.body.restaurantAddress,
		foodMenu: req.body.foodMenu,
		drinksMenu: req.body.drinksMenu
	}
	RestaurantData.findOneAndUpdate(condition, updateData, function (err, result)
	{
		if(err){
			return res.status(500).json({
				title: 'An error has occurred',
				error: err
			});
		}
		return res.status(200).json({
			title: 'Data Successfully Saved',
			data: result
		});	
	})
}

