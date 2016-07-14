cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-armsoft-statusbar/www/statusbar.js",
        "id": "cordova-plugin-armsoft-statusbar.statusbar",
        "pluginId": "cordova-plugin-armsoft-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-armsoft-statusbar/src/browser/statusbar.js",
        "id": "cordova-plugin-armsoft-statusbar.statusbar",
        "pluginId": "cordova-plugin-armsoft-statusbar",
        "merges": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-armsoft-statusbar": "1.1.0",
    "cordova-plugin-splashscreen": "3.2.2"
}
// BOTTOM OF METADATA
});