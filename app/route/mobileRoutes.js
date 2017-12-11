var mobControllers = require('../mob');


/*
 routes for user 
*/

app.post('/mob/user/login', mobControllers.users.userLogin);
app.post('/mob/user/registration', mobControllers.users.userRegistration);
app.post('/mob/user/otp-verify', mobControllers.users.otpVerify);
app.get('/mob/user/details', mobControllers.users.userDetails);
// app.post('/mob/user/image-upload', mobControllers.users.imageUpload);
// app.get('/mob/users', mobControllers.users.getFriends);
// app.get('/mob/users/friends-groups/:mobileNo', mobControllers.users.friendsAndGroupList);


/*
routes for default schema
*/

app.get('/config/setup/:modelName', mobControllers.config.insterDefaultMasterData);

/*
 routes for location
*/

app.post('/mob/import-location', mobControllers.location.importLocations);
app.get('/mob/get-locations', mobControllers.location.getLocations);

/*
 routes for agricultureCategories
*/

app.get('/mob/agriculture/get-categories', mobControllers.agricultureCategories.getCategories);