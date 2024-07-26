const router = require('express').Router();
const { User, Thought } = require('../../models/index');

// /api/users/
router
    .route('/')
    // get all users
    .get(async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        };
    })
    // create new user
    .post(async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        };
    });

// /api/users/:userId
router
    .route('/:userId')
    // get single user by id
    .get(async (req, res) => {
        try {
            const singleUser = await User.findById(req.params.userId);
            res.json(singleUser);
        }
        catch (err) {
            console.err(err);
            res.status(500).json(err);
        };
    })
    // update single user by id
    .put(async (req, res) => {
        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            );
            res.json(updateUser)
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        };
    })
    // delete single user by id
    .delete(async (req, res) => {
        try {
            const deleteUser = await User.findByIdAndDelete(req.params.userId);
            // delete associated thoughts if the user has any
            if (deleteUser.thoughts.length > 0) {
                await Thought.deleteMany({ username: deleteUser.username });
            };
            res.json({
                user_deleted: deleteUser
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        };
    });

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    // add friend to user friends array
    .post(async (req, res) => {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        try {
            const user = await User.updateOne(
                { _id: userId },
                // $addToSet ensures no duplicate id is added to friends array
                { $addToSet: { friends: friendId }}
            );
            res.json(user);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);          
        };
    })
    // delete friend from user friends array
    .delete(async (req, res) => {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        try {
            const deleteFriend = await User.updateOne(
                { _id: userId },
                { $pull: { friends: friendId }}
            );
            res.json(deleteFriend);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);  
        };
    })


module.exports = router;