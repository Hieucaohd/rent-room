import mongoose from 'mongoose';
import Home from '../../src/models/Home';
import User from '../../src/models/User';
import Room from '../../src/models/Room';
import { DB } from '../../src/config/index';
import { readFileSync } from 'promise-fs';
import path from 'path';
import { result } from 'lodash';

const pathToListImagesFile = path.join(__dirname, './data/list-images.json');
const IMAGES = JSON.parse(readFileSync(pathToListImagesFile));

const pathToDescriptionFile = path.join(__dirname, './data/description.txt');
const DESCRIPTION = readFileSync(pathToDescriptionFile, 'utf-8');

const pathToConfigRunFile = path.join(__dirname, './config/config-run-dummy.json');
const CONFIG_RUN = JSON.parse(readFileSync(pathToConfigRunFile));

async function checkImageUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch (err) {
    return false;
  }
}

async function filterAliveImages(imageUrls) {
  const checks = imageUrls.map(async (url) => {
    const isAlive = await checkImageUrl(url);
    return { url, isAlive };
  });

  const results = await Promise.all(checks);
  return results.filter((result) => result.isAlive).map((result) => result.url);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 * @param {Array<string>} imagesAddress
 */
function getRamdomSixImages(imagesAddress) {
  let maxIndex = imagesAddress.length - 1;
  let sixIndexsRamdom = [];
  for (let i = 0; i < 6; i++) {
    sixIndexsRamdom.push(getRandomIntInclusive(0, maxIndex));
  }
  return sixIndexsRamdom.map((index) => imagesAddress[index]);
}

async function createImagesForHome(homeImagesAddress) {
  let allHomes = await Home.find({});
  for (const home of allHomes) {
    let sixRamdomImages = getRamdomSixImages(homeImagesAddress);
    await Home.updateOne(
      { _id: home._id },
      {
        images: sixRamdomImages,
      }
    );
  }
}

async function createImagesForRoom(roomImagesAddress) {
  let allRooms = await Room.find({});
  for (const room of allRooms) {
    let sixRamdomImages = getRamdomSixImages(roomImagesAddress);
    await Room.updateOne(
      { _id: room._id },
      {
        images: sixRamdomImages,
      }
    );
  }
}

async function createDescriptionForHome(description) {
  await Home.updateMany(
    {},
    {
      description,
    }
  );
}

async function createDescriptionForRoom(description) {
  await Room.updateMany(
    {},
    {
      description,
    }
  );
}

async function createAmentiesForRoom() {
  let amenities = [];
  for (let index = 0; index < 11; index++) {
    amenities.push({
      title: JSON.stringify(index),
    });
  }
  await Room.updateMany(
    {},
    {
      amenities: amenities,
    }
  );
}

async function main() {
  await mongoose.connect(DB);

  console.log('FILTER ALIVE IMAGES');
  let roomImagesAddress = await filterAliveImages(IMAGES.roomImageAddress);

  if (CONFIG_RUN.createAmentiesForRoom) {
    console.log('CREATE AMENTITY FOR ROOM');
    await createAmentiesForRoom();
  }

  if (CONFIG_RUN.createImagesForHome) {
    console.log('CREATE IMAGES FOR HOME');
    await createImagesForHome(roomImagesAddress);
  }

  if (CONFIG_RUN.createImagesForRoom) {
    console.log('CREATE IMAGES FOR ROOM');
    await createImagesForRoom(roomImagesAddress);
  }

  if (CONFIG_RUN.createDescriptionForRoom) {
    console.log('CREATE DESCRIPTION FOR ROOM');
    await createDescriptionForRoom(DESCRIPTION);
  }

  if (CONFIG_RUN.createDescriptionForHome) {
    console.log('CREATE DESCRIPTION FOR HOME');
    await createDescriptionForHome(DESCRIPTION);
  }

  console.log('OK');
  process.exit(0);
}

main();
