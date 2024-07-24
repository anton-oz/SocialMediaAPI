const router = require('express').Router();
const { User } = require('../../models/index');
// /api/users/
router
    .route('/')
    .get(async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    });

module.exports = router;