chest_rare=false
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

        menu = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);
        menu.scale.setTo(scaleRatio, scaleRatio);


        // chests.animations.play('open', 20, false);
        var lvl = this.add.sprite(0, 0, 'lvl');
        lvl.position.x=lvl.width/2
        lvl.position.y=lvl.height/2-10
        lvl.anchor.setTo(0.5, 0.5);
        lvl.scale.setTo(scaleRatio/2, scaleRatio/2);

        lvlText = game.add.text(0,0, user.lvl, style)
        lvlText.anchor.setTo(0.5, 0.5);
        lvlText.position.x=lvl.position.x-lvl.width/2+30
        lvlText.position.y=lvl.position.y-5
        lvlText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);

        lvlTextExp = game.add.text(130, lvl.position.y-5, user.exp, style)
        lvlTextExp.position.copyFrom({x:lvl.position.x+10,y:lvl.position.y-5});
        lvlTextExp.anchor.setTo(lvl.anchor.x, lvl.anchor.y);
        lvlTextExp.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);

        // if(user.chest.days.length!=0){
        //     bigText.text="У вас новый сундук"
        //     var tween = Menu.add.tween(bigText).to({alpha:1},200, Phaser.Easing.Bounce.In, true);
        // }
        var gold = this.add.sprite(lvl.position.x+lvl.width+20,50 , 'gold');
        gold.anchor.setTo(0.5, 0.5);
        gold.scale.setTo(scaleRatio/2, scaleRatio/2);
        goldText = game.add.text( 0, 0, user.golds?user.golds:0, style)
        goldText.position.copyFrom(gold.position);
        goldText.anchor.setTo(0.5, 0.5);goldText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3); 

// кнопка START
        button = this.add.button(window.innerWidth/2, window.innerHeight/2.2, 'butt_in', this.startGame, this,2,2,1,1);
        button.scale.setTo(scaleRatio/1.2, scaleRatio/1.2); 
        button.anchor.setTo(0.5, 0.5);
        buttonText = game.add.text(game.world.width / 2, game.world.height / 2, "Играть", style);        
        buttonText.position.copyFrom(button.position);
        buttonText.anchor.setTo(0.5, 0.5);buttonText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3); 

// кнопка настройки
        cards = this.add.button(window.innerWidth/2, window.innerHeight/1.82, 'butt_in', this.cards, this,2,2,1,1); 
        cards.scale.setTo(scaleRatio/1.2, scaleRatio/1.2);       
        cards.anchor.setTo(0.5, 0.5);
        cardsText = game.add.text(game.world.width / 2, game.world.height / 2, "Карты", style);        
        cardsText.position.copyFrom(cards.position);
        cardsText.anchor.setTo(0.5, 0.5);cardsText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3); 

// кнопка настройки
        setting = this.add.button(window.innerWidth/2, window.innerHeight/1.55, 'butt_in', this.setting, this,2,2,1,1); 
        setting.scale.setTo(scaleRatio/1.2, scaleRatio/1.2);        
        setting.anchor.setTo(0.5, 0.5);
        settingText = game.add.text(game.world.width / 2, game.world.height / 2, "Настройки", style);        
        settingText.position.copyFrom(setting.position);
        settingText.anchor.setTo(0.5, 0.5);settingText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3); 


        bigTextBg=game.add.sprite(window.innerWidth/8, 0, 'bigTextBg');
        bigTextBg.position.y=window.innerHeight-bigTextBg.height/6
        bigTextBg.anchor.setTo(0.5, 0.5);bigTextBg.scale.setTo(scaleRatio/5, scaleRatio/5);
        if(user.tochest==0||user.tochest==undefined){
            chests = this.add.button(0, 0, 'chests', this.inChest, this);chests.position.copyFrom(bigTextBg.position);
            chests.anchor.setTo(0.5, 0.5);chests.scale.setTo(scaleRatio/7, scaleRatio/7);

            chestsText = game.add.text(game.world.width / 2, game.world.height / 2, "Сундук", style);
            chestsText.position.copyFrom(chests.position);chestsText.scale.setTo(scaleRatio/3, scaleRatio/3);
            chestsText.anchor.setTo(0.5, 2);
            user.tochest=5
        }

        // settingText = game.add.text(game.world.width / 2, game.world.height / 2, "Сундуки", style);  
        // buttonText = game.add.text(game.world.width / 2, game.world.height / 2, "Game", style);
        // buttonText.anchor.setTo(0.5, 0.5);

        // chestButton=this.add.button(window.innerWidth/2, window.innerHeight/1.6, 'chests', this.inChest, this); 
        // chestButton.scale.setTo(scaleRatio/4, scaleRatio/4);

        // ingame.mute = true;

        bigText = game.add.text(window.innerWidth/2, window.innerHeight/3, "...", styleBig)
        bigText.anchor.setTo(0.5, 0.5);
        bigText.alpha = 0; game.world.bringToTop(bigText)
        bigText.scale.setTo(scaleRatio, scaleRatio);

        cardsLenght=0;for (var key in user["cards"]) {cardsLenght++}
    },
    startGame: function () 
    { 
        if(cardsLenght>=4)
            game.state.start('Game');
        else{
            bigText.text="У вас\n не достаточно карт,\n для игры"
            var tween2 = game.add.tween(bigText).to({alpha:1},100, Phaser.Easing.Linear.None, true);
            var tween = game.add.tween(bigText).to({visible:1},2200, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function() {
                tween = game.add.tween(bigText).to({alpha:0},1000, Phaser.Easing.Linear.None, true); 
            })
        }
        
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
        openNum=4
        chests = game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'chests');
        chests.anchor.setTo(0.5, 0.5)
        var open = chests.animations.add('open'); 
        // open.onComplete.add(this.inMenu,this)      
        chests.scale.setTo(scaleRatio/2, scaleRatio/2);
        game.input.onTap.add(this.open, this);
    }, 
    open: function () 
    { 
        if(openNum!=0){
            chests.animations.play('open', 20, false);
            if(chest_rare==false||chest_rare=="standart"){
                if(firstPlay){cardNum=this.randomInteger(1,7);firstPlay=false}
                else{cardNum=openNum+1}
                key="b"+cardNum
                newCard = game.add.sprite(window.innerWidth/2, window.innerHeight/2,key)
                newCard.anchor.setTo(0.5, 0.5);
                newCard.scale.setTo(scaleRatio/8.3, scaleRatio/8.3);
                newCard.alpha=0
                var tween = game.add.tween(newCard).to({
                    alpha:1
                }, 600, Phaser.Easing.Linear.None, true);
                var tween = game.add.tween(newCard.scale).to({
                    x:scaleRatio/2.3, y:scaleRatio/2.3
                }, 600, Phaser.Easing.Linear.None, true);

                tween.onComplete.add(function() {
                    if(user["cards"][key]!=undefined)user["cards"][key]++
                    else user.cards[key]=1
                    MoSql.set('user',user)
                    // game.state.start('Menu'); 
                }) 
                // card_data["b"+cardNum]
            }
            openNum--
        }else{
            game.state.start('Menu'); 
        }
    },
    randomInteger: function (min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
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

        menu = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);
        menu.scale.setTo(scaleRatio, scaleRatio);

        slider = this.add.sprite(window.innerWidth/2,window.innerHeight/2 , 'slider');
        slider.scale.setTo(scaleRatio, scaleRatio);
        slider.anchor.setTo(0, 0);
        slider.position.x=menu.position.x-slider.width/1.9
        slider.position.y=menu.position.y


        sliderText = game.add.text(game.world.width / 2, game.world.height / 2, "Громкость", style);
        sliderText.position.copyFrom(slider.position);sliderText.scale.setTo(scaleRatio/2, scaleRatio/2);
        sliderText.anchor.setTo(0, 2);

        switchA = game.add.sprite(window.innerWidth/2, window.innerHeight/2,'switch')        
        switchA.position.copyFrom(slider.position); 
        switchA.anchor.setTo(slider.anchor.x, slider.anchor.y); 

        switchA.inputEnabled = true;
        switchA.input.enableDrag();
        switchA.input.boundsSprite = slider;
        switchA.events.onDragUpdate.add(this.volume, this);
        switchA.events.onDragStop.add(this.save, this);
        switchA.scale.setTo(scaleRatio, scaleRatio);

        switchA.position.x=(settings.volume?settings.volume:back_music.volume)*100+slider.position.x


        backBut = this.add.button(window.innerWidth, window.innerHeight, 'butt_in', this.inMenu, this,2,2,1,1); 
        backBut.scale.setTo(scaleRatio, scaleRatio);
        backBut.position.x=backBut.position.x-backBut.width
        backBut.position.y=backBut.position.y-backBut.width
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
        user_cards=[]
        bg = this.add.sprite(0, 0, 'back');
        he=bg.height
        bg.height = game.height;
        bg.width = (bg.height/he)*bg.width;
        cards = this.add.button(window.innerWidth/2, window.innerHeight-121, 'butt_in', this.inMenu, this); 
        cards.scale.setTo(scaleRatio, scaleRatio);

        i=0
        for (var key in user["cards"]) {
            string=(i>2?(i/5-(i%5)/5):0)
            user_cards[key] = this.add.button(window.innerWidth/5*((i-5*string)) ,he*string , key, this.info, this);
            wi=user_cards[key].width
            user_cards[key].width=window.innerWidth/5
            user_cards[key].height = (user_cards[key].width/wi)*user_cards[key].height;
            he=user_cards[key].height
            //user_cards[key].scale.setTo(scaleRatio, scaleRatio);
            user_cards[key].anchor.setTo(0, 0);

            var style2 = { font: '32px "Shark"',  fill: '#333333', wordWrap: true, wordWrapWidth: user_cards[key].width, align: "left" };
            var margin = 30;

            cardsArrText[key] = game.add.text(user_cards[key].position.x, user_cards[key].position.y, card_data[key]['data'].attack, style2);
            cardsArrText[key].anchor.set(0,0);

            cardsArrText2[key] = game.add.text(user_cards[key].position.x, user_cards[key].position.y, card_data[key]['data'].health, style2);
            cardsArrText2[key].anchor.set(0,0);

            cardsArrText3[key] = game.add.text(user_cards[key].position.x+user_cards[key].width/3, user_cards[key].position.y+user_cards[key].height/1.15, user["cards"][key], style2);
            cardsArrText3[key].anchor.set(0,0);

            cardsArrText[key].x = cardsArrText[key].x-cardsArrText[key].width/2+margin;
            cardsArrText[key].y = cardsArrText[key].y-cardsArrText[key].height/2+margin*1.5;

            cardsArrText2[key].x = cardsArrText2[key].x+cardsArrText2[key].width/2-cardsArrText2[key].width-margin;
            cardsArrText2[key].y = cardsArrText2[key].y-cardsArrText2[key].height/2+margin*1.5;

            i++
        }
    },
    info: function (obj) 
    { 
        console.log(obj.key)
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