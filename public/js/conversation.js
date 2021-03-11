function getConversation() {
    $.get(`https://graph.facebook.com/${pageId}?fields=conversations{id}`, function (response) {
        console.log(response);
    });
}

$(document).ready(function () {
    getConversation();
});