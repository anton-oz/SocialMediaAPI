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
        let friendIndex = randomIndex(usersArr);
        for (let i = 2; i <= usersArr.length - 1; i++) {
            if (friendIndex === currentUser) {
                while (friendIndex === currentUser) {
                friendIndex = usersArr[randomIndex(usersArr)]
                }
            }
            const friendId = usersArr[friendIndex]._id.toString();
            user.friends.push(friendId)
            await user.save();
        }
    };



    console.log('success!\n');
    console.timeEnd('seeding\n');
    process.exit(0);
});
