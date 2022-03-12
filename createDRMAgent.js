var DeviceTypes = require("./deviceTypes");

module.exports = function createDRMAgent(deviceType, element, parentNode){
    var DRMAgent = createDRMAgentObject(deviceType, element);
    if (parentNode){
        parentNode.appendChild(this.DRMAgent);
    } else {
        document.body.appendChild(this.DRMAgent);
    }

    return DRMAgent;
}

function createDRMAgentObject(deviceType, element){
    if (deviceType == DeviceTypes.SRAF){
        return element;
    } else if (deviceType == DeviceTypes.HBBTV){
        return createObjectIfNotExists('application/oipfDrmAgent', "HBBTV-DRM-AGENT")
    } else if (deviceType == DeviceTypes.MEDION) {
        return createObjectIfNotExists('application/drmdataobject', "MEDION-DRM-DATA-OBJECT")
    }
}

function createObjectIfNotExists(objectType, objectId){
    var objElement = document.getElementById(objectId);
    if (!objElement){
        objElement = document.createElement('object');
        objElement.setAttribute("type", objectType);
    }

    return objElement;
}