const userData = [
    {
        username: 'testuser1',
        email: 'test@test.com',
    },
    {
        username: 'goofy28',
        email: 'goofy28@test.com',
    },
    {
        username: 'jimBob47',
        email: 'jimbob@test.com',
    },
    {
        username: 'patrickStar',
        email: 'patrickStar5@test.com',
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
            },
            {
                reactionBody: 'coolio!?',
                username: 'patrickStar'
            },
        ],
    },
    {
        thoughtText: 'I miss spongebob...',
        username: 'patrickStar',
        reactions: [
            {
                reactionBody: 'We feel for you patrick!',
                username: 'jimBob47',
            },
            {
                reactionBody: 'Take a trip to Bikini Bottom!',
                username: 'goofy28',
            },
        ]
    },
    {
        thoughtText: 'goofy woofy goofy goof',
        username: 'goofy28',
        reactions: [
            {
                reactionBody: 'keep the thoughts coming!!',
                username: 'patrickStar'
            },
            {
                reactionBody: 'what a thought provoking thought!',
                username: 'testuser1',
            },
        ]
    },
];

const randomIndex = (array) => Math.floor(array.length * Math.random());


module.exports = { userData, thoughtData, randomIndex };