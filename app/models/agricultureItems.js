/**
* This is the agriculture items model.
* Creating schema for agriculture items
*
* @class agricultureItemsModel
*/

var AgricultureItemsSchema = new Schema({
    item: {type: Object, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'agricultureCategories'},
    imageName: {type: String},
    isActive: {type: Boolean, default: false},
    isDelete: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
});

/*
 * create model from schema
 */
var collectionName = 'agricultureItems';
var agricultureItems = mongoose.model('agricultureItems', AgricultureItemsSchema,collectionName);


/*
 * export users model
 */
module.exports = agricultureItems;