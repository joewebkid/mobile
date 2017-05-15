var game = new Phaser.Game(
    window.innerWidth ,
    window.innerHeight,
    Phaser.AUTO,//Phaser.CANVAS
    ''
    // {
    //     preload: preload,
    //     create: create,
    //     update: update
    // }
);

var style = { font: '45px "Shark"', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 0, align: 'center' };
var styleG = { font: '50px "Shark"', fill: '#FFFFFF', stroke: '#0a73a2', strokeThickness: 1, align: 'right' };
var styleGold = { font: '50px "Shark"', fill: '#FFFFFF', stroke: '#cd7c3f', strokeThickness: 1, align: 'right' };
var styleBig = { font: '50px "Droid Sans"', fill: '#FFFFFF', stroke: '#33251a', strokeThickness: 10, align: 'center' };
var scaleRatio = window.devicePixelRatio / 1;
// start boot loader
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

    var loader_inWidth = game.cache.getImage('loader_in').width;
    
    var loader_full = game.add.sprite((game.width/2) - (loader_inWidth/2),game.height/2,"loader_full");
    
    //this.load.setPreloadSprite(loader_in,0);
    this.load.setPreloadSprite(loader_full,0);
    
    //loader_in.anchor.setTo(0.5,0.5);
    loader_full.anchor.setTo(0,0.5);
    
    var txt = LoadingText.setText(progress + "%  ");
    game.world.bringToTop(txt)
    
    
    
    // LoadingText.setText(cacheKey+" Complete: " + progress + "%  ");
    // LoadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
}

var GameData = { 
    preload: function ()
    {
        debuger.point('loadCards');
            card_data = game.cache.getJSON('data');
            for (key in card_data) {
                n=key
                game.load.image(n, card_data[key]['img']);
                debuger.info(card_data[key]['data']['name']) 
            }
        debuger.pointEnd('loadCards');


        debuger.point('loadUser');
            user = MoSql.getOrSet('user',game.cache.getJSON('newUser'))
            // user = MoSql.set('user',game.cache.getJSON('newUser'))
            // user = MoSql.get('user')
            // debuger.info(base) 
        debuger.pointEnd('loadUser');

        settings = MoSql.getOrSet('settings',{
            'volume':1,
            'vibration':false
        })
    },
    create: function () 
    {
        game.load.onFileComplete.add(fileComplete, this);
        game.state.start('Menu', false, false);
    }

};

var Preloader = { 
    preload: function ()
    {
        debuger.point('loadAssets');
        
            game.load.spritesheet('start', './assets/menu/butt3.png', 320, 172);   
            game.load.spritesheet('butt_in', './assets/menu/butt_in.png', 162, 73);   
            game.load.image('time', './assets/menu/time.png');
            game.load.image('menu', './assets/menu/menu.png');
            game.load.image('gold', './assets/menu/gold.png');
            game.load.image('switch', './assets/menu/switch.png');
            game.load.image('slider', './assets/menu/slider.png');
            game.load.image('bigTextBg', './assets/menu/bigText.png');
            game.load.image('health_empty', './assets/menu/health_empty.png');
            game.load.image('health_full', './assets/menu/health_full.png');
            game.load.spritesheet('chests', 'assets/game/chests.png', 402, 445, 2);

            game.load.image('win', './assets/menu/win.png');
            game.load.image('lose', './assets/menu/lose.png');

            game.load.image('back', './assets/menu/back.jpg'); 
            game.load.image('backG', './assets/menu/backG.jpg'); 

            game.load.image('game_desc', 'assets/game/cards/game_desc.png');
            game.load.image('card_desc', 'assets/game/cards/card_desc.png');
            
            game.load.json('data', 'assets/game/cards/data.json');
            game.load.json('newUser', 'assets/game/cards/newUser.json');

            game.load.image('quake', './assets/game/quake.png');             
            game.load.image('blanc', './assets/menu/blanc.png');             
            game.load.image('lvl', './assets/menu/level.png');             
            game.load.image('koloda', './assets/menu/koloda.png');             
            game.load.audio('win', ['./assets/game/music/win.mp3']);
            game.load.audio('clash', ['./assets/game/music/clash.mp3']);
            game.load.audio('back', ['./assets/game/music/back.mp3']);
            game.load.audio('ingame', ['./assets/game/music/game.mp3']);
            
        debuger.pointEnd('loadAssets');
    },
    create: function () 
    { 

        var loader_in = game.add.sprite(game.world.width / 2, game.world.height / 2,"loader_in")
        loader_in.anchor.setTo(0.5,0.5);
        game.load.onFileComplete.add(fileComplete, this);
        game.state.start('GameData', false, false);
    }
};

var Boot = { 
    preload: function ()
    {
        game.load.image('loader_in', './assets/menu/loader_in.png');
        game.load.image('loader_full', './assets/menu/loader_full.png');
    },
    create: function () 
    {

        var loader_in = game.add.sprite(game.world.width / 2, game.world.height / 2,"loader_in")
        loader_in.anchor.setTo(0.5,0.5);
        game.load.onFileComplete.add(fileComplete, this);

        backMusicIs=false
        LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "...", style);
        LoadingText.anchor.setTo(0.5, 0.5);
        LoadingText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);

        game.state.start('Preloader', false, false);
    }

};
// end boot loader
