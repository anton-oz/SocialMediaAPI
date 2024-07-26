const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData, randomIndex } = require('./data');

connection.on('error', (err) => console.error(err));

console.time('seeding');

connection.once('open', async () => {
    console.log('connected\n');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) await connection.dropCollection('users');

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts'}).toArray();
    if (thoughtCheck.length) await connection.dropCollection('thoughts');

    // populate thought collection
    await Thought.collection.insertMany(thoughtData);
    
    // populate user collection
    await User.collection.insertMany(userData);

    // populate thoughts array for each user that has a thought
    const thoughtsArr = await Thought.find();
    for (thought in thoughtsArr) {
        const user = await User.findOne({ username: thoughtsArr[thought].username });
        const idString = thoughtsArr[thought]._id.toString()
        user.thoughts.push(idString);
        await user.save();
    };

    // populate friends array for each user
    const usersArr = await User.find();
    for (currentUser in usersArr) {
        const user = await User.findOne({ username: usersArr[currentUser].username });
        const currentUserId = usersArr[currentUser]._id.toString();
        for (friend in usersArr) {
            const friendId = usersArr[friend]._id.toString();
            if (currentUserId === friendId) {
                continue;
            }
            else {
                user.friends.push(friendId);

            }
        };
        await user.save();
    };


    console.log('success!\n');
    console.timeEnd('seeding');
    process.exit(0);
});
