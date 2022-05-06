import mongoose from 'mongoose';
import Room from '../../src/models/Room';

async function start() {
    await mongoose.connect(
        'mongodb+srv://hieucao192:helloworld123@authenticationtest.6lh8w.mongodb.net/rentroomdb?retryWrites=true&w=majority'
    );
    const roomDeleted = await Room.deleteMany({ images: [] });
    console.log('ok');
	process.exit(0);
}

start();
