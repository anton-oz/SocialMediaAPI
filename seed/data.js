const userData = [
    {
        username: 'testuser1',
        email: 'test@test.com',
    },
    {
        username: 'goofy28',
        email: 'goofy28@test.com',
    }
];

const thoughtData = [
    {
        thoughtText: "Here's a thought!",
        username: 'testuser1',
        reactions: [
            {
                reactionBody: 'cool thought!',
                username: 'goofy28',
            }
        ],
    }
];

module.exports = { userData, thoughtData };