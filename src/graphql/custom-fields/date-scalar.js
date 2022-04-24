import { GraphQLScalarType, Kind } from "graphql";

/**
 * Reprensent the Date scalar in apollo.
 */
export const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',

	/**
	 * Convert Date object to iso.
	 * @param {Date} value 
	 * @returns {String} - iso date
	 */
	serialize(value) {
		let hour = value.getHours();
		// convert utc's hour to vietnam's hour
		hour += 7;
		value.setHours(hour);
		return value.toISOString();
	}
})