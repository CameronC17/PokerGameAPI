function Player(username, wallet, hand, handValue){
  this.username = username;
  this.wallet = wallet;
  // this.stake = 0
  this.hand = [];
  this.handValue = null;
}



Player.prototype.addCard = function(card){
  this.hand.push(card);
}

Player.prototype.getHand = function(){
  return this.hand;
}

Player.prototype.setHandValue = function(handValue){
  this.handValue = handValue;
}

module.exports = Player;
