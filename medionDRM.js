var createDRMAgent = require("./createDRMAgent");
var DeviceTypes = require("./deviceTypes.js");

module.exports = function MEDION_DRM(element, parentElement) {
    var agent = createDRMAgent(DeviceTypes.MEDION, element, parentElement);

    this.setLAURL = function (url, customData, onSuccess, onError) {
        try {
            agent.setLAUrl(url, url.length);
            if (customData) {
                var strCustomData = JSON.stringify(customData);
                agent.setCustomData(strCustomData, strCustomData.length);
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