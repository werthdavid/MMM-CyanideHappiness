Module.register("MMM-CyanideHappiness", {

    // Default module config.
    defaults: {
        updateInterval: 10000 * 60 * 60, // 10 hours
    },

    start: function () {
        Log.info(this.config);
        Log.info("Starting module: " + this.name);

        this.dailyComics = [];
        this.sendSocketNotification("GET_COMIC_EXPLOSM", this.config);

        if (this.config.updateInterval < 60000) {
            this.config.updateInterval = 60000;
        }

        setInterval(() => {
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
            Log.info("Explosm url return: " + payload.img);
            this.dailyComics = payload.imgs;
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

        for (let i = 0; i < this.dailyComics.length; i++) {
            var imgContainer = document.createElement("div");
            imgContainer.className = "explosm-img-container";
            var img = document.createElement("img");
            img.src = this.dailyComics[i];
            if (!this.config.color) {
                img.classList.add("explosm-image-bw");
            }
            imgContainer.appendChild(img);
            comicWrapper.appendChild(imgContainer);
        }

        wrapper.appendChild(comicWrapper);
        return wrapper;
    }
});