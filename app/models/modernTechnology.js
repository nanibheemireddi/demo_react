/**
* This is the modern technology model.
* Creating schema for modern technology 
*
* @class modernTechnologyModel
*/

var modernTechnologySchema = new Schema({
    title: {type: Object, required: true},
    description: {type: Object },
    imageName: {type: Object },
    link: {type: Object },
    isActive: {type: Boolean, default: false},
    isDelete: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
});

/*
 * create model from schema
 */
var collectionName = 'modernTechnology';
var modernTechnology = mongoose.model('modernTechnology', modernTechnologySchema, collectionName);


/*
 * export users model
 */
module.exports = modernTechnology;