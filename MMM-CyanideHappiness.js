Module.register("MMM-CyanideHappiness", {

    // Default module config.
    defaults: {
        updateInterval: 10000 * 60 * 60, // 10 hours
    },

    start: function () {
        Log.info(this.config);
        Log.info("Starting module: " + this.name);

        this.dailyComic = "";
        this.sendSocketNotification("GET_COMIC_EXPLOSM", this.config);

        if (this.config.updateInterval < 60000) {
            this.config.updateInterval = 60000;
        }

        setInterval( () => {
            this.sendSocketNotification("GET_COMIC_EXPLOSM", this.config);
        }, this.config.updateInterval);
    },

    // Define required scripts.
    getScripts: function () {
        return [];
    },

    getStyles: function () {
        return ["explosm.css"];
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "COMIC_EXPLOSM") {
            Log.info('Explosm url return: ' + payload.img);
            this.dailyComic = payload.img;
            this.updateDom(1000);
        }
    },

    notificationReceived: function (notification, payload, sender) {
    },

    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement("div");

        var comicWrapper = document.createElement("div");
        comicWrapper.className = "explosm-container";

        var img = document.createElement("img");
        img.id = "explosm-content";
        img.src = this.dailyComic;
        if (this.config.color) {
            img.classList.add('explosm-image');
        }else {
            img.classList.add('explosm-image-bw');
        }
        comicWrapper.appendChild(img);
        wrapper.appendChild(comicWrapper);
        return wrapper;
    }
});