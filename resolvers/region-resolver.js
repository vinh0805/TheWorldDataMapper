const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');
const SubRegion = require('../models/subRegion-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of map objects on success, and an empty array on failure
		**/
		getAllRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const regions = await Region.find({owner: _id});
			if(regions) return (regions);

		},
		/** 
		 	@param 	 {object} args - a region id
			@returns {object} a region on success and an empty object on failure
		**/
		getRegionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const region = await Region.findOne({_id: objectId});
			if(region) return region;
			else return ({});
		},
		/** 
		 	@param 	 {object} args - a sub region id
			@returns {object} a region on success and an empty object on failure
		**/
		getSubRegionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const subRegion = await SubRegion.findOne({_id: objectId});
			if(subRegion) return subRegion;
			else return ({});
		},
		/** 
		 	@param 	 {object} args - a region id
			@returns {object} a region on success and an empty object on failure
		**/
		getPreviousRegion: async (_, args) => {
			const { curId } = args;
			const objectId = new ObjectId(curId);
			const previousRegion = await Region.find({_id: {$gt: curId}}).sort({_id: 1 }).limit(1);
			if(previousRegion) return previousRegion;
			else return ({});
		},
		/** 
		 	@param 	 {object} args - a region id
			@returns {object} a region on success and an empty object on failure
		**/
		getNextRegion: async (_, args) => {
			const { curId } = args;
			const objectId = new ObjectId(curId);
			const nextRegion = await Region.find({_id: {$lt: curId}}).sort({_id: -1 }).limit(1);
			if(nextRegion) return nextRegion;
			else return ({});
		}
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - an empty sub region object
			@returns {string} the objectID of the sub region or an error message
		**/
		addSubRegion: async (_, args) => {
			const { subregion } = args;
			const objectId = new ObjectId();
			const { id, name, capital, leader, flag, landmarks, ancestorRegion } = subregion;
			const newSubRegion = new SubRegion({
				_id: objectId,
				id: id,
				name: name,
				capital: capital,
				flag: flag,
				landmarks: landmarks,
				ancestorRegion: ancestorRegion
			});
			const updated = await newSubRegion.save();
			if(updated) return objectId;
			else return ('Could not add subregion');
		},
		/** 
		 	@param 	 {object} args - a sub region objectID, field and update value
			@returns {boolean} true on successful update, false on failure
		**/
		editSubRegion: async (_, args) => {
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await SubRegion.updateOne({_id: objectId}, {[field]: value});
			if(updated) return value;
			else return "";
		},
		/** 
		 	@param 	 {object} args - a sub region objectID
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteSubRegion: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await SubRegion.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a sub region objectID and new parent
			@returns {boolean} true on successful update, false on failure
		**/
		changeParentOfSubRegion: async (_, args) => {
			const { _id, newParent } = args;
			const objectId = new ObjectId(_id);
			let subRegion = await SubRegion.findOne({_id: objectId});
			if(subRegion) {
				const updated = await SubRegion.updateOne({_id: objectId}, {ancestorRegion: newParent});
				if(updated) return value;
			}
			return "";
		},
		/** 
		 	@param 	 {object} args - a sub region objectID and new landmark
			@returns {boolean} true on successful update, false on failure
		**/
		addLandmark: async (_, args) => {
			const { _id, content } = args;
			const objectId = new ObjectId(_id);
			let subRegion = await SubRegion.findOne({_id: objectId});
			if(subRegion) {
				subRegion.content.push(content);
				let newContent = subRegion.content;
				const updated = await SubRegion.updateOne({_id: objectId}, {content: newContent});	
				if(updated) return value;
			}
			return "";
		},
		/** 
		 	@param 	 {object} args - a sub region objectID and landmark
			@returns {boolean} true on successful update, false on failure
		**/
		removeLandmark: async (_, args) => {
			const { _id, content} = args;
			const objectId = new ObjectId(_id);
			let subRegion = await SubRegion.findOne({_id: objectId});
			if(subRegion) {
				subRegion.content.map((row) => {
					if (row === content) {
						delete row;
					}
					break;
				});
				let newContent = subRegion.content;
				const updated = await SubRegion.updateOne({_id: objectId}, {content: newContent});
				if(updated) return value;
			}
			return "";
		},
		/** 
		 	@param 	 {object} args - a sub region objectID and new landmark
			@returns {boolean} true on successful update, false on failure
		**/
		editLandmark: async (_, args) => {
			const { _id, oldContent, newContent } = args;
			const objectId = new ObjectId(_id);
			let subRegion = await SubRegion.findOne({_id: objectId});
			if(subRegion) {
				subRegion.content.map((row) => {
					if (row === oldContent) {
						row = newContent;
					}
					break;
				});
				let newContent = subRegion.content;
				const updated = await SubRegion.updateOne({_id: objectId}, {content: newContent});
				if(updated) return value;
			}
			return "";
		},
		/** 
		 	@param 	 {object} args - a sub region objectID and new parent
			@returns {boolean} true on successful update, false on failure
		**/
		moveSubRegion: async (_, args) => {
			const { _id, newRegionId } = args;
			const objectId = new ObjectId(_id);
			const objectNewRegionId = new ObjectId(newRegionId);
			
			let subRegion = await SubRegion.findOne({_id: objectId});
			let parentRegion = await Region.findOne({_id: objectNewRegionId});
			if(subRegion) {
				const updated = await SubRegion.updateOne({_id: objectId}, {ancestorRegion: parentRegion});
				if(updated) return value;
			}
			return "";
		}
	}
}
