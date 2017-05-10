var game = new Phaser.Game(
    '100%',
    '100%',
    Phaser.AUTO,
    ''
    // {
    //     preload: preload,
    //     create: create,
    //     update: update
    // }
);
var style = { font: '50px "Shark"', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 10, align: 'center' };
var styleG = { font: '30px "Shark"', fill: '#FFFFFF', stroke: '#0a73a2', strokeThickness: 5, align: 'right' };

// start boot loader
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    //LoadingText.setText(progress + "%  ");
    
    
    loader_in = game.add.sprite(game.width/2,game.height/2,"loader_in");
    loader_full = game.add.sprite(game.width/2,game.height/2,"loader_full");    
    loader_in.anchor.setTo(0.5,0.5);
    loader_full.anchor.setTo(0.5,0.5);
    
    this.load.setPreloadSprite(loader_in,1);
    this.load.setPreloadSprite(loader_full,0);
    
    
    
    
    var txt = LoadingText.setText(progress + "%  ");
    game.world.bringToTop(txt)
    
    
    console.log(progress);
    
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
        
            game.load.image('start', './assets/menu/butt3.png');  
            game.load.image('setting', './assets/menu/butt_sett.png'); 
            game.load.image('cards', './assets/menu/butt_cards.png'); 
            game.load.image('time', './assets/menu/time.png');
            game.load.image('gold', './assets/menu/gold.png');

            game.load.image('back', './assets/menu/back.jpg'); 

            game.load.image('game_desc', 'assets/game/cards/game_desc2.png');
            game.load.image('card_desc', 'assets/game/cards/cards_desc.png');
            
            game.load.json('data', 'assets/game/cards/data.json');
            game.load.json('newUser', 'assets/game/cards/newUser.json');
            
        debuger.pointEnd('loadAssets');
    },
    create: function () 
    { 
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

        game.load.onFileComplete.add(fileComplete, this);

        LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "...", style);
        LoadingText.anchor.setTo(0.5, 0.5);
        
        game.state.start('Preloader', false, false);
    }

};
// end boot loader
