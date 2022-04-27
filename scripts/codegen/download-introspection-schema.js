import { getIntrospectionQuery } from 'graphql';
import http from 'http';
import { config } from 'dotenv';
import fs from 'fs';

const { parsed } = config();
let { PORT } = parsed;
PORT = parseInt(PORT);


/**
 * Make an introspection query to RentRoom server and write to result to
 * {@link outputFilePath}.
 *
 * If there any error when connect to server, promise resolve to false.
 *
 * @param {String} apiPath
 * @param {String} outputFilePath
 * @returns {Promise<Boolean>}
 */
async function downloadIntrospectionSchema(apiPath, outputFilePath) {
    const body = JSON.stringify({ query: getIntrospectionQuery() });

    return new Promise((resolve, reject) => {
        const request = http.request(
            {
                method: 'post',
                host: 'localhost',
                port: PORT,
                path: '/' + apiPath,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body),
                },
            },
            (response) => {
                const outputFile = fs.createWriteStream(outputFilePath);
                response.pipe(outputFile);
                response.on('end', () => resolve(true));
                response.on('error', reject);
            }
        );
        request.write(body);
        request.end();
        request.on('error', (err) => {
            if (err.code === 'ECONNREFUSED') {
                console.error(`Error: can not connect to http://localhost:${PORT}/${apiPath}`);
                resolve(false);
            }
            reject(err);
        });
    });
}

export { downloadIntrospectionSchema };
