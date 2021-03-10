import message from '../services/messageService';
import chatbot from '../services/chatbotService';

let handleGetMessage = (req, res) => {
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    message.handleTokenAPI(mode, token, challenge, res);
}

let handlePostMessage = async (req, res) => {
    let body = req.body;
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        // Returns a '200 OK' response to all requests
        body.entry.forEach(function (entry) {
            if (entry.standby) {
                //if user's message is "back" or "exit", return the conversation to the bot
                let webhook_standby = entry.standby[0];
                if (webhook_standby && webhook_standby.message) {
                    if (webhook_standby.message.text === "back" || webhook_standby.message.text === "exit") {
                        // call function to return the conversation to the primary app
                        // chatbotService.passThreadControl(webhook_standby.sender.id, "primary");
                        chatbot.takeControlConversationAPI(webhook_standby.sender.id);
                    }
                }
                return;
            }

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            //console.log(webhook_event);

            let sender_psid = webhook_event.sender.id;
            console.log(`Sender PSID: ${sender_psid}`);

            if (webhook_event.message) {
                message.handleMessageAPI(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                message.handlePostbackAPI(sender_psid, webhook_event.postback);
            }
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

module.exports = {
    handleGetMessage: handleGetMessage,
    handlePostMessage: handlePostMessage,
};