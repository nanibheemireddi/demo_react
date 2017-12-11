/**
* This is the agriculture categories class.
* It contains all the methods of agriculture categories
* @class agricultureMobController
*/

module.exports = {
	getCategories : function(req, res) {
		var language;
		if(typeof langCode != "undefined" && langCode != "") {
			language = langCode
		} else {
			language = 'en'
		}
		var agg = [
			{
				$project: {
					category: "$category." + language,
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
	}
}