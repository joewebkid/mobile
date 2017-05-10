
var Menu = 
{ 
    preload: function () 
    { 
        gameMem = MoSql.getOrSet('game',{
            'player':{
                'cards':user['cards'],
                'cardPlace':[],
                'hp':user['hp'],
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
        lvl.scale.setTo(scaleRatio, scaleRatio);
        lvlT = game.add.text(40, lvl.position.y-5, user.lvl, styleG)
        lvlT.anchor.setTo(lvl.anchor.x, lvl.anchor.y);
        lvlT = game.add.text(130, lvl.position.y-5, user.exp, styleG)
        lvlT.anchor.setTo(lvl.anchor.x, lvl.anchor.y);
        lvlT.scale.setTo(scaleRatio, scaleRatio);

        

        var gold = this.add.sprite(lvl.width+20,50 , 'gold');
        gold.anchor.setTo(0, 0.5);
        gold.scale.setTo(scaleRatio, scaleRatio);
        goldT = game.add.text( gold.position.x+130, gold.position.y-5, user.golds, styleGold)
        goldT.anchor.setTo(gold.anchor.x, gold.anchor.y);
        goldT.scale.setTo(scaleRatio, scaleRatio);

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
        // var tween = Menu.add.tween(button.scale).to({y:game.height - 200},0, Phaser.Easing.Bounce.Out, true);
        // tween.onComplete.add(function() {})
        game.state.start('Game'); 
        
    } ,
    setting: function () 
    { 
        
    } ,
    cards: function () 
    { 
        
    } 
};

var tween = null;
cardsArr=[];
ENEMY=[];

var Game = { 
    preload: function ()
    {        
        game.physics.startSystem(Phaser.Physics.ARCADE)
        var margin = 50;
        // and set the world's bounds according to the given margin
        var x = -margin;
        var y = -margin;
        var w = game.world.width + margin * 2;
        var h = game.world.height + margin * 2;
        // it's not necessary to increase height, we do it to keep uniformity
        game.world.setBounds(x, y, w, h);
        game.world.camera.position.set(0);
        // 
        game.stage.backgroundColor = "#dec19f"

        clash = game.add.audio('clash');
        back_music.stop();
        ingame.play();

        // bg = this.add.sprite(0, 0, 'back');
        // he=bg.height
        // bg.height = game.height;
        // bg.width = (bg.height/he)*bg.width;

        time = this.add.sprite(window.innerWidth, 0, 'time');
        time.anchor.setTo(1, 0);
        time.scale.setTo(scaleRatio, scaleRatio);

        game_desc = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'game_desc');
        game_desc.anchor.setTo(0.5, 0.5);
        game_desc.scale.setTo(scaleRatio, scaleRatio);
// ENEMY
        for (var key in card_data) {
            ENEMY[key] = game.add.sprite(window.innerWidth/2, window.innerHeight/4,key)
            ENEMY[key].anchor.setTo(0.5, 0.5)
            ENEMY[key].visible = 0
            ENEMY[key].scale.setTo(scaleRatio, scaleRatio);
        }
        EnemyPosition=ENEMY['b1'].position.y 
// ENEMY END
        bigText = game.add.text(window.innerWidth/2, 50, "...", styleBig)
        bigText.anchor.setTo(0.5, 0.5);
        bigText.alpha = 0; game.world.bringToTop(bigText)
        bigText.scale.setTo(scaleRatio, scaleRatio);

// 

        koloda = game.add.sprite(0, 0,'koloda')
        koloda.position.copyFrom(ENEMY['b1'].position);
        koloda.anchor.setTo(0.5, 0.5);
        koloda.scale.setTo(scaleRatio, scaleRatio);
        game.world.sendToBack(koloda)
        game.world.moveUp(koloda)

        quake = game.add.sprite(0, 0,'quake')
        quake.position.copyFrom(game_desc.position);
        quake.anchor.setTo(0.5, 0.5);quake.visible = 0
        quake.scale.setTo(scaleRatio, scaleRatio);

        quake2 = game.add.sprite(0, 0,'quake')
        quake2.position.copyFrom(ENEMY['b1'].position);
        quake2.anchor.setTo(0.5, 0.5);quake2.visible = 0
        quake2.scale.setTo(scaleRatio, scaleRatio);

        card_desc = this.add.sprite( window.innerWidth-(game_desc.width+30), window.innerHeight-(game_desc.height/2), 'card_desc');
        card_desc.anchor.setTo(0.5, 0.5);
        card_desc.scale.setTo(scaleRatio, scaleRatio);

        game.physics.enable(card_desc, Phaser.Physics.ARCADE);
        game.physics.enable(game_desc, Phaser.Physics.ARCADE);
    }, 
    create: function () 
    { 
        total = 5
        cards = Game.add.group();
        cards.inputEnableChildren = true;

        for (var key in card_data) {
            cardsArr[key] = cards.create(100*key[1], 100, key);
            cardsArr[key].input.enableDrag(false, true);

            cardsArr[key].events.onDragStart.add(this.onDragStart, this);
            cardsArr[key].events.onDragStop.add(this.onDragStop, this)
            // cardsArr[key].scale.set(1.1);
            // cardsArr[key].scale.set(1);
            cardsArr[key].scale.setTo(scaleRatio, scaleRatio);
// card mem
            Card.add(cardsArr[key].key,gameMem.player.cards,gameMem.player.cardPlace)
// card position
            cardsArr[key].position.copyFrom(card_desc.position); 
            cardsArr[key].anchor.setTo((gameMem.player.cardPlace[key]-1)-card_desc.anchor.x, card_desc.anchor.y); 
// card position
            game.physics.enable(cardsArr[key], Phaser.Physics.ARCADE);
        }

        // ENEMY = cards.create(window.innerWidth/2, window.innerHeight/4, key);
        // ENEMY.anchor.setTo(0.5, 0.5)
        // EnemyPosition=ENEMY.position.y

        timer = game.time.create(false);
        timer.loop(1000, this.updateCounter, this);
        // timer.add(10000, this.inMenu, this);
        timer.start();

        // this.add.button(0, 0, 'back', this.inMenu, this);
        t = game.add.text(window.innerWidth-20, 0, 30, styleG)
        t.position.copyFrom(time.position);
        t.anchor.setTo(time.anchor.x/4, time.anchor.y);

        health_bar = game.add.text(0, window.innerHeight-50, 1, styleG)
        health_bar_enemy = game.add.text(0, 0, 1, styleG)
    }, 
    update: function () 
    { 
        
        
    },
    updateCounter: function () {
        if(total!=0){
            total--;
        }else{
            l=gameMem.game.cards.length
            YOUR_CARD=gameMem.game.cards
            if(l){

                enemyCardNum=this.randomInteger(1,4)
                yourName=card_data[YOUR_CARD[0]]['data'].name
                yourType=card_data[YOUR_CARD[0]]['data'].type
                yourTypeText=card_data[YOUR_CARD[0]]['data'].type_text
                yourAttack=card_data[YOUR_CARD[0]]['data'].attack
                yourAttackText=card_data[YOUR_CARD[0]]['data'].attack_text

                enemName=card_data['b'+enemyCardNum]['data'].name
                enemType=card_data['b'+enemyCardNum]['data'].type
                enemTypeText=card_data['b'+enemyCardNum]['data'].type_text
                enemAttack=card_data['b'+enemyCardNum]['data'].attack
                enemAttackText=card_data['b'+enemyCardNum]['data'].attack_text

                EnemyCard=ENEMY['b'+enemyCardNum]
                EnemyCard.visible=1;
                EnemyCard.inputEnabled = true;
                EnemyCard.input.enableDrag(false, true);

                bigText.alpha = 1

                if(yourType[0]==enemType[0]){
                    bigText.text ="Ничья \n"+" "+yourTypeText+" "+yourName+" не может победить "+enemTypeText+" "+enemName
                    this.knock(EnemyCard,cardsArr[YOUR_CARD[0] ],'enemy')
                    this.knock(cardsArr[YOUR_CARD[0] ],EnemyCard)

                    gameMem.player.hp-=enemAttack
                    gameMem.enemy.hp-=yourAttack
                }else if(yourType[1]==enemType[0]){
                    bigText.text ="Победа за вами \n"+yourTypeText+" "+yourName+" "+yourAttackText+" "+enemTypeText+" "+enemName
                    this.knock(cardsArr[YOUR_CARD[0] ],EnemyCard)
                    gameMem.enemy.hp-=yourAttack
                }else{
                    bigText.text ="В этот раз не повезло \n"+enemTypeText+" "+enemName+" "+enemAttackText+" "+yourTypeText+" "+yourName
                    this.knock(EnemyCard,cardsArr[YOUR_CARD[0] ],'enemy')
                    gameMem.player.hp-=enemAttack
                }
                // this.knock(cardsArr[YOUR_CARD[0][1]],ENEMY)


            }
            total=5

        }
    },
    render: function () 
    { 
        var text = timer.duration.toFixed(0);
        t.text=total

        health_bar.text=gameMem.player.hp
        health_bar_enemy.text=gameMem.enemy.hp
    }, 
    onDragStart: function(obj) {

        if ((tween !== null && tween.isRunning) || obj.scale.x === 1.2)
        {
            return;
        }
        // Phaser.Easing.Elastic.Out
        tween = Game.add.tween(obj.scale).to( { x:scaleRatio+0.2, y:scaleRatio+0.2 }, 100, Phaser.Easing.Linear.None, true);
    },
    nextTurn: function (obj) {
        this.state.start('Game'); 
    },
    randomInteger: function (min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    },
    onDragStop: function (obj) {
        if (tween && tween.isRunning || obj.scale.x === 1)
        {
            return;
        }
        tween = Game.add.tween(obj.scale).to( { x:scaleRatio, y:scaleRatio }, 100, Phaser.Easing.Linear.None, true);


        game.physics.arcade.collide(obj, card_desc)
        if (!game.physics.arcade.overlap(obj, card_desc, function() {
            
            Card.add(obj.key,gameMem.player.cards,gameMem.player.cardPlace)

            obj.position.copyFrom(card_desc.position); 
            obj.anchor.setTo((gameMem.player.cardPlace[obj.key]-1)-card_desc.anchor.x, card_desc.anchor.y); 
        }))
        { 
            Card.remove(obj.key,gameMem.player.cards,gameMem.player.cardPlace)
            obj.position.copyFrom(card_desc.position); 
            obj.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y); 
        }

        game.physics.arcade.collide(obj, game_desc)
        if (!game.physics.arcade.overlap(obj, game_desc, function() {

            l=gameMem.game.cards.length
            if(!l){
                Card.add(obj.key,gameMem.game.cards,gameMem.player.cardPlace) 
                obj.input.draggable = false;
                obj.position.copyFrom(game_desc.position); 
                obj.anchor.setTo(game_desc.anchor.x, game_desc.anchor.y); 
            }
        }))
        { }

    },
    knock:function(elem,enemy,whose){
    

        visible = game.add.tween(elem).to({
            alpha:1
        }, 500, Phaser.Easing.Linear.None, true);

        visible.onComplete.add(function(elem) {
            scale_tween = game.add.tween(elem.scale).to({
                 x:scaleRatio+0.5, y:scaleRatio+0.5
            }, 500, Phaser.Easing.Linear.None, true);
            game.world.bringToTop(elem)
                // obj.position.copyFrom(card_desc.position); 
                // obj.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y); 
            var tween2 = game.add.tween(elem).to({
                 y: enemy.position.y
            }, 700, Phaser.Easing.Linear.None, true);


            tween2.onComplete.add(function(elem) {

                var tween3 = game.add.tween(elem.scale).to({
                 x:scaleRatio, y:scaleRatio
                }, 200, Phaser.Easing.Bounce.InOut, true);
                clash.play();
                tween3.onComplete.add(function() {  
                    if(whose!='enemy'){quake2.visible = 1}
                    else{quake.visible = 1}                
                    var tween4 = game.add.tween(game.camera).to({
                        x: game.camera.x - 10
                    },10, Phaser.Easing.Bounce.InOut, true,300,4,true);
    // addQuake()
    // console.log()
                    tween4.onComplete.add(function() {
                        if(whose!='enemy'){
                            // position
                            elem.position.copyFrom(0,card_desc.position.y+100); 
                            // position
                            
                            elem.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y); 
                            elem.input.enableDrag(false, true);                        
                            Card.remove(elem.key,gameMem.game.cards,gameMem.player.cardPlace)
                            enemy.visible = 0
                        }else{
                            enemy.position.copyFrom(0,card_desc.position.y+100); 
                            enemy.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y); 
                            enemy.input.enableDrag(false, true);                        
                            Card.remove(enemy.key,gameMem.game.cards,gameMem.player.cardPlace)

                            elem.position.y=EnemyPosition;                   
                            elem.visible = 0
                            // elem.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y); 

                        }
                            quake.visible = 0
                            quake2.visible = 0
                        game.world.sendToBack(elem)
                        game.world.moveUp(elem)

                        if(gameMem.player.hp<=0 || gameMem.enemy.hp<=0){
                            // LOOSE
                            game.state.start('WIN'); 
                        }
                    })
                })
            })
        })
    }

};

var WIN = { 
    preload: function (){},
    create: function (){
        ingame.stop();
        user.golds+=15
        user.exp+=15
        MoSql.set('user',user)

        LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "You win (or lose XD)", style);
        LoadingText.anchor.setTo(0.5, 0.5);
        button = this.add.button(window.innerWidth/2, window.innerHeight/2, 'blanc', this.inMenu, this);
        button.anchor.setTo(0.5, 0.5); 
        // LoadingText.inputEnabled = true;
        // LoadingText.events.onInputDown.add(game.state.start('Menu'), this);

        win = game.add.audio('win');
        win.play();

    },
    inMenu: function (){game.state.start('Menu');},
}

game.state.add('GameData', GameData, false);
game.state.add('Preloader', Preloader, false);
game.state.add('Boot', Boot, false);
game.state.add('Menu', Menu); 
game.state.add('WIN', WIN); 

game.state.add('Game', Game); 
game.state.start('Boot');
