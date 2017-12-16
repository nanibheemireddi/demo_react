/**
* This is the trading model.
* Creating schema for trading
*
* @class tradingItemsModel
*/

var tradingSchema = new Schema({
    item: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    pricePerKg: {type: Number, required: true},
    city: {type: Schema.Types.ObjectId, ref: 'cities'},
    state: {type: Schema.Types.ObjectId, ref: 'states'},
    createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
    isActive: {type: Boolean, default: false},
    isDelete: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
});

/*
 * create model from schema
 */
var collectionName = 'trading';
var trading = mongoose.model('trading',tradingSchema,collectionName);


/*
 * export users model
 */
module.exports = trading;