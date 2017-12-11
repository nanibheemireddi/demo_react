    /**
    * This is the general common class.
    * It contains all the methods with promises of general
    * @class generalCommon
    */

var csv = require('csv-parser');
var fs = require('fs');

module.exports = {
    
    /**
    * Action for getting locations
    *
    * @method getLocations
    * @return {promise} res - If query is sucess then it resolves retrieved data otherwise rejects some error.
    */

    getLocations: function() {
        return new Promise(function(resolve, reject) {
            models.country.find().exec(function(error, country) {
                if (error) {
                    reject(error);
                }
                models.states.find().populate('country').exec(function(error, state) {
                    if (error) {
                        reject(error);
                    }
                    models.cities.find().populate('country').populate('state').exec(function(error, city) {
                        if (error) {
                            reject(error);
                        }
                        resolve({
                            country: country,
                            state: state,
                            city: city
                        });
                    });
                });
            })
        });
    },

    /**
    * Action for reading csv file
    *
    * @method readCsvFile
    * @param {string} path - path of the file
    * @return {promise} res - If query is sucess then it resolves retrieved data otherwise rejects some error.
    */

    readCsvFile: function(path) {
        return new Promise(function(resolve, reject) {
            var tempCsvData = [];
            fs.createReadStream(path).pipe(csv()).on('data', function(data) {
                tempCsvData.push(data)
            }).on('error', function(error) {
                reject(error);
            }).on('end', function() {
                resolve(tempCsvData);
            })

        });
    },

    /**
    * Action for reading csv file from S3 bucket
    *
    * @method readCsvFileFromS3
    * @param {object} options - options of the s3 bucket
    * @return {promise} res - If query is sucess then it resolves retrieved data otherwise rejects some error.
    */

    readCsvFileFromS3: function(options) {
        return new Promise(function(resolve, reject) {
            var tempCsvData = [];
            var AWS = require('aws-sdk');
            var s3 = new AWS.S3();
            s3.getObject(options).createReadStream().pipe(csv()).on('data', function(data) {
                tempCsvData.push(data)
            }).on('error', function(error) {
                reject(error);
            }).on('end', function() {
                resolve(tempCsvData);
            });
             
        });
    },

    /**
    * Action for creating thumb file for video
    *
    * @method createThumb
    * @param {object} options - options of the s3 bucket
    * @return {promise} res - If query is sucess then it resolves retrieved data otherwise rejects some error.
    */

    createThumb: function(video) {
        return new Promise(function(resolve, reject) {
            var s3Url = "https://d1xcwcu2n6f9r7.cloudfront.net/news/";
            var path = "public/";
            var command = 'ffmpeg -i ' + s3Url + video +' -ss 00:00:3.435 -vframes 1 '+ path + video + '.png'; 
            var nrc = require('node-run-cmd');
            nrc.run(command).then(function(obj) {
                resolve(obj);
            }).catch(function(err) {
                reject(err);
            });
        });
    },

    /**
    * Action for Insert location(city, state and country)
    *
    * @method InsertNewLocationRecord
    * @param {object} input - body data
    * @return {promise} res - If query is sucess then it resolves inserted data otherwise rejects some error.
    */

    InsertNewLocationRecord: function(input) {
        return new Promise(function(resolve, reject) {

            /*insert new country*/
            var insertObj = new models.country({
                name: input.country,
                // createdBy: requestUserId,
                // updatedBy: requestUserId,
            });
            _mongoose.save(insertObj).then(function(saveCountry) {
                var countryId = saveCountry._id;
                /*insert new state*/
                var insertObj = new models.states({
                    name: input.state,
                    country: countryId,
                    language: input.language,
                    localLanguage: input.localLanguage,
                    // createdBy: requestUserId,
                    // updatedBy: requestUserId,
                });
                _mongoose.save(insertObj).then(function(saveState) {
                    var stateId = saveState._id;
                    /*insert new state*/
                    var insertObj = new models.cities({
                        name: input.city,
                        state: stateId,
                        country: countryId,
                        // createdBy: requestUserId,
                        // updatedBy: requestUserId,
                    });
                    _mongoose.save(insertObj).then(function(saveCity) {
                        resolve(saveCity);
                    }).catch(function(error) {
                        reject(error);
                    });
                }).catch(function(error) {
                    reject(error);
                });
            }).catch(function(error) {
                reject(error);
            });

        });
    },

    /**
    * Action for Insert city and state 
    *
    * @method InsertNewStateCitiesRecord
    * @param {object} input - request body
    * @param {string} countryId - id of the country
    * @return {promise} res - If query is sucess then it resolves inserted data otherwise rejects some error.
    */

    InsertNewStateCitiesRecord: function(input, countryId) {

        return new Promise(function(resolve, reject) {
            /*insert new state*/
            var insertObj = new models.states({
                name: input.state,
                country: countryId,
                language: input.language,
                localLanguage: input.localLanguage,
                // createdBy: requestUserId,
                // updatedBy: requestUserId,
            });

            _mongoose.save(insertObj).then(function(saveState) {
                var stateId = saveState._id;
                /*insert new state*/
                var insertObj = new models.cities({
                    name: input.city,
                    state: stateId,
                    country: countryId,
                    // createdBy: requestUserId,
                    // updatedBy: requestUserId,
                });
                _mongoose.save(insertObj).then(function(saveCity) {
                    resolve(saveCity);
                }).catch(function(error) {
                    reject(error);
                });
            }).catch(function(error) {
                reject(error);
            });
        });
    },

    /**
    * Action for Insert city 
    *
    * @method InsertNewCitiesRecord
    * @param {string} input - request body
    * @param {string} countryId - id of the country
    * @param {string} statesId - id of the state
    * @return {promise} res - If query is sucess then it resolves inserted data otherwise rejects some error.
    */

    InsertNewCitiesRecord: function(input, countryId, statesId) {
        return new Promise(function(resolve, reject) {
            /*insert new state*/
            var insertObj = new models.cities({
                name: input.city,
                state: statesId,
                country: countryId,
                // createdBy: requestUserId,
                // updatedBy: requestUserId,
            });
            _mongoose.save(insertObj).then(function(saveCity) {

                resolve(saveCity);
            }).catch(function(error) {
                reject(error);
            });
        });
    },

}
