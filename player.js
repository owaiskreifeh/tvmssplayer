var PlayerModes = require('./playerModes');
var DeviceTypes = require('./deviceTypes');
var MediaTypes = require('./mediaTypes');

var createBaseElement = require('./createBaseElement');
var oipfDRMAgent = require("./oipfDRM");
var srafDRMAgent = require("./srafDRM");
var medionDRMAgent = require("./medionDRM");


function Player(container, options){
    this._container = container;
    this._options = Object.assign({
        mode: PlayerModes.HTML5,
        deviceType: DeviceTypes.HBBTV,
        documentRoot: document.body,
    }, options);
    this._mediaElement = createBaseElement(this._options.mode, this._options.deviceType, MediaTypes.MSS);
    this._container.appendChild(this._mediaElement.element);

    this.setSource.bind(this);
    this.setProtectionData.bind(this);
}


Player.prototype.setSource = function(url){
    if (this._mediaElement.mode == PlayerModes.AV){
        this._mediaElement.setAttribute("data", url);
    } else {
        if (this._mediaElement.source){
            this._mediaElement.source.setAttribute("src", url);
        } else {
            this._mediaElement.element.setAttribute("src", url);
        }
    }
}


Player.prototype.setProtectionData = function(laUrl, customData, onSuccess, onError){
    var Agent = null;
    if (this._options.deviceType === DeviceTypes.HBBTV){
        Agent = oipfDRMAgent;
    } else if (this._options.deviceType === DeviceTypes.SRAF){
        Agent = srafDRMAgent;
    } else if (this._options.deviceType === DeviceTypes.MEDION){
        Agent = medionDRMAgent;
    }

    var agent = new Agent(this._mediaElement.element, this._container);
    if (agent){
        agent.setLAURL(laUrl, customData, onSuccess, onError);
    }
}

module.exports = Player;

var player = new Player(null)