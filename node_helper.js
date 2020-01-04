var request = require('request');
var NodeHelper = require("node_helper");
var cheerio = require("cheerio");

module.exports = NodeHelper.create({

    start: function () {
        console.log("Starting node helper: " + this.name);
    },

    socketNotificationReceived: function (notification, payload) {
        var self = this;
        console.log("Explosm -> Notification: " + notification + " Payload: " + payload);

        if (notification === "GET_COMIC_EXPLOSM") {

            var url = "http://explosm.net/";

            console.log('-> Explosm request');
            request(url, function (error, response, body) {
                var $ = cheerio.load(body);
                var src = $("#main-comic").attr('src');
                console.log('Dibert -> ' + src);
                self.sendSocketNotification("COMIC_EXPLOSM", {
                    img: src
                });
            });
            return;
        }
    },
});