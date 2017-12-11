
/**
    * This is the city model.
    * Creating schema for city
    *
    * @class cityModel
    */

var citySchema = new Schema({
	name: { type: String, required: true},
	state:{type: Schema.Types.ObjectId, ref: 'states',required: true},
	country:{type: Schema.Types.ObjectId, ref: 'country'},
  // latitude : {type: String},  
  // longitude : {type: String},
  // geoIndex : { type: [Number], index: '2dsphere'},
  // type : {type: String},
	// createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
	// updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
  isActive: { type: Boolean, default: true },
	isDelete: { type: Boolean, default: false },
},{
  timestamps: true,
  versionKey: false
});


// citySchema.index({"name":1, "state":1, "country":1}, {unique:true});

/*
 * create model from schema
*/
var collectionName = 'cities';
var cities = mongoose.model('cities', citySchema,collectionName);


/*
 * export users model
*/
module.exports = cities;