import mongoose from 'mongoose';
import Room from '../../src/models/Room';
import { DB } from '../../src/config/index';

async function start() {
    await mongoose.connect(
        DB
    );
    const roomDeleted = await Room.deleteMany({ images: [] });
    console.log('ok');
	process.exit(0);
}

start();
