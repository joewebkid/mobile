var tween = null;
cardsArr=[];
ENEMY=[];

var Game = { 
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
        // game.stage.backgroundColor = "#dec19f"

        clash = game.add.audio('clash');
        back_music.stop();
        ingame.play();
        ingame.volume=settings.volume

        bg = this.add.tileSprite(0, 0,game.width,game.height, 'backG');
        

        time = this.add.sprite(window.innerWidth, 0, 'time');
        time.position.x=time.position.x-time.width/3;
        time.position.y=time.position.y+time.height/3;
        time.anchor.setTo(0.5, 0.5);
        time.scale.setTo(scaleRatio, scaleRatio);

        game_desc = this.add.sprite(0, window.innerHeight/2, 'game_desc');
        game_desc.anchor.setTo(0.5, 0.5);
		game_desc.position.x=game_desc.width/3
        game_desc.scale.setTo(scaleRatio, scaleRatio);
// ENEMY
        for (var key in card_data) {
            ENEMY[key] = game.add.sprite(window.innerWidth-game_desc.width/2, window.innerHeight/2,key)
            ENEMY[key].anchor.setTo(0.5, 0.5)
            ENEMY[key].visible = 0
            ENEMY[key].scale.setTo(scaleRatio/5.6, scaleRatio/5.6);
        }
        EnemyPosition=ENEMY['b1'].position.x 
// ENEMY END
        bigText = game.add.text(window.innerWidth/2, 50, "...", styleBig)
        bigText.anchor.setTo(0.5, 0.5);
        bigText.alpha = 0; game.world.bringToTop(bigText)
        bigText.scale.setTo(scaleRatio, scaleRatio);

// 

        koloda = game.add.sprite(0, 0,'koloda')
        koloda.anchor.setTo(0.5, 0.5);
        koloda.position.copyFrom(ENEMY['b1'].position);
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
        i=0
        for (var key in card_data) {
        	i++
            cardsArr[key] = cards.create(100*key[1], 100, key);
            cardsArr[key].input.enableDrag(false, true);

            cardsArr[key].events.onDragStart.add(this.onDragStart, this);
            cardsArr[key].events.onDragStop.add(this.onDragStop, this)
            // cardsArr[key].scale.set(1.1);
            // cardsArr[key].scale.set(1);
            cardsArr[key].scale.setTo(scaleRatio/5.6, scaleRatio/5.6);
// card mem
			if(i<=3){
	            Card.add(cardsArr[key].key,gameMem.player.cards,gameMem.player.cardPlace)
	// card position
	            cardsArr[key].position.copyFrom(card_desc.position); 
	            cardsArr[key].anchor.setTo((gameMem.player.cardPlace[key]-1)-card_desc.anchor.x, card_desc.anchor.y); 
    // card position
			}else{
                gameMem.stack.cards.push(cardsArr[key].key)
				cardsArr[key].visible=0
			}

            game.physics.enable(cardsArr[key], Phaser.Physics.ARCADE);
        }
        this.nextElem ()
        // ENEMY = cards.create(window.innerWidth/2, window.innerHeight/4, key);
        // ENEMY.anchor.setTo(0.5, 0.5)
        // EnemyPosition=ENEMY.position.y

        timer = game.time.create(false);
        timer.loop(1000, this.updateCounter, this);
        // timer.add(10000, this.inMenu, this);
        timer.start();

        // this.add.button(0, 0, 'back', this.inMenu, this);
        t = game.add.text(0, 0, 30, styleG)
        t.position.copyFrom(time.position);
        t.anchor.setTo(-0.5, 0.5);

        health_bar = game.add.text(0, window.innerHeight-50, 1, styleG)
        health_bar_enemy = game.add.text(0, 0, 1, styleG)
    }, 
    update: function () 
    { 
        
        
    },
    render: function () 
    { 
        var text = timer.duration.toFixed(0);
        t.text=total

        health_bar.text=gameMem.player.hp
        health_bar_enemy.text=gameMem.enemy.hp
    }, 

    nextElem: function(){
        elem=cardsArr[gameMem.stack.cards[gameMem.stack.cards.length-1]]
        elem.visible=1
        elem.scale={x:(scaleRatio/5.6)/1.5, y:(scaleRatio/5.6)/1.5}
        elem.input.draggable = false;
        elem.position.x=0 + elem.width/2,
        elem.position.y=window.innerHeight - elem.height/2
        elem.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y);
    },
    pushNewCard: function () 
    { 
        cardStack=gameMem.stack.cards.pop()
        elem=cardsArr[cardStack]
        console.log(gameMem.player.cardPlace)
        Card.add(elem.key,gameMem.player.cards,gameMem.player.cardPlace)

        console.log(gameMem.player.cardPlace)
        elem.anchor.setTo((gameMem.player.cardPlace[elem.key]-1)-card_desc.anchor.x, card_desc.anchor.y);
        // elem.visible=1
        // elem.position.copyFrom(card_desc.position); 
        var tween3 = game.add.tween(elem.scale).to({
            x:(scaleRatio/5.6), y:(scaleRatio/5.6)
        }, 200, Phaser.Easing.Bounce.InOut, true);

        visible = game.add.tween(elem.position).to({
            x:card_desc.position.x,y:card_desc.position.y
        }, 500, Phaser.Easing.Linear.None, true);

        visible.onComplete.add(function(elem_pos) {
            elem.input.enableDrag(false, true); 
            Game.nextElem ()   
        })     
    },

    updateCounter: function () {
        if(total!=0){
            total--;
        }else{
            l=gameMem.game.cards.length
            YOUR_CARD=gameMem.game.cards
            if(l){
// Your card DATA
                yourName=card_data[YOUR_CARD[0]]['data'].name
                yourType=card_data[YOUR_CARD[0]]['data'].type
                yourTypeText=card_data[YOUR_CARD[0]]['data'].type_text
                yourAttack=card_data[YOUR_CARD[0]]['data'].attack
                yourAttackText=card_data[YOUR_CARD[0]]['data'].attack_text
// end Your card DATA
// enemy card DATA
                enemyCardNum=this.randomInteger(1,4)
                enemName=card_data['b'+enemyCardNum]['data'].name
                enemType=card_data['b'+enemyCardNum]['data'].type
                enemTypeText=card_data['b'+enemyCardNum]['data'].type_text
                enemAttack=card_data['b'+enemyCardNum]['data'].attack
                enemAttackText=card_data['b'+enemyCardNum]['data'].attack_text
// end enemy card DATA
                EnemyCard=ENEMY['b'+enemyCardNum]
                EnemyCard.visible=1;

                bigText.alpha = 1
// steps for game
                if(yourType[0]==enemType[0]){
                    bigText.text ="Ничья! \n\""+yourTypeText+" "+yourName+"\" не может победить \""+enemTypeText+" "+enemName+"\""+"\nурон противнику: "+yourAttack
                    this.knock(cardsArr[YOUR_CARD[0] ],EnemyCard,'double')
                    this.knock(EnemyCard,cardsArr[YOUR_CARD[0] ],'enemy')

                    gameMem.player.hp-=enemAttack
                    gameMem.enemy.hp-=yourAttack
                }else if(yourType[1]==enemType[0]){
                    bigText.text ="Победа за вами! \n\""+yourTypeText+" "+yourName+"\" "+yourAttackText+" \""+enemTypeText+" "+enemName+"\""+"\nурон противнику: "+yourAttack
                    this.knock(cardsArr[YOUR_CARD[0] ],EnemyCard)
                    gameMem.enemy.hp-=yourAttack
                }else{
                    bigText.text ="В этот раз не повезло! \n\""+enemTypeText+" "+enemName+"\" "+enemAttackText+" \""+yourTypeText+" "+yourName+"\""+"\nурон Вам: "+enemAttack
                    this.knock(EnemyCard,cardsArr[YOUR_CARD[0] ],'enemy')
                    gameMem.player.hp-=enemAttack
                }
// end steps
                // this.knock(cardsArr[YOUR_CARD[0][1]],ENEMY)


            }
            total=5

        }
    },
    onDragStart: function(obj) {

        if ((tween !== null && tween.isRunning) || obj.scale.x === 1.2)
        {
            return;
        }
        // Phaser.Easing.Elastic.Out
        tween = Game.add.tween(obj.scale).to( { x:(scaleRatio+0.2)/5.6, y:(scaleRatio+0.2)/5.6 }, 100, Phaser.Easing.Linear.None, true);
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
        tween = Game.add.tween(obj.scale).to( { x:(scaleRatio/5.6), y:(scaleRatio/5.6) }, 100, Phaser.Easing.Linear.None, true);

        Card.remove(obj.key,gameMem.player.cards,gameMem.player.cardPlace)

        // cardsArr.forEach(function(item) {
        //     console.log()
        //     game.physics.arcade.collide(item,obj);
        //     if (!game.physics.arcade.overlap(item, obj, console.log('hui2')) ){console.log('hui2')};
        // }, this);

// пересечения с досками
        game.physics.arcade.collide(obj, card_desc)
        if (!game.physics.arcade.overlap(obj, card_desc, function() {      
            Card.add(obj.key,gameMem.player.cards,gameMem.player.cardPlace)
            obj.position.copyFrom(card_desc.position); 
            obj.anchor.setTo((gameMem.player.cardPlace[obj.key]-1)-card_desc.anchor.x, card_desc.anchor.y); 
            // console.log("пересечения с доской для карт "+gameMem.player.cardPlace[obj.key])
        }))
        {
// пересечение с игральной доской
            game.physics.arcade.collide(obj, game_desc)
            if (!game.physics.arcade.overlap(obj, game_desc, function() {  

                // console.log("пересечения с игральной доской ")          
                l=gameMem.game.cards.length
                if(!l){
                    Card.add(obj.key,gameMem.game.cards,false) 
                    obj.input.draggable = false;
                    obj.position.copyFrom(game_desc.position); 
                    obj.anchor.setTo(game_desc.anchor.x, game_desc.anchor.y); 
                }
            }))
            { 
                Card.add(obj.key,gameMem.player.cards,gameMem.player.cardPlace)
                // console.log("нет пересечения "+gameMem.player.cardPlace[obj.key])
                obj.position.copyFrom(card_desc.position); 
                obj.anchor.setTo((gameMem.player.cardPlace[obj.key]-1)-card_desc.anchor.x, card_desc.anchor.y); 
            }            
        }

        

    },
    knock:function(elem,enemy,whose){
    
        game.world.bringToTop(elem)
        enemy.visible=1
        visible = game.add.tween(elem).to({
            alpha:1
        }, 500, Phaser.Easing.Linear.None, true);

        visible.onComplete.add(function(elem) {
            scale_tween = game.add.tween(elem.scale).to({
                 x:(scaleRatio+0.5)/5.6, y:(scaleRatio+0.5)/5.6
            }, 500, Phaser.Easing.Linear.None, true);
                // obj.position.copyFrom(card_desc.position); 
                // obj.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y); 
            var tween2 = game.add.tween(elem).to({
                 x: enemy.position.x
            }, 700, Phaser.Easing.Linear.None, true);


            tween2.onComplete.add(function(elem) {

                var tween3 = game.add.tween(elem.scale).to({
                 x:(scaleRatio/5.6), y:(scaleRatio/5.6)
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
                            // elem.position.copyFrom(0,card_desc.position.y+100);                                                       
                            // elem.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y);   // position                       
                            Card.remove(elem.key,gameMem.game.cards,gameMem.player.cardPlace)
                            enemy.visible = 0

                            if(whose!='double'){
                                Card.addFirst(elem.key,gameMem.stack.cards)
                            }
                            elem.visible=0
                        }else{
                            // enemy.position.copyFrom(0,card_desc.position.y+100); 
                            // enemy.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y);                       
                            Card.remove(enemy.key,gameMem.game.cards,gameMem.player.cardPlace)
                            elem.position.x=EnemyPosition;                   
                            elem.visible = 0

                            Card.addFirst(enemy.key,gameMem.stack.cards)
                            enemy.visible=0
                        }   
                            if(whose!='double'){
                                Game.pushNewCard()
                            }

                            quake.visible = 0
                            quake2.visible = 0
                            game.world.sendToBack(elem)
                            game.world.moveUp(elem)

                            if(gameMem.player.hp<=0){
                                // LOOSE
                                game.state.start('WIN');
                                win=false   
                            }else if(gameMem.enemy.hp<=0){
                                game.state.start('WIN');  
                                win=true                           
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
        salary=15
        if(win){
            button = this.add.button(window.innerWidth/2, window.innerHeight/2, 'win', this.inMenu, this);
            LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "Победа!\nВаша награда "+salary+" золотых", style);


            user.golds+=salary
            user.exp+=15
            MoSql.set('user',user)
        }
        else{
            button = this.add.button(window.innerWidth/2, window.innerHeight/2, 'lose', this.inMenu, this);
            LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "Неудача", style);
        }
        button.anchor.setTo(0.5, 0.5);
        LoadingText.position.copyFrom(button.position); 
        LoadingText.anchor.setTo(button.anchor.x, button.anchor.y);
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
game.state.add('Settings', Settings);
game.state.add('Cards', Cards);

game.state.add('Chest', Chest); 
game.state.add('Game', Game); 
game.state.add('WIN', WIN); 

game.state.start('Boot');
