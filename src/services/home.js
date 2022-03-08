import { Home } from "../models"

export const getAllHomes = async () => {
	return await Home.find();
}

export const createHome = async (newHome) => {
	return await Home.create(newHome);
}