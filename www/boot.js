var game = new Phaser.Game(
    window.innerWidth,
    window.innerHeight,
    Phaser.AUTO,
    ''
    // {
    //     preload: preload,
    //     create: create,
    //     update: update
    // }
);
var style = { font: '100px "Shark"', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 10, align: 'center' };
var styleG = { font: '100px "Shark"', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 10, align: 'right' };

// start boot loader
var LoadUser = { 
    preload: function ()
    {
        debuger.point('loadUser');
        var user = MoSql.getOrSet('user',game.cache.getJSON('newUser'))
        debuger.info(base) 
        debuger.pointEnd('loadUser');
    },
    create: function () 
    {
        var tween = game.add.tween(LoadingUser).to({
            alpha: 0
        }, 700, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(function() {
            game.state.start('Menu', false, false);
        }, this);
    }

};

var LoadCards = { 
    preload: function ()
    {
        debuger.point('loadCards');
        var data = game.cache.getJSON('data');
        for (key in data) {
            n='b'+key
            game.load.image(n, data[key]['img']);
            debuger.info(data[key]['data']['name']) 
        }
        debuger.pointEnd('loadCards');
    },
    create: function () 
    {
        var tween = game.add.tween(LoadingTextCards).to({
            alpha: 0
        }, 700, Phaser.Easing.Linear.None, true);


        tween.onComplete.add(function() {
            LoadingUser = game.add.text(game.world.width / 2, game.world.height / 2, "Loading user info", style);
            game.state.start('LoadUser', false, false);
            LoadingUser.anchor.setTo(0.5, 0.5);
        }, this);
    }

};

var Preloader = { 
    preload: function ()
    {
        debuger.point('loadAssets');
        game.load.image('start', './assets/menu/butt.png'); 
        game.load.json('data', 'assets/game/cards/data.json');
        game.load.json('newUser', 'assets/game/cards/newUser.json');
        debuger.pointEnd('loadAssets');
    },
    create: function () 
    { 
        var tween = game.add.tween(LoadingText).to({
            alpha: 0
        }, 700, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(function() {

            LoadingTextCards = game.add.text(game.world.width / 2, game.world.height / 2, "Loading cards", style);
            game.state.start('LoadCards', false, false);
            LoadingTextCards.anchor.setTo(0.5, 0.5);
        }, this);
    }
};

var Boot = { 
    create: function () 
    { 
        LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "...", style);
        LoadingText.anchor.setTo(0.5, 0.5);
        game.state.start('Preloader', false, false);
    }
};
// end boot loader
