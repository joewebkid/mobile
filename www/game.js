
var Menu = 
{ 
    preload: function () 
    { 
    }, 
    create: function () 
    {         
        Menu.physics.startSystem(Phaser.Physics.ARCADE);
        Menu.stage.backgroundColor = '#c7996c';

        button = this.add.button(window.innerWidth/2, window.innerHeight/2, 'start', this.startGame, this); 
        button.anchor.setTo(0.5, 0.5);

        buttonText = game.add.text(game.world.width / 2, game.world.height / 2, "Game", style);
        buttonText.anchor.setTo(0.5, 0.5);
    }, 
    startGame: function () 
    { 
        this.state.start('Game'); 
    } 
};

var tween = null;
cardsArr=[];

var Game = { 
    preload: function ()
    {
    }, 
    create: function () 
    { 
        total = 10
        cards = Game.add.group();
        cards.inputEnableChildren = true;

        for (var i = 3; i > 0; i--) {
            cardsArr[i] = cards.create(100*i, 100, 'b'+i);
            cardsArr[i].input.enableDrag(false, true);

            cardsArr[i].events.onDragStart.add(this.onDragStart, this);
            cardsArr[i].events.onDragStop.add(this.onDragStop, this)
            cardsArr[i].scale.set(1.9);
        }

        timer = game.time.create(false);
        timer.loop(1000, this.updateCounter, this);
        // timer.add(10000, this.inMenu, this);
        timer.start();

        // this.add.button(0, 0, 'back', this.inMenu, this);
        t = game.add.text(window.innerWidth-20, 0, 30, styleG)
        t.anchor.setTo(1, 0); 
    }, 
    update: function () 
    { 
    },
    updateCounter: function () {
        if(total!=0)
            total--;
        else
            total=10
    },
    render: function () 
    { 
        var text = timer.duration.toFixed(0);
        t.text=total
    }, 
    onDragStart: function(obj) {

        if ((tween !== null && tween.isRunning) || obj.scale.x === 1)
        {
            return;
        }
        tween = Game.add.tween(obj.scale).to( { x: 3, y: 3 }, 10, Phaser.Easing.Elastic.Out, true);
    },
    nextTurn: function (obj) {
        this.state.start('Game'); 
    },
    onDragStop: function (obj) {
        if (tween && tween.isRunning || obj.scale.x === 2)
        {
            return;
        }
        tween = Game.add.tween(obj.scale).to( { x: 2, y: 2 }, 10, Phaser.Easing.Elastic.In, true);
    }
};

game.state.add('LoadUser', LoadUser, false);
game.state.add('LoadCards', LoadCards, false);
game.state.add('Preloader', Preloader, false);
game.state.add('Boot', Boot, false);
game.state.add('Menu', Menu); 

game.state.add('Game', Game); 
game.state.start('Boot');
