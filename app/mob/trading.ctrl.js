/**
* This is the modern technolgy class.
* It contains all the methods of modernTechnology
* @class modernTechnologyMobController
*/

module.exports = {
	
	/**
     * Action for getting modernTechnology articles
     * 
     * @method getArticles
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true and gives item data. 
     */
 	addItem: function(req, res) {
 		var requiredParams = ['item','quantity','pricePerKg','price'];
 		helper.validateRequiredParams(req, res, requiredParams).then(function() {
 			var postData = req.body;
 			postData.createdBy = requestUserId;
 			postData.updatedBy = requestUserId;
 			var tradeSave = new models.trading(postData);
 			_mongoose.save(tradeSave).then(function(data) {
 				var response = {};
 				response.data = data;
 				helper.formatResponse(response, res, '');
 			}).catch(function(error) {
 				helper.formatResponse('', res, error);
 			});

 		});
 	},

 	/**
     * Action for updating trading items
     * 
     * @method updateItem
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true and gives gives item data. 
     */
 	updateItem: function(req, res) {
 		var itemId = req.params.id;
 		var requiredParams = ['item','quantity','pricePerKg','price'];
 		helper.validateRequiredParams(req, res, requiredParams).then(function() {
 			var postData = req.body;
 			postData.updatedBy = requestUserId;
 			var updateParams = postData;
 			var condition = {_id:itemId,createdBy: requestUserId};
 			_mongoose.update(models.trading, condition, updateParams).then(function(data) {
 				var response = {};
 				response.data = data;
 				helper.formatResponse(response, res, '');
 			}).catch(function(error) {
 				helper.formatResponse('', res, error);
 			});

 		});
 	},

 	/**
     * Action for geting trading items details
     * 
     * @method getItemDetails
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true and gives gives item data. 
     */
    getItemDetails: function(req, res) {
    	var itemId = req.params.id;
    	models.trading.findOne({_id: itemId}).exec(function(err, data) {
    		if(err) {
    			helper.formatResponse('', res, err);
    		} else if(_.isEmpty(data)){
				var error = {
                    httpstatus: 404,
                    msg: "data not found."
                }
                helper.formatResponse('', res, error);
    		} else {
    			var response = {};
    			response.data = data;
    			helper.formatResponse(response, res, '');
    		}
    	})
    },

 	/**
     * Action for getting trading items by user
     * 
     * @method getItemsByUser
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true and gives gives list of item data. 
     */
 	getItemsByUser: function(req, res) {
 		console.log("userDetails", requestUserId);
 		var agg = [
 			{
 				$match: {
 					createdBy: new mongoose.Types.ObjectId(requestUserId)
 				},
 			},
 			{
 				$sort: {
 					createdAt: 1
 				}
 			}
 		];
 		models.trading.aggregate(agg, function(err, data) {
 			if(err) {
 				helper.formatResponse('', res, err);
 			} else if(_.isEmpty(data)){
 				var error = {
                    httpstatus: 404,
                    msg: "data not found."
                }
                helper.formatResponse('', res, error);
 			} else {
 				var response = {};
 				response.data = data;
 				helper.formatResponse(response, res, '');
 			}
 		}); 	
 	},

 	/**
     * Action for deleting trading items by user
     * 
     * @method deleteItem
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true 
     */

    deleteItem: function(req, res) {
    	var itemId = req.params.id;
    	models.trading.remove({_id: itemId}).exec(function(err, data) {
    		if(err) {
    			helper.formatResponse('', res, err)
    		} else {
    			var response = {};
    			response.msg = "record removed successfully."
    			helper.formatResponse(response, res, '');
    		}
    	});
    },

    /**
     * Action for getting trading items by user
     * 
     * @method getItems
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true and gives gives list of item data. 
     */

    getItems: function(req, res) {
    	var search = "";
    	// console.log("search", typeof search);
    	if(typeof req.body.search != 'undefined' && req.body.search != "") {	
    		search = req.body.search;
    	} 
    	var agg = [
    		{
		        $lookup:{
		            from: "users",
		            localField: "createdBy",
		            foreignField: "_id",
		            as: "userInfo"
		        }
		    },
		    {
		        $lookup:{
		            from: "states",
		            localField: "state",
		            foreignField: "_id",
		            as: "stateInfo"
		        }
		    },
		    {
		        $lookup:{
		            from: "cities",
		            localField: "city",
		            foreignField: "_id",
		            as: "cityInfo"
		        }
		    },
		    {
		        $project: {
		            item: 1,
		            quantity: 1,
		            price: 1,
		            pricePerKg: 1,
		            cityId: "$city",
		            user: {$arrayElemAt: ["$userInfo.firstName", 0]},
		            city: {$arrayElemAt: ["$cityInfo.name", 0]},
		            state: {$arrayElemAt: ["$stateInfo.name", 0]}
		        }
		    },
		    {
		        $match: {
		            $or: [
		                {user: {$regex: new RegExp(search, "i")}},
		                {city: {$regex: new RegExp(search, "i")}},
		                {item: {$regex: new RegExp(search, "i")}},
		                {price: {$eq: parseInt(search)}},
		                {pricePerKg: {$eq: parseInt(search)}}
		            ]
		        }
		    },
		    {
		    	$sort: {item: 1}	
		    }	
    	];
    	models.trading.aggregate(agg, function(err, data) {
    		if(err) {
    			helper.formatResponse('', res, err);
    		} else if(_.isEmpty(data)) {
    			var error = {
                    httpstatus: 404,
                    msg: "data not found."
                }
                helper.formatResponse('', res, error);
    		} else {
    			var response = {};
    			response.data = data;
    			helper.formatResponse(response, res, '');
    		}
    	});
    }
}