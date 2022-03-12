var createDRMAgent = require("./createDRMAgent");
var DeviceTypes = require("./deviceTypes.js");

module.exports = function OIPF_DRM(element, parentElement) {
    var agent = createDRMAgent(DeviceTypes.MEDION, element, parentElement);
    var DRMSysID = "urn:dvb:casystemid:19219";
    var msgType = "application/vnd.ms-playready.initiator+xml";

    this.setLAURL = function (url, customData, onSuccess, onError) {

        agent.onDRMMessageResult = function (msgID, resultMsg, resultCode) {
            if (resultCode == 0) {
                if (onSuccess) {
                    onSuccess({ msgID, resultMsg, resultCode });
                }
            } else {
                if (onError) {
                    onError({ msgID, resultMsg, resultCode });
                }
            }
        }

        var LAMsg = '<%?xml version="1.0" encoding="utf-8"?>' +
            '<PlayReadyInitiator xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols/">' +
            '<LicenseServerUriOverride>' +
            '<LA_URL>' + url + '</LA_URL>' +
            '</LicenseServerUriOverride>' +
            '</PlayReadyInitiator>';

        agent.sendDRMMessage(msgType, LAMsg, DRMSysID);

        if (customData) {
            var strCustomData = JSON.stringify(customData);
            var CustomDataMsg = '<%?xml version="1.0" encoding="utf-8"?>' +
                '<PlayReadyInitiator xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols/">' +
                '<SetCustomData>' +
                '<CustomData>' + strCustomData + '</CustomData>' +
                '</SetCustomData>' +
                '</PlayReadyInitiator>';
            agent.sendDRMMessage(msgType, CustomDataMsg, DRMSysID);

        }
    }
};
