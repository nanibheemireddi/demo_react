/**
* This is the agriculture model.
* Creating schema for agriculture
*
* @class agricultureModel
*/

var AgricultureSchema = new Schema({
    title: {type: String, required: true},
    steps: [
        {
            title: {type: String},
            description: {type: String},
            imageName: {type: String},
        }
    ],
    languageCode: {type: String},
    isActive: {type: Boolean, default: false},
    isDelete: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
});

/*
 * create model from schema
 */
var collectionName = 'agriculture';
var agriculture = mongoose.model('agriculture', AgricultureSchema,collectionName);


/*
 * export users model
 */
module.exports = users;