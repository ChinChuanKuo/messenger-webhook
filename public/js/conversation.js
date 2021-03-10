FB.api(
    `/${facebookAppId}/conversations`,
    function (response) {
        if (response && !response.error) {
            /* handle the result */
            console.log(response);
        }
    }
);