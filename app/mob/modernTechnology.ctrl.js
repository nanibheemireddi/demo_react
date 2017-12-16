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
     * @return {status} res -If it returns error then the status is false otherwise true and gives list of data. 
     */
    
    getArticles: function(req, res) {
    	var agg = [
    		{
    			$sort: {"title.en": 1}
    		},
    		{
    			$project: {
    				title:{
    					$cond: 
						{ if: {$ne: ["$title." + language, ""]},
							then: { $ifNull: ["$title." + language, "$title.en"] } ,
							else: "$title.en" 
						}
					},
    				description: {
    					$cond: 
						{ if: {$ne: ["$description." + language, ""]},
							then: { $ifNull: ["$description." + language, "$description.en"] } ,
							else: "$description.en" 
						}
					},
					imageName: {
    					$cond: 
						{ if: {$ne: ["$imageName." + language, ""]},
							then: { $ifNull: ["$imageName." + language, "$imageName.en"] } ,
							else: "$imageName.en" 
						}
					},
    				link: {
    					$cond: 
						{ if: {$ne: ["$link." + language, ""]},
							then: { $ifNull: ["$link." + language, "$link.en"] } ,
							else: "$link.en" 
						}
					},
    			}
    		}
    		
    	];

    	models.modernTechnology.aggregate(agg, function(err, data) {
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