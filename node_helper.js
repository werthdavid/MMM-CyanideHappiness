var request = require("request");
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
            if (payload.mode === "random") {
                var url = "http://explosm.net/rcg";
                console.log("-> Explosm request: " + url);
                request(url, function (error, response, body) {
                    var $ = cheerio.load(body);
                    var imgs = [];
                    $(".rcg-panels > img").each(function (index) {
                        imgs[imgs.length] = $(this).attr("src");
                    });

                    console.log("Comic -> " + imgs);
                    self.sendSocketNotification("COMIC_EXPLOSM", {
                        imgs
                    });
                });
            } else {
                var url = "http://explosm.net/";
                console.log("-> Explosm request: " + url);
                request(url, function (error, response, body) {
                    var $ = cheerio.load(body);
                    var src = $("#main-comic").attr("src");
                    console.log(src)
                    if (src === undefined) {
                        console.log("Today there is no comic")
                        url = "http://explosm.net" + $("a.preview-thumbnail").attr("href");
                        console.log("-> Explosm request 2: " + url);
                        request(url, function (error, response, body) {
                            $ = cheerio.load(body);
                            src = $("#main-comic").attr("src");
                            if (src === undefined) {
                                console.log("Could not find a comic")
                            } else {
                                console.log("Comic -> " + src);
                                self.sendSocketNotification("COMIC_EXPLOSM", {
                                    imgs: [src]
                                });
                            }

                        });
                    } else {
                        console.log("Comic -> " + src);
                        self.sendSocketNotification("COMIC_EXPLOSM", {
                            imgs: [src]
                        });
                    }

                });
            }
        }
    },
});