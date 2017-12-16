/**
* This is the agriculture model.
* Creating schema for agriculture
*
* @class agricultureModel
*/

var AgricultureSchema = new Schema({
    title: {type: Object, required: true},
    steps: [
        {
            title: {type: Object},
            description: {type: Object},
            imageName: {type: String},
        }
    ],
    item: {type: Schema.Types.ObjectId, ref: 'agricultureItems'},
    link: {type: Object},
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