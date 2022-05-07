import mongoose from 'mongoose';
import Home from '../../src/models/Home';
import User from '../../src/models/User';

async function start() {
    await mongoose.connect(
        'mongodb+srv://hieucao192:helloworld123@authenticationtest.6lh8w.mongodb.net/rentroomdb?retryWrites=true&w=majority'
    );

    let users = await User.aggregate([
        {
            $lookup: {
                from: 'homes',
                localField: '_id',
                foreignField: 'owner',
                as: 'homes',
            },
        },
        {
            $project: {
                homes: 1,
                _id: 1,
				email: 1,
				userType: 1,
                length_of_homes: { $size: '$homes' },
            },
        },
        {
            $match: {
                length_of_homes: { $gt: 0 },
            },
        },
    ]);

    console.log(users);

    // for (const user of users) {
    //     await User.findByIdAndUpdate(user._id, {
    //         userType: 'HOST',
    //     });
    // }
    console.log('ok');
    process.exit(0);
}

start();
