/**
    * This is the state model.
    * Creating schema for state
    *
    * @class stateModel
    */
var stateSchema = new Schema({
    name: {type: String, required: true},
    country: {type: Schema.Types.ObjectId, ref: 'country', required: true, },
    // createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
    // updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
    language: {type: String},
    localLanguage: {type: String},
    isActive: {type: Boolean, default: true},
    isDelete: {type: Boolean, default: false},
}, {
    timestamps: true,
    versionKey: false
});

// stateSchema.index({"name":1, "country":1}, {unique:true});
/* getting related schema*/
stateSchema.statics.getRelatedSchema = function (cb) {
    cb([
        {modelName: models.cities, fieldName: "state"},
    ]);
};


/*
 * create model from schema
 */
var collectionName = 'states';
var states = mongoose.model('states', stateSchema, collectionName);


/*
 * export users model
 */
module.exports = states;