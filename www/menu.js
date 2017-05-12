
var Menu = 
{ 
    preload: function () 
    { 
        gameMem = MoSql.getOrSet('game',{
            'player':{
                'cards':user['cards'],
                'cardPlace':[],
                'hp':user['hp'],
            },
            'stack':{
                'cards':[]
            }
            ,
            'enemy':{
                'cards':[],
                'hp':user['hp'],
            }
            ,
            'game':{
                'cards':[]
            }
        })
    }, 
    create: function () 
    {         
        Menu.physics.startSystem(Phaser.Physics.ARCADE);

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.startFullScreen(false);
    
        back_music = game.add.audio('back');
        ingame = game.add.audio('ingame');
        back_music.play();
        back_music.loopFull(0.6);

        bg = this.add.sprite(0, 0, 'back');
        he=bg.height
        bg.height = game.height;
        bg.width = (bg.height/he)*bg.width;

        var lvl = this.add.sprite(0, 50, 'lvl');
        lvl.anchor.setTo(0, 0.5);
        lvl.scale.setTo(scaleRatio/2, scaleRatio/2);
        lvlT = game.add.text(40, lvl.position.y-5, user.lvl, styleG)
        lvlT.anchor.setTo(lvl.anchor.x, lvl.anchor.y);
        lvlT.scale.setTo(scaleRatio/2, scaleRatio/2);

        lvlT = game.add.text(130, lvl.position.y-5, user.exp, styleG)
        lvlT.anchor.setTo(lvl.anchor.x, lvl.anchor.y);
        lvlT.scale.setTo(scaleRatio/2, scaleRatio/2);

        

        var gold = this.add.sprite(lvl.width+20,50 , 'gold');
        gold.anchor.setTo(0, 0.5);
        gold.scale.setTo(scaleRatio/2, scaleRatio/2);
        goldT = game.add.text( gold.position.x+130, gold.position.y-5, user.golds, styleGold)
        goldT.anchor.setTo(gold.anchor.x, gold.anchor.y);
        goldT.scale.setTo(scaleRatio/2, scaleRatio/2);

        button = this.add.button(window.innerWidth/2, window.innerHeight/2, 'start', this.startGame, this);
        button.anchor.setTo(0.5, 0.5); 


        button.scale.setTo(scaleRatio, scaleRatio);

        setting = this.add.button(window.innerWidth-247, window.innerHeight-121, 'setting', this.setting, this); 
        setting.scale.setTo(scaleRatio, scaleRatio);

        cards = this.add.button(0, window.innerHeight-121, 'cards', this.cards, this); 
        cards.scale.setTo(scaleRatio, scaleRatio);

        // buttonText = game.add.text(game.world.width / 2, game.world.height / 2, "Game", style);
        // buttonText.anchor.setTo(0.5, 0.5);
    }, 
    startGame: function () 
    { 
        var tween = Menu.add.tween(button.scale).to({x:button.width - 40,y:button.height - 40},0, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.add(function() {
            game.state.start('Game'); 
        })
        
    } ,
    setting: function () 
    { 
        game.state.start('Settings'); 
        
    } ,
    cards: function () 
    { 
        game.state.start('Cards'); 
        
    } 
};
var Settings = 
{ 
    preload: function () 
    { 
    },    
    create: function () 
    {
        setting = this.add.button(window.innerWidth-247, window.innerHeight-121, 'setting', this.setting, this); 
        setting.scale.setTo(scaleRatio, scaleRatio);
        console.log("set")
    }
};
var Cards = 
{ 
    preload: function () 
    { 
    },    
    create: function () 
    {
        cards = this.add.button(0, window.innerHeight-121, 'cards', this.cards, this); 
        cards.scale.setTo(scaleRatio, scaleRatio);
        console.log("card")
    }
};