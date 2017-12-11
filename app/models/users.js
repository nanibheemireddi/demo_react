/*
 * Users model schema
 */

var userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: String},
    mobileNo: {type: String, unique: true},
    country: {type: Schema.Types.ObjectId, ref: 'country'},
    state: {type: Schema.Types.ObjectId, ref: 'states'},
    city: {type: Schema.Types.ObjectId, ref: 'cities'},
    isActive: {type: Boolean, default: false},
    otp: {
        value: {type: Number, default: 123456},
        timeOfCreation: {type: Date, default: Date.now}
    },
    isDelete: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
});

/*
 * create model from schema
 */
var collectionName = 'users';
var users = mongoose.model('users', userSchema,collectionName);


/*
 * export users model
 */
module.exports = users;