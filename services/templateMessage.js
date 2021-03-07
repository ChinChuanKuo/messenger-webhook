let sendCategoriesTemplate = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Welcome 1!",
                        "image_url": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/E05/008/87/E050088731.jpg&v=60360eb7&w=180&h=180",
                        "subtitle": "We have the right hat for everyone.",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://petersfancybrownhats.com/view?item=103",
                            "webview_height_ratio": "tall"
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersfancybrownhats.com",
                                "title": "View Website"
                            }, {
                                "type": "postback",
                                "title": "Start Chatting",
                                "payload": "DEVELOPER_DEFINED_PAYLOAD"
                            }
                        ]
                    },
                    {
                        "title": "Welcome 2!",
                        "image_url": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/E05/008/85/E050088574.jpg&v=60346c83&w=180&h=180",
                        "subtitle": "We have the right hat for everyone.",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://petersfancybrownhats.com/view?item=103",
                            "webview_height_ratio": "tall"
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersfancybrownhats.com",
                                "title": "View Website"
                            }, {
                                "type": "postback",
                                "title": "Start Chatting",
                                "payload": "DEVELOPER_DEFINED_PAYLOAD"
                            }
                        ]
                    },
                    {
                        "title": "Welcome 3!",
                        "image_url": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/E05/008/85/E050088562.jpg&v=6034695d&w=180&h=180",
                        "subtitle": "We have the right hat for everyone.",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://petersfancybrownhats.com/view?item=103",
                            "webview_height_ratio": "tall"
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersfancybrownhats.com",
                                "title": "View Website"
                            }, {
                                "type": "postback",
                                "title": "Start Chatting",
                                "payload": "DEVELOPER_DEFINED_PAYLOAD"
                            }
                        ]
                    }
                ]
            }
        }
    }
};

let sendLookupOrderTemplate = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "OK. Let's set info about your order, so I won't need to ask for them in the future.",
                "buttons": [
                    {
                        "type": "web_url",
                        "url": `https://petersfancybrownhats.com/view?item=103`,
                        "title": "Set info",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true //false: open the webview in new tab
                    },
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};

module.exports = {
    sendCategoriesTemplate: sendCategoriesTemplate,
    sendLookupOrderTemplate: sendLookupOrderTemplate,
};