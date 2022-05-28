import { Router } from "express";

const route = Router();

route.get('/', (req, res) => {
	return res.redirect("https://github.com/Hieucaohd/rent-room");
})

export default route;