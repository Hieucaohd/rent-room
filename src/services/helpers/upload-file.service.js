import { createWriteStream } from "fs";
import { parse, join } from "path";
import { FOLDER_SAVE_STATIC_FILE, STATIC_FILE_URL } from "../../config";
import { v4 as uuidv4 } from "uuid";

export const generateFilename = (filename) => {
    // generate filename for save that the name of file is not override
    // exist file in the folder

    let { ext, name } = parse(filename);

    // replace special characters in name
    name = name.replace(/([^a-z0-9 ]+)/gi, "-").replace(" ", "_");

    // generate name for file to save
    // this use uuid for avoid override exist file in folder
    filename = `${name}-${uuidv4()}${ext}`;

    return filename;
};

export const uploadFile = async (file) => {
    let { createReadStream, filename, mimetype, encoding } = await file;

    // generate name for file to save
    // this use uuid for avoid override exist file in image folder
    filename = generateFilename(filename);
    let serverFile = join(__dirname, `../${FOLDER_SAVE_STATIC_FILE}/${filename}`);

    // for testing: it has no uuid in name
    // let serverFile = join(__dirname, `../${SAVE_FILE_FOLDER}/${name}${ext}`);

    // write file to folder
    const stream = createReadStream();
    const out = createWriteStream(serverFile);
    stream.pipe(out);
    try {
        // some server not support stream/promise package
        const { finished } = require("stream/promises");
        await finished(out);
    } catch (err) {
        console.log("Server does not support stream/promise package");
    }

    // generate url for saving to database by removing 'images' and '\\' folder in path of file
    let getFileName = serverFile.split(FOLDER_SAVE_STATIC_FILE)[1].replace("\\", "");
    filename = `${STATIC_FILE_URL}/${getFileName}`;

    return { filename, mimetype, encoding };
};

export const uploadFileFirebase = async (file) => {
    // upload file to firebase

    let { createReadStream, filename, mimetype, encoding } = await file;

    // generate filename for file to save
    filename = generateFilename(filename);

    // const stream = createReadStream()
    // const storageRef = ref(storage, `${FOLDER_SAVE_FILE}/${filename}`)
    // uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log("Uploaded a blob or file!");
    // });

    return { filename, mimetype, encoding };
};
