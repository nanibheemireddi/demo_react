/**
* This is the agriculture categories model.
* Creating schema for agriculture categories
*
* @class agricultureCategoriesModel
*/

var AgricultureCategoriesSchema = new Schema({
    category: {type: Object, required: true},
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
var collectionName = 'agricultureCategories';
var agricultureCategories = mongoose.model('agricultureCategories', AgricultureCategoriesSchema,collectionName);


/*
 * export users model
 */
module.exports = agricultureCategories;