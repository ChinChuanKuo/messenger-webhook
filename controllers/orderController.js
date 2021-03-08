import template from '../services/templateMessage';
import chatbot from '../services/chatbotService';

let handleSetInfoOrder = async (req, res) => {
    try {
        console.log(req.body.psid);
        let customerName = "";
        if (req.body.customerName === "") {
            customerName = "Empty";
        } else customerName = req.body.customerName;

        // I demo response with sample text
        // you can check database for customer order's status

        let response1 = {
            "text": `---Info about your lookup order---
            \nCustomer name: ${customerName}
            \nEmail address: ${req.body.email}
            \nOrder number: ${req.body.orderNumber}
            `
        };

        let response2 = template.setInfoOrderTemplate();

        await chatbot.sendMessageAPI(req.body.psid, response1);
        await chatbot.sendMessageAPI(req.body.psid, response2);

        return res.status(200).json({
            message: "ok"
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    handleSetInfoOrder: handleSetInfoOrder
};