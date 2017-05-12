
var Menu = 
{ 
    preload: function () 
    { 
        
    }, 
    create: function () 
    {         

        Menu.physics.startSystem(Phaser.Physics.ARCADE);

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.startFullScreen(false);
    
        ingame = game.add.audio('ingame');

        if(!backMusicIs){
            back_music = game.add.audio('back');
            back_music.play();
            back_music.loopFull(0.6);
            back_music.volume=settings.volume
        }
        backMusicIs=true


        bg = this.add.sprite(0, 0, 'back');
        he=bg.height
        bg.height = game.height;
        bg.width = (bg.height/he)*bg.width;
        bg.anchor.x=bg.anchor.x+0.1

        bigText = game.add.text(window.innerWidth/2, window.innerHeight/3, "...", styleBig)
        bigText.anchor.setTo(0.5, 0.5);
        bigText.alpha = 0; game.world.bringToTop(bigText)
        bigText.scale.setTo(scaleRatio, scaleRatio);


        // chests.animations.play('open', 20, false);
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

        chestButton=this.add.button(window.innerWidth/2, window.innerHeight/1.6, 'chests', this.inChest, this); 
        chestButton.scale.setTo(scaleRatio/4, scaleRatio/4);

        // ingame.mute = true;
    },
    startGame: function () 
    { 
        var tween = Menu.add.tween(button.scale).to({x:scaleRatio/1.1,y:scaleRatio/1.1},100, Phaser.Easing.Bounce.In, true);
        tween.onComplete.add(function() {
            if(user.cards.length>=0)
                game.state.start('Game');
            else{
                bigText.text="У вас не достаточно карт, для игры"
                var tween = Menu.add.tween(bigText).to({alpha:1},200, Phaser.Easing.Bounce.In, true);
            }
        })
        
    } ,
    setting: function () 
    {
        var tween = game.add.tween(bg.anchor).to({
            x:bg.anchor.x+0.1, y:bg.anchor.y
        }, 600, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(function() {
            game.state.start('Settings');
        }) 
        
    } ,
    cards: function () 
    { 
        var tween = game.add.tween(bg.anchor).to({
            x:bg.anchor.x-0.1, y:bg.anchor.y
        }, 600, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(function() {
            game.state.start('Cards'); 
        }) 
        
    } ,
    update: function () 
    { 
    // game.debug.soundInfo(back_music, 20, 32);
    },
    inChest: function () 
    { 
        game.state.start('Chest'); 
    },
};

var Chest = 
{ 
    preload: function () 
    { 
    },
    create: function () 
    { 
        chests = game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'chests');
        var open = chests.animations.add('open'); 
        open.onComplete.add(this.inMenu,this)      
        chests.scale.setTo(scaleRatio/2, scaleRatio/2);
        game.input.onTap.add(this.open, this);
    }, 
    open: function (pointer, doubleTap) 
    { 
        if (doubleTap)
        {
        }
        else
        {
            
            chests.animations.play('open', 20, false);
        }
    },
    inMenu: function () 
    { 
        var tween = game.add.tween(chests.anchor).to({
            x:chests.anchor.x-0.1, y:chests.anchor.y
        }, 600, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(function() {
            game.state.start('Menu'); 
        }) 
        
    } 
}; 
var Settings = 
{ 
    preload: function () 
    { 
    },    
    create: function () 
    {
        bg = this.add.sprite(0, 0, 'back');
        he=bg.height
        bg.height = game.height;
        bg.width = (bg.height/he)*bg.width;
        bg.anchor={
            x:0.2, y:bg.anchor.y
        }

        slider = this.add.sprite(window.innerWidth/2,window.innerHeight/2 , 'slider');
        switchA = game.add.sprite(window.innerWidth/2, window.innerHeight/2,'switch')        
        switchA.position.copyFrom(slider.position); 
        switchA.anchor.setTo(slider.anchor.x, slider.anchor.y); 

        switchA.inputEnabled = true;
        switchA.input.enableDrag();
        switchA.input.boundsSprite = slider;
        switchA.events.onDragUpdate.add(this.volume, this);
        switchA.events.onDragStop.add(this.save, this);

        switchA.position.x=(settings.volume?settings.volume:back_music.volume)*100+slider.position.x


        backBut = this.add.button(window.innerWidth-247, window.innerHeight-121, 'setting', this.inMenu, this); 
        backBut.scale.setTo(scaleRatio, scaleRatio);
    },
    volume: function (elem) 
    { 
        back_music.volume= (elem.position.x - slider.position.x)/100
        console.log(back_music.volume)
    },
    save: function () 
    { 
        settings.volume=back_music.volume
        MoSql.set('settings',settings)
    },
    update: function () 
    { 
    // game.debug.soundInfo(back_music, 20, 32);
    },
    inMenu: function () 
    { 
        var tween = game.add.tween(bg.anchor).to({
            x:bg.anchor.x-0.1, y:bg.anchor.y
        }, 600, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(function() {
            game.state.start('Menu'); 
        }) 
        
    } 
};

var Cards = 
{ 
    preload: function () 
    { 
    },    
    create: function () 
    {
        bg = this.add.sprite(0, 0, 'back');
        he=bg.height
        bg.height = game.height;
        bg.width = (bg.height/he)*bg.width;
        cards = this.add.button(0, window.innerHeight-121, 'cards', this.inMenu, this); 
        cards.scale.setTo(scaleRatio, scaleRatio);


    },
    inMenu: function () 
    { 
        var tween = game.add.tween(bg.anchor).to({
            x:bg.anchor.x+0.1, y:bg.anchor.y
        }, 600, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(function() {
            game.state.start('Menu'); 
        }) 
        
    } 
};