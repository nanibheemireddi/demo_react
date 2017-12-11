/**
    * This is the country model.
    * Creating schema for country
    *
    * @class countryModel
    */
var countrySchema = new Schema({
    name: {type: String, required: true},
    addressFormat : {type: String, default: 'IN'},
    // code: {type: String, required: true, unique: true},
    // dialCode: {type: String, required: true, unique: true},
    image: {
        fileName: {type: String, default: 'world_map.jpg'},
        fileSize: {type: String, default: '10240'},
        folderName: {type: String, default: 'common/'},
    },
    // createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
    // updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
    isActive: {type: Boolean, default: true},
    isDelete: {type: Boolean, default: false},
}, {
    timestamps: true,
    versionKey: false
});

// countrySchema.index({"name":1, "code":1, "dialCode":1}, {unique:true});

/* getting related schema */
countrySchema.statics.getRelatedSchema = function (cb) {
    cb([
        {modelName: models.cities, fieldName: "country"},
        {modelName: models.states, fieldName: "country"},
    ]);
};


/*
 * create model from schema
 */
var collectionName = 'country';
var country = mongoose.model('country', countrySchema, collectionName);


/*
 * export users model
 */
module.exports = country;