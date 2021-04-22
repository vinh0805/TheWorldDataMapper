const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
		id: Int!
		name: String!
		subRegion: [SubRegion!]
	}
	type SubRegion {
		_id: String!
		id: Int!
		name: String!
		capital: String!
		leader: String!
		flag: String!
		landMark: [String]
		ancestorRegion: Region
	}

	extend type Query {
		getAllMaps: [Map!]
		getMapById(_id: String!): Map!

		getAllRegions: [Region!]
		getRegionById: Region!
		getSubRegionById: SubRegion!
		getPreviousRegion: Region!
		getNextRegion: Region!
	}

	extend type Mutation {
		addSubRegion(subRegion: SubRegionInput!): SubRegion
		editSubRegion(_id: String!, newSubRegion: SubRegionInput!): SubRegion
		deleteSubRegion(_id: String!): Boolean
		changeParentOfSubRegion(_id: String!, newParent: String!): SubRegion
		addLandmark(_id: String!, content: String): String
		deleteLandmark(_id: String!, content: String): [String]
		editLandmark(_id: String!, content: String): [String]
		moveSubRegion(_id: String!, oldAncestorId: String!, newAncestorId: String!): SubRegion
	}

	input SubRegionInput {
		_id: String
		id: Int
		name: String
		capital: String
		leader: String
		flag: String
		landMark: [String]
		ancestorRegion: RegionInput
	}
	input RegionInput {
		_id: String!
		id: Int!
		name: String!
		subRegion: [SubRegionInput]
	}
`;

module.exports = { typeDefs: typeDefs }
