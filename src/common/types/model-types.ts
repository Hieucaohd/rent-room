import { ObjectId } from "mongodb"
import { Document } from "mongoose"
import { Amenities, HomeComment } from "./graphql-types"

export type User = {
	_id: ObjectId,
	email: String,
	password: String,
	fullname: String,
	numberPhone: String,
	province: Number,
	district: Number,
	ward: Number,
	role: Array<String>,
	userType: String,
	createdAt: Date,
	updatedAt: Date,
}

export type UserModel = User & Document

export type Home = {
	_id: ObjectId,
	owner: User,
	province: Number,
	district: Number,
	ward: Number,
	liveWithOwner: Boolean,
	electrictPrice: Number,
	waterPrice: Number,
	internetPrice: Number,
	cleaningPrice: Number,
	images: Array<String>,
	totalRooms: Number,
	detailAddress: String,
	position: {
		x: Number,
		y: Number,
		lat: Number,
		lng: Number,
	},
	description: String,
	title: String,
	createdAt: Date,
	updatedAt: Date,
}

export type HomeModel = Home & Document

export type Room = {
	_id: ObjectId,
	home: Home,
	price: Number,
	square: Number,
	isRented: Boolean,
	floor: Number,
	images: Array<String>,
	description: String,
	roomNumber: Number,
	amenities: Array<Amenities>,
	title: String,
	createdAt: Date,
	updatedAt: Date,
}

export type RoomModel = Room & Document;

export type HomeCommentModel = HomeComment & Document & {
	_id: ObjectId
}