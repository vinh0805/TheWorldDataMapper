const { model, Schema, ObjectId } = require('mongoose');
const regionSchema = require('./region-model').schema;

const subRegionSchema = new Schema(
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
		capital: {
			type: String,	
			required: true
		},
		leader: {
			type: String,
			required: true
		},
		flag: {
			type: String,
			required: true
		},
		landmarks: {
			type: [String],
			required: true
		},
		ancestorRegion: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
);

const subRegion = model('SubRegion', subRegionSchema);

module.exports = SubRegion;