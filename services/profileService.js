require('dotenv').config();
import request from 'request';

let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let handleSetupProfileAPI = () => {
    return new Promise((resolve, reject) => {
        try {
            let url = `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${VERIFY_TOKEN}`;
            let request_body = {
                "get_started": {
                    "payload": "GET_STARTED"
                },
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "postback",
                                "title": "Talk to an agent",
                                "payload": "TALK_AGENT"
                            },
                            {
                                "type": "postback",
                                "title": "Restart this conversation",
                                "payload": "RESTART_CONVERSATION"
                            },
                            {
                                "type": "nested",
                                "title": "More info",
                                "call_to_actions": 
                                [
                                    {
                                        "type": "web_url",
                                        "title": "View Facebook Fan Page",
                                        "url": "https://www.facebook.com/%E5%AF%A7%E5%A4%8F%E5%A4%9C%E5%B8%82-%E5%86%B0%E5%93%A8%E9%85%AA%E6%A2%A8%E7%89%9B%E5%A5%B6-100576312087765/",
                                        "webview_height_ratio": "full"
                                    },
                                    {
                                        "type": "web_url",
                                        "title": "View youtube channel",
                                        "url": "https://www.youtube.com/",
                                        "webview_height_ratio": "full"
                                    },
                                ]
                            }
                        ]
                    }
                ],
                "whitelisted_domains": [
                    "https://messenger-webhook-bot.herokuapp.com/profile",
                ]
            };
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve("Done!")
                } else {
                    console.error("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let handleFacebookProfileAPI = sender_psid => {
    return new Promise((resolve, reject) => {
        try {
            let url = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${VERIFY_TOKEN}`;
            request({
                "uri": url,
                "method": "GET",
            }, (err, res, body) => {
                if (!err) {
                    body = JSON.parse(body);
                    let username = `${body.last_name} ${body.first_name}`;
                    resolve(username);
                } else {
                    console.error("Unable to send message:" + err);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};

let handleTypingOnAPI = sender_psid => {
    return new Promise((resolve, reject) => {
        try {
            let url = `https://graph.facebook.com/v2.6/me/messages?access_token=${VERIFY_TOKEN}`;
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "typing_on"
            };
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve("Done!")
                } else {
                    console.error("Unable to send message:" + err);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};

let handleMessageReadAPI = sender_psid => {
    return new Promise((resolve, reject) => {
        try {
            let url = `https://graph.facebook.com/v2.6/me/messages?access_token=${VERIFY_TOKEN}`;
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "mark_seen"
            };
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve("Done!")
                } else {
                    console.error("Unable to send message:" + err);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleSetupProfileAPI: handleSetupProfileAPI,
    handleFacebookProfileAPI: handleFacebookProfileAPI,
    handleTypingOnAPI: handleTypingOnAPI,
    handleMessageReadAPI: handleMessageReadAPI,
};