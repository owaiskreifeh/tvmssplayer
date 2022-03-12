
var PlayerModes = require("./playerModes.js");
var DeviceTypes = require("./deviceTypes.js");
var MediaTypes = require("./mediaTypes.js");

module.exports = function createBaseElement(mode, deviceType, mediaType) {
    var element, source;
    // HTML5 Mode
    if (mode === PlayerModes.HTML5) {
        element = document.createElement("video");
        if (deviceType === DeviceTypes.HBBTV) {
            if (mediaType == MediaTypes.MSS){
                source = document.createElement("source");
                source.setAttribute("type", "application/vnd.ms-sstr+xml");
            } else {
                source = document.createElement("source");
                source.setAttribute("type", "application/vnd.apple.mpegurl");
            }
        } else if (deviceType === DeviceTypes.SRAF) {
            element.setAttribute("type", "application/vnd.ms-sstr+xml");
        } else if (deviceType === DeviceTypes.MEDION) {
            element.setAttribute("type", "application/vnd.ms-sstr+xml");
        } else {
            element.setAttribute("type", "video/mp4");
        }

    } else { // AV (CE-HTML Object) Mode
        element = document.createElement("object");
        if (deviceType == DeviceTypes.SRAF){
            element.setAttribute("type", "application/vnd.ms-sstr+xml");
        } else if (deviceType == DeviceTypes.MEDION){
            element.setAttribute("type", "video/mp4");
        } else {
            element.setAttribute("type", "application/vnd.ms-sstr+xml");
        }
    }


    return {
        element: element,
        source: source,
    }
}