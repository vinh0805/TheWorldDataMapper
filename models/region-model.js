const { model, Schema, ObjectId } = require('mongoose');
const subRegionSchema = require('./subRegion-model').schema;

const regionSchema = new Schema(
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
		subRegion: [subRegionSchema]
		},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);

module.exports = Region;