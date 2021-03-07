require('dotenv').config();
import chatbot from './chatbotService';

let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let handleTokenAPI = (mode, token, challenge, res) => {
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}

let handleMessageAPI = async (sender_psid, received_message) => {
    if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {
        let payload = received_message.quick_reply.payload;
        if (payload === "CATEGORIES") {
            await chatbot.sendCategoriesAPI(sender_psid);
        } else if (payload === "LOOKUP_ORDER") {
            await chatbot.sendLookupOrderAPI(sender_psid);
        } else if (payload === "TALK_AGENT") {
            await chatbot.requestTalkToAgentAPI(sender_psid);
        }
        return;
    }

    /*let response;
    // Check if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }
    // Sends the response message
    await chatbot.sendMessageAPI(sender_psid, response);*/
}

// Handles messaging_postbacks events
let handlePostbackAPI = async (sender_psid, received_postback) => {
    let payload = received_postback.payload;
    // Set the response based on the postback payload
    switch (payload) {
        case "GET_STARTED":
        case "RESTART_CONVERSATION":
            await chatbot.sendMessageNewUserAPI(sender_psid);
            break;
        case "TALK_AGENT":
            await chatbot.requestTalkToAgentAPI(sender_psid);
            break;
        default:
            console.log("run default switch case");
            break;
    }
};

module.exports = {
    handleTokenAPI: handleTokenAPI,
    handleMessageAPI: handleMessageAPI,
    handlePostbackAPI: handlePostbackAPI
};