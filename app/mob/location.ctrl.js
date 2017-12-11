/**
* This is the location class.
* It contains all the methods of location
* @class locationWebController
*/


var multiparty = require('multiparty');
var util = require('util');
var csv = require('csv-parser');
var fs = require('fs');
var asyncLoop = require('node-async-loop');

module.exports = {
    
    /**
    * Action for getting location data with country,state and city
    *
    * @method getBubTalkCategories
    * @param {req} request
    * @param {res} response
    * @return {data} res - If data is there then it returns location list otherwise it gives message.
    */
    
    getLocations: function (req, res) {
        common.general.getLocations().then(function (data) {
            helper.formatResponse({data:data}, res, '');
        }).catch(function (error) {
            helper.formatResponse('', res, error);
        });
    },

    /**
    * Action for importing location file into db
    *
    * @method importLocations
    * @param {req} request
    * @param {res} response
    * @return {status} res -If it returns error then the status is false otherwise true. 
    */

    importLocations: function(req, res){
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            if(files.location && typeof files.location !== 'undefined'){
                var newPath = __dirname+'/../../public/'+files.location[0].originalFilename;
                fs.rename(files.location[0].path, newPath, function (err) {
                  if(err){
                        var error = {
                            httpstatus: 400,
                            msg: 'Unable to save'
                        };
                        helper.formatResponse('', res, error);     
                  }else{
                        common.general.readCsvFile(newPath).then(function(data){
                            asyncLoop(data, function (item, next){
                                /*check if country exists*/
                                var countryCond = { name :  {$regex : new RegExp(item.country, "i") }};
                                models.country.findOne(countryCond).exec(function (err, countryFetchData) {
                                    
                                    if(err){
                                       helper.formatResponse('',res,err)
                                    }else{
                                        if(countryFetchData == null){
                                            /*insert all as new record*/
                                            common.general.InsertNewLocationRecord(item).then(function(){
                                                next();
                                            }).catch(function(error){
                                                console.log("error", error);
                                                helper.formatResponse('',res,error)
                                            });
                                        }else{
                                            /*check if state exists*/    
                                            var countryPkId = countryFetchData._id;
                                            var statesCond = {
                                                         name :  {$regex : new RegExp(item.state, "i") },
                                                         country : countryPkId
                                                     };
                                            models.states.findOne(statesCond).exec(function (err, statesFetchData) {
                                                if(err){
                                                   helper.formatResponse('',res,err)
                                                }else{
                                                    if(statesFetchData == null){
                                                        common.general.InsertNewStateCitiesRecord(item,countryPkId).then(function(){
                                                            next();
                                                        }).catch(function(error){
                                                            console.log("error1", error);
                                                            helper.formatResponse('',res,error)
                                                        });
                                                    }else{
                                                        /*check if cities exists*/
                                                        var statesPkId = statesFetchData._id;
                                                        var citiesCond = {
                                                                     name :  {$regex : new RegExp(item.city, "i") },
                                                                     country : countryPkId,
                                                                     state : statesPkId,
                                                                 };
                                                         models.cities.findOne(citiesCond).exec(function (err, cityFetchData) {
                                                            if(err){
                                                               helper.formatResponse('',res,err)
                                                            }else{
                                                                
                                                                if(cityFetchData == null){
                                                                    common.general.InsertNewCitiesRecord(item,countryPkId,statesPkId).then(function(){
                                                                        next();
                                                                    }).catch(function(error){
                                                                        console.log("error2", error);
                                                                        helper.formatResponse('',res,error)
                                                                    });
                                                                }else{
                                                                    next();
                                                                }
                                                            }
                                                        });
                                                    }                                                
                                                }      
                                            })
                                        }
                                    }
                                });
                            },function(error) { 
                                if(error){
                                    helper.formatResponse('',res,error);
                                }
                                var response = {};
                                response = "location imorted sucessfully";
                                helper.formatResponse(response,res,'');
                            });
                        }).catch(function(error){
                            console.log("error3", error);
                            helper.formatResponse('',res,error)
                        });
                  }
                })
            }else{
                var error = {
                    httpstatus: 400,
                    msg: 'bad request'
                };
                helper.formatResponse('', res, error);     
            }
        });
    }

}

