# MMM-CyanideHappiness
A module for MagicMirror<sup>2</sup> that displays the daily Cyanide&Happiness Comic.

<img src="cyanidehappiness.png"></img>

## Installing

### Step 1 - Install the module
```javascript
cd ~/MagicMirror/modules
git clone https://github.com/werthdavid/MMM-CyanideHappiness.git
cd MMM-CyanideHappiness
npm install
```

### Step 2 - Add module to `~MagicMirror/config/config.js`
Add this configuration into `config.js` file's
```javascript
{
    module: "MMM-CyanideHappiness",
    position: "bottom_bar",
    config: {
      updateInterval : 36000000,
      color: true
    }
}
```
## Updating
Go to the module’s folder inside MagicMirror modules folder and pull the latest version from GitHub and install:
```
git pull
npm install
```
## Configuring
Here is the configurable part of the module

| Option               | Description
|--------------------- |-----------
| `updateInterval`     | Set to desired update interval (in ms), default is 3600000 (10 hours).
| `color`              | display the image in color of black/white (defaults to black/white)


Heavily inspired by the awesome MagicMirror plugin [MMM-DailyDilbert](https://github.com/andrecarlucci/MMM-DailyDilbert).
