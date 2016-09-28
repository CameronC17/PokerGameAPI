var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();
var expect = chai.expect;

var Game = require('../game/game.js');
var Deck = require('../game/deck.js');
var Player = require('../game/player.js');

describe('Deck', function() {
    it('should return a full deck of 52 cards', function(done) {
        var deck = new Deck();

        deck.deck = deck.createDeck();

        expect(deck.deck).to.have.length(52);

        done();
    });

    it('should shuffle the deck', function(done) {
        var deck = new Deck();

        expect(deck.deck).to.have.length(52);

        done();
    });

    it('should produce all of the cards in order', function(done) {
        var deck = new Deck();

        deck.deck = deck.createDeck();

        var val = 2;
        //spades check
        for (var i = 0; i < 13; i++) {
        	expect(deck.deck[i].suit).to.equal("spade");
        	expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //clubs check
        for (var i = 13; i < 26; i++) {
            expect(deck.deck[i].suit).to.equal("club");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //hearts check
        for (var i = 26; i < 39; i++) {
            expect(deck.deck[i].suit).to.equal("heart");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //diamonds check
        for (var i = 39; i < 52; i++) {
            expect(deck.deck[i].suit).to.equal("diamond");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }


        done();
    });

    it('should ensure that the deck is shuffled. this test will not always pass!!!!! dont worry', function(done) {
        var deck = new Deck();
        deck.deck = deck.createDeck();

        var shuffleDeck = new Deck();

        var passed = true;

        for (var i = 0; i < 52; i++) {
            if (deck.deck[i].suit == shuffleDeck.deck[i].suit)
                passed = !passed;
            if (deck.deck[i].value == shuffleDeck.deck[i].value)
                passed = !passed;
        }

        expect(passed).to.equal(true);

        done();
    });
});

describe('Game', function() {
    it('should initially deal two cards to each player', function(done) {

        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var game = new Game(players);

        console.log(players)
        game.dealPlayerCards();

        expect(players[0].getHand()).to.have.length(2);
        expect(players[1].getHand()).to.have.length(2);
        expect(players[2].getHand()).to.have.length(2);
        expect(players[3].getHand()).to.have.length(2);
        expect(players[4].getHand()).to.have.length(2);
        done();
    });

    it('should place a bet', function(done) {
        var game = new Game(new Deck());

        done();
    });

    it('should deal the flop', function(done) {
        var game = new Game(new Deck());

        game.dealTableCards(3);

        var table = game.getTableCards();
        console.log(table);

        expect(table).to.have.length(3);
        done();
    });

    it('should check for a straight flush', function(done) {
        var game = new Game();

        // Player Hand
        var playerHand = [
            { suit: 'club', value: 14 },
            { suit: 'spade', value: 1 }
            ];
        
        // Straight flush using table cards
        game.tableCards = [
            { suit: 'heart', value: 3 },
            { suit: 'heart', value: 4 },
            { suit: 'heart', value: 5 },
            { suit: 'heart', value: 6 },
            { suit: 'heart', value: 7 }
        ];

        var straightCheck = game.checkStraightFlush(playerHand);

        expect(straightCheck).to.have.length(4);

        console.log(straightCheck);
        done();
    });

    it('should check for a four-of-a-kind', function(done) {
        var game = new Game();

        var playerHand = [
            { suit: 'club', value: 10 },
            { suit: 'spade', value: 10 }
            ];
        
        // Four-of-a-kind using two hand cards and two table cards
        game.tableCards = [
            { suit: 'heart', value: 10 },
            { suit: 'diamond', value: 10 },
            { suit: 'club', value: 2 },
            { suit: 'spade', value: 8 },
            { suit: 'heart', value: 3 }
        ];

        // returns true because we have four of a kind
        var fourOfAKindCheck = game.checkFour(playerHand);

        //pass condition
        expect(fourOfAKindCheck).to.equal(true);
        done();
    });

    it('should check for a flush', function(done) {
        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var game = new Game(players);


        var playerHand = [
            { suit: 'spade', value: 5 },
            { suit: 'spade', value: 3 }
        ];

        game.tableCards = [
            { suit: 'spade', value: 7 },
            { suit: 'spade', value: 9 },
            { suit: 'spade', value: 10 },
            { suit: 'heart', value: 8 },
            { suit: 'heart', value: 3 }
        ];

        var suits = game.checkFlush(playerHand);

        expect(suits).to.have.length(5);
        expect(suits[0].suit).to.equal("spade");
        done()
    });
});

