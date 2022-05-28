import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

let variable = {
    '{{ graph.name }}': 'rent-room-connect',

    '{{ graph.ref }}': 'rent-room-connect@current',

    '{{ graph.url.endpoint }}': 'https://rent-room.vercel.app/graphql',

    '{{ graph.url.changelog }}':
        'https://studio.apollographql.com/graph/rent-room-connect/changelog?variant=current',

    '{{ graph.url.reference }}':
        'https://studio.apollographql.com/graph/rent-room-connect/schema/reference?variant=current',

    '{{ graph.url.sdl }}':
        'https://studio.apollographql.com/graph/rent-room-connect/schema/sdl?variant=current',

    '{{ graph.url.explorer }}':
        'https://studio.apollographql.com/graph/rent-room-connect/explorer?variant=current',

    '{{ graph.url.fields }}':
        'https://studio.apollographql.com/graph/rent-room-connect/fields?variant=current',

    '{{ graph.url.clients }}':
        'https://studio.apollographql.com/graph/rent-room-connect/clients?variant=current',

    '{{ graph.url.operations }}':
        'https://studio.apollographql.com/graph/rent-room-connect/operations?variant=current',

    '{{ graph.url.errors }}':
        'https://studio.apollographql.com/graph/rent-room-connect/operations?tab=errors&variant=current',

    '{{ graph.url.checks }}':
        'https://studio.apollographql.com/graph/rent-room-connect/checks?variant=current',

    '{{ graph.url.launches }}':
        'https://studio.apollographql.com/graph/rent-room-connect/launches?variant=current',

    '{{ altair.url.download }}':
        'https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja',

    '{{ postman.url.download }}':
        'https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=vi',

    '{{ database.url.schema }}': 'https://app.diagrams.net/#G1HPKnnqHcs13XUuZdTuJdzJj2-0pGCA00',

    '{{ admin.url.messenger }}': 'https://www.messenger.com/t/100057157604437/',

    '{{ admin.gmail }}': 'mailto:hieucaohd@gmail.com',

    '{{ design.url.figma }}':
        'https://www.figma.com/file/3svxQsJdXgbaEBdHJ5OgIO/Trang-Chu?node-id=0%3A1',

    '{{ front-end.url.file-env }}':
        'https://docs.google.com/document/d/175Povc8vTWOlZBUQwN5SzCnV-kqmHoKNGVygVBE3Ygw/edit?usp=sharing',

    '{{ back-end.url.file-env }}':
        'https://docs.google.com/document/d/175Povc8vTWOlZBUQwN5SzCnV-kqmHoKNGVygVBE3Ygw/edit?usp=sharing',

    '{{ report.url }}':
        'https://docs.google.com/document/d/17GPlCqnUj4FLPXBfp7nBh2zXkbWliAGDcJ11gczWbEQ/edit?usp=sharing',
};

async function main() {
    let pathToReadmeTestFile = path.join(__dirname, './README.test.md');
    let pathToReadmeFile = path.join(__dirname, '../../README.md');
    let readmeFileContent = readFileSync(pathToReadmeFile, { encoding: 'utf-8' });

    for (const key in variable) {
        if (Object.hasOwnProperty.call(variable, key)) {
            const value = variable[key];
            readmeFileContent = readmeFileContent.replaceAll(key, value);
        }
    }

    writeFileSync(pathToReadmeFile, readmeFileContent);
}

main();
