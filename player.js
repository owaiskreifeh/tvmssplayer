function Player(container){
    this.container = container;
}

Player.prototype.init = function(){
    this.container.innerHTML = '<div class="player-wrapper"><div class="player-content"></div></div>';

}


module.exports = Player;