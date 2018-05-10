module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Thanks for helping! Can you get an image about this story?',
    createdAt: new Date(Date.UTC(2018, 4, 9, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "You are the first to report a story",
    createdAt: new Date(Date.UTC(2018, 4, 9, 17, 20, 0)),
    system: true,
  },
];
