import { config } from 'dotenv';
import dayjs from 'dayjs';

const { parsed } = config();

let {
    PORT,
    DB_DOCKER_URL,
    DB_ATLAS_URL,
    MODE,
    DB = MODE === 'production' ? DB_ATLAS_URL : DB_DOCKER_URL,
    BASE_URL,
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
} = parsed;

/** @type {Number} */
PORT = parseInt(PORT);

const FOLDER_SAVE_STATIC_FILE = 'images';
const STATIC_FILE_URL = MODE === 'production' ? `${BASE_URL}` : `${BASE_URL}:${PORT}`;

const TIME_ACCESS_TOKEN_EXPIRED = 60 * 60 * 24 * 7; // second
const TIME_REFRESH_TOKEN_EXPIRED = 60 * 60 * 24 * 365; // second

const TIME_COOKIE_OF_ACCESS_TOKEN_EXPIRED = dayjs().add(7, 'days').toDate();
const TIME_COOKIE_OF_REFRESH_TOKEN_EXPIRED = dayjs().add(365, 'days').toDate();
const ACCESS_TOKEN_COOKIE_KEY = 'access_token';
const REFRESH_TOKEN_COOKIE_KEY = 'refresh_token';

export {
    PORT,
    DB,
    MODE,
    STATIC_FILE_URL,
    FOLDER_SAVE_STATIC_FILE,
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_COOKIE_KEY,
    REFRESH_TOKEN_COOKIE_KEY,
    TIME_ACCESS_TOKEN_EXPIRED,
    TIME_REFRESH_TOKEN_EXPIRED,
    TIME_COOKIE_OF_ACCESS_TOKEN_EXPIRED,
    TIME_COOKIE_OF_REFRESH_TOKEN_EXPIRED,
};
