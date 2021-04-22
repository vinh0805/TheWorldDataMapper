const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		_id: String!
		id: Int!
		name: String!
		owner: String!
	}

	extend type Query {
		getAllMaps: [Map]
		getMapById(_id: String!): Map
	}
	extend type Mutation {
		addMap(map: MapInput!): Map
		renameMap(_id: String!, name: String!): Map
		deleteMap(_id: String!): Boolean
	}
	input MapInput {
		_id: String
		id: Int
		name: String
		owner: String
	}
`;

module.exports = { typeDefs: typeDefs }
