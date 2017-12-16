var jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt-nodejs");
var multiparty = require('multiparty');
var fs = require('fs');

module.exports = {
    /*
     * @param {type} req
     * @param {type} res
     * @returns {}
     * @desc : This is for user registration
     */

    userLogin: function(req, res) {
        var requiredParams = ['mobileNo']; /* required params */
        helper.validateRequiredParams(req, res, requiredParams).then(function(response) {
            var postData = req.body;
            var condition = { mobileNo: req.body.mobileNo };
            var response = {};
            var data;
            models.users.findOne(condition).exec(function(err, data) {
                if (err) {
                    helper.formatResponse('', res, error);
                } else if (_.isEmpty(data)) {
                    data = {isNewUser: true};
                    response.data = data;
                    helper.formatResponse(response, res, '');
                } else {
                    var token = jwt.sign(data, process.env.JWT_SECRET_KEY);
                    // res.setHeader('x-access-token', token);
                    var tempData = data.toJSON();
                    tempData.isNewUser = false;
                    tempData.token = token;
                    response.data = tempData;
                    helper.formatResponse(response, res, '');
                }
            });

        });
    },

    

    /**
     * Action for user registration
     * 
     * @method userRegistration
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true. 
     */
    
    userRegistration: function(req, res) {
        var requiredParams = ['firstName', 'lastName', 'mobileNo']; /* required params */
        helper.validateRequiredParams(req, res, requiredParams).then(function() {
            var postData = req.body;
            postData.password = bcrypt.hashSync(req.body.password);
            var userSave = new models.users(postData);
            _mongoose.save(userSave).then(function(userData) {
                var response = {};
                var token = jwt.sign(userData, process.env.JWT_SECRET_KEY);
                // res.setHeader('x-access-token', token);
                var data = userData.toJSON();
                data.token = token;
                response.data = data; 
                helper.formatResponse(response, res, '');
            }).catch(function(error) {
                console.log("error", error);
                helper.formatResponse('', res, error);
            })
        });
    },

    /**
     * Action for updating user details
     * 
     * @method updateUser
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true. 
     */
    
    updateUser: function(req, res) {
        var requiredParams = ['firstName', 'lastName'];
        helper.validateRequiredParams(req, res, requiredParams).then(function() {
            var updateParams = req.body;
            var condition = {_id: requestUserId};
            _mongoose.update(models.users, condition, updateParams).then(function(data) {
                var response = {};
                response.data = data;
                helper.formatResponse(response, res, '');
            }).catch(function(error) {
                helper.formatResponse('', res, error);
            });
        });        
    },

    /**
     * Action for upload image
     * 
     * @method imageUpload
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true. 
    */

    imageUpload: function(req, res) {
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            if(err) {
                err = {
                    httpstatus: 400,
                    msg: 'Unable to save'
                };
                helper.formatResponse('', res, err);    
            } else {
                var fileName = fields.mobileNo + '_' + files.profilePic[0].originalFilename;
                var newPath = __dirname + '/../../public/' + fileName;
                fs.rename(files.profilePic[0].path, newPath, function() {
                    var profilePic = {
                        name: fileName,
                        filePath: "192.168.11.221/demo_app/public"
                    }
                    var response = [];
                    response.data = profilePic;
                    helper.formatResponse(response, res, '');    
                });
            }
        });        
    },

    /**
     * Action for otp verify
     * 
     * @method otpVerify
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true. 
     */

    otpVerify: function(req, res) {
        var requiredParams = ['otp', 'mobileNo'];
        var input = req.body.otp;
        helper.validateRequiredParams(req, res, requiredParams).then(function() {
            input.value = parseInt(input);
            var modelName = models.users;
            var condition = {
                mobileNo: req.body.mobileNo
            };
            var fields = [""];
            _mongoose.findOne(modelName, condition, fields).then(function(data) {
                var data = data.data;
                if (typeof data.otp.value !== 'undefined' && ((data.otp.value == input))) {
                    var moment = require('moment');
                    var startDate = moment(data.otp.timeOfCreation);
                    var endDate = moment(new Date().toISOString());
                    var duration = moment.duration(endDate.diff(startDate));
                    var otpGeneratedMins = duration.asMinutes();
                    if (otpGeneratedMins <= 150000000000) {
                        var msg = "OTP verified successfully";
                        var response = {};
                        response.msg = msg;
                        helper.formatResponse(response, res, '');
                    } else {
                        helper.formatResponse('', res, appMessage.otp.error.expired);
                    }
                } else {
                    var error = {
                        httpstatus: 200,
                        msg: appMessage.otp.error.wrong.msg
                    };
                    helper.formatResponse('', res, error);
                }
            }).catch(function(error) {
                helper.formatResponse('', res, error);
            });
        });
    },

    /**
     * Action for getting user details
     * 
     * @method userDetails
     * @param {req} request
     * @param {res} response
     * @return {status} res -If it returns error then the status is false otherwise true. 
     */
    
    userDetails: function(req, res) {
        var userId = requestUserId;
        console.log("userId", userId);
        var agg = [
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup:{
                    from: "cities",
                    localField: "city",
                    foreignField: "_id",
                    as: "cityInfo"
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
            // {
            //     $lookup:{
            //         from: "country",
            //         localField: "country",
            //         foreignField: "_id",
            //         as: "countryInfo"
            //     }
            // },
            {
                $addFields: {
                    city: {$arrayElemAt: ["$cityInfo.name", 0]},
                    cityId: {$arrayElemAt: ["$cityInfo._id", 0]},
                    state: {$arrayElemAt: ["$stateInfo.name", 0]},
                    stateId: {$arrayElemAt: ["$stateInfo._id", 0]},
                    // country: {$arrayElemAt: ["$countryInfo.name", 0]},
                    // countryId: {$arrayElemAt: ["$countryInfo._id", 0]}
                }
            },
            { $project: { isDelete: 0, isActive: 0, otp: 0, cityInfo: 0, stateInfo: 0, countryInfo: 0} }
        ];
        models.users.aggregate(agg, function(err, data) {
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
                response.data = data[0];
                helper.formatResponse(response, res, '');
            }
        });    
    },
    
};