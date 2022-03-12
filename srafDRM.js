var createDRMAgent = require("./createDRMAgent");
var DeviceTypes = require("./deviceTypes.js");

module.exports = function SRAF_DRM(element, parentElement) {
    var agent = createDRMAgent(DeviceTypes.SRAF, element, parentElement);
    this.setLAURL = function (url, customData, onSuccess, onError) {
        try {
            agent.setLAURL(url);
            if (customData) {
                agent.setCustomData(JSON.stringify(customData));
            }
            if (onSuccess) {
                onSuccess();
            }
        } catch (e) {
            console.log(e);
            if (onError) {
                onError();
            }
        }
    }
};