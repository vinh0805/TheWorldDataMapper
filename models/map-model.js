const { model, Schema, ObjectId } = require('mongoose');
const user = require('./user-model');

const mapSchema = new Schema( 
	{
		_id: {
			type: ObjectId,
			required: true
		},
		id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		owner: {
			type: user,
			required: true
		}
	},
	{ timestamps: true }
);

const Map = model('Map', mapSchema);
module.exports = Map;