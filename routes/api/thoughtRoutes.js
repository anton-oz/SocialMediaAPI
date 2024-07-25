const router = require('express').Router();
const { Thought } = require('../../models');

// /api/thoughts/
router
    .route('/')
    .get(async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    })

module.exports = router;