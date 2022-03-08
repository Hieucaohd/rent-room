import { config } from "dotenv";

const { parsed } = config();

export const {
    PORT,
    DB_DOCKER,
    DB_ATLAS,
    MODE,
    DB = MODE === "production" ? DB_ATLAS : DB_DOCKER,
    BASE_URL,
    URL = MODE === "production" ? `${BASE_URL}` : `${BASE_URL}:${PORT}`,
    SECRET,
    FOLDER_SAVE_FILE = "images",
} = parsed;
