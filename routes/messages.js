const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn } = require('../middleware');
const MessageController = require('../controllers/messages');

// Inbox
router.get('/', isLoggedIn, wrapAsync(MessageController.showInbox));

// Start a new conversation (POST from "Message Host" button)
router.post('/start', isLoggedIn, wrapAsync(MessageController.startConversation));

// View a specific conversation
router.get('/:conversationId', isLoggedIn, wrapAsync(MessageController.showConversation));

// Reply in a conversation
router.post('/:conversationId/reply', isLoggedIn, wrapAsync(MessageController.replyToConversation));

module.exports = router;
