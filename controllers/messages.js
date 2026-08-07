const Conversation = require('../models/conversation');
const Listing = require('../models/listing');
const User = require('../models/user');

// GET /messages - Show inbox (all conversations for current user)
module.exports.showInbox = async (req, res) => {
    const conversations = await Conversation.find({
        participants: req.user._id
    })
        .populate('participants', 'username avatarUrl')
        .populate('listing', 'title image')
        .sort({ lastMessage: -1 });

    // Count total unread messages across all conversations
    let unreadCount = 0;
    conversations.forEach(conv => {
        conv.messages.forEach(msg => {
            if (!msg.isRead && msg.sender.toString() !== req.user._id.toString()) {
                unreadCount++;
            }
        });
    });

    res.render('messages/inbox', {
        conversations,
        unreadCount,
        title: 'Wanderlust | Inbox'
    });
};

// GET /messages/:conversationId - View a specific conversation
module.exports.showConversation = async (req, res) => {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId)
        .populate('participants', 'username avatarUrl')
        .populate('listing', 'title image price');

    if (!conversation) {
        req.flash('error', 'Conversation not found!');
        return res.redirect('/messages');
    }

    // Check that the current user is a participant
    const isParticipant = conversation.participants.some(p => p._id.equals(req.user._id));
    if (!isParticipant) {
        req.flash('error', 'You do not have access to this conversation!');
        return res.redirect('/messages');
    }

    // Mark messages from others as read
    let updated = false;
    conversation.messages.forEach(msg => {
        if (!msg.isRead && msg.sender.toString() !== req.user._id.toString()) {
            msg.isRead = true;
            updated = true;
        }
    });
    if (updated) await conversation.save();

    const otherUser = conversation.participants.find(p => !p._id.equals(req.user._id));

    res.render('messages/conversation', {
        conversation,
        otherUser,
        title: `Wanderlust | Chat with ${otherUser ? otherUser.username : 'Host'}`
    });
};

// POST /messages/start - Start a new conversation (from "Message Host" button)
module.exports.startConversation = async (req, res) => {
    const { hostId, listingId, body } = req.body;
    const senderId = req.user._id;

    if (hostId === senderId.toString()) {
        req.flash('error', "You can't message yourself!");
        return res.redirect(`/listings/${listingId}`);
    }

    // Check if a conversation already exists between these two users for this listing
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, hostId] },
        listing: listingId
    });

    if (!conversation) {
        conversation = new Conversation({
            participants: [senderId, hostId],
            listing: listingId,
            messages: []
        });
    }

    conversation.messages.push({
        sender: senderId,
        content: body,
        isRead: false
    });
    conversation.lastMessage = Date.now();
    await conversation.save();

    req.flash('success', 'Message sent to host!');
    res.redirect(`/messages/${conversation._id}`);
};

// POST /messages/:conversationId/reply - Reply in an existing conversation
module.exports.replyToConversation = async (req, res) => {
    const { conversationId } = req.params;
    const { body } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        req.flash('error', 'Conversation not found!');
        return res.redirect('/messages');
    }

    const isParticipant = conversation.participants.some(p => p.toString() === req.user._id.toString());
    if (!isParticipant) {
        req.flash('error', 'Access denied!');
        return res.redirect('/messages');
    }

    conversation.messages.push({
        sender: req.user._id,
        content: body,
        isRead: false
    });
    conversation.lastMessage = Date.now();
    await conversation.save();

    res.redirect(`/messages/${conversationId}`);
};
