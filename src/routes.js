const handlers = require('./handlers');

module.exports = [
    {
        path: '/user/:username/send-message',
        method: 'post',
        handler: handlers.handleSendMessage
    },
    {
        path: '/user/:username',
        method: 'post',
        handler: handlers.handleCreateUser
    }
];