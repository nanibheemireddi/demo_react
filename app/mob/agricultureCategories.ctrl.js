/**
* This is the agriculture categories class.
* It contains all the methods of agriculture categories
* @class agricultureMobController
*/

module.exports = {
	
	/**
     * Action for getting agriculture categories
     * 
     * @method getCategories
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true and gives list of data. 
     */
    
	getCategories : function(req, res) {
		var agg = [
			{
				$project: {
					category: { $ifNull: ["$category." + language, "$category.en"] },
					imageName: 1 
				}
			}
		];
		models.agricultureCategories.aggregate(agg, function(err, data) {
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
	},

	/**
     * Action for getting agriculture Items
     * 
     * @method getItems
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true and gives list of data. 
     */
    
	getItems : function(req, res) {
		var categoryId = req.params.id;
		var agg = [
			{
				$match: {
					category: new mongoose.Types.ObjectId(categoryId)
				}
			},
			{
				$project: {
					item: { $cond: 
						{ if: {$ne: ["$item." + language, ""]},
							then: { $ifNull: ["$item." + language, "$item.en"] } ,
							else: "$item.en" 
						} },
					imageName: 1 
				}
			}
		];
		models.agricultureItems.aggregate(agg, function(err, data) {
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