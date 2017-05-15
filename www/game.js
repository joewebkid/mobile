var tween = null;
cardsArr=[];
cardsArrText=[];cardsArrText2=[];
cardsArrWidth=[]
ENEMY=[];

var Game = { 
    preload: function ()
    {             
        gameMem = MoSql.set('game',{
            'player':{
                // 'cards':Object.keys(user['cards']),
                'cards':[],
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
        fullHpYour=user['hp'] 
        fullHpEnemy=user['hp'] 

        game.physics.startSystem(Phaser.Physics.ARCADE)
        var margin = 50;
        var x = -margin;
        var y = -margin;
        var w = game.world.width + margin * 2;
        var h = game.world.height + margin * 2;
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
        time.scale.setTo(scaleRatio/2, scaleRatio/2);
// 
        health_empty = this.add.sprite(window.innerWidth/3, window.innerHeight, 'health_empty');
        health_empty.position.y=window.innerHeight-health_empty.height/2
        health_empty.anchor.setTo(0.5, 0.5);

        health_full = this.add.sprite(window.innerWidth/3, window.innerHeight-health_empty.height, 'health_full');
        // health_full.position.y=health_full.height/8
        health_full.anchor.setTo(0.5, 0);        
        crop_health_full = new Phaser.Rectangle(0, 0, health_full.width, health_full.height);
// 
        health_empty_en = this.add.sprite(window.innerWidth/3, 0, 'health_empty');
        health_empty_en.position.y=health_empty.height/2
        health_empty_en.anchor.setTo(0.5, 0.5);

        health_full_en = this.add.sprite(window.innerWidth/3,0, 'health_full');
        // health_full.position.y=health_full.height/8
        health_full_en.anchor.setTo(0.5, 0);        
        crop_health_full_en = new Phaser.Rectangle(0, 0, health_full_en.width, health_full_en.height);


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
            // var style2 = { font: '32px "Shark"', fill: "#ff0044", wordWrap: true, wordWrapWidth: ENEMY[key].width, align: "center", backgroundColor: "#ffff00" };
            // text = game.add.text(0, 0, card_data[key]['data'].attack, style2);
        }
        EnemyPosition=ENEMY['b1'].position.x 
// ENEMY END
        // bigTextBg = this.add.sprite(window.innerWidth/2, 20, 'bigTextBg');
        // bigTextBg.position.y=bigTextBg.height/4
        // bigTextBg.anchor.setTo(0.5, 0.5);
        // bigTextBg.scale.setTo(scaleRatio/1.1, scaleRatio/2);

        bigText = game.add.text(window.innerWidth/2, 50, "...", style)
        bigText.anchor.setTo(0.5, 0.5);
        bigText.alpha = 0; game.world.bringToTop(bigText)
        bigText.scale.setTo(scaleRatio/10, scaleRatio/10);
        // bigText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);

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
        for (var key in user['cards']) {
        	i++
            cardsArr[key] = cards.create(100*key[1], 100, key);
            cardsArr[key].input.enableDrag(false, true);

            cardsArr[key].events.onDragStart.add(this.onDragStart, this);
            cardsArr[key].events.onDragStop.add(this.onDragStop, this)
            // cardsArr[key].scale.set(1.1);
            // cardsArr[key].scale.set(1);
            cardsArr[key].scale.setTo(scaleRatio/5.6, scaleRatio/5.6);
            cardsArrWidth[key]=cardsArr[key].width
// card mem
			if(i<=3){
	            Card.add(cardsArr[key].key,gameMem.player.cards,gameMem.player.cardPlace)
	// card position
                cardsArr[key].position.x=card_desc.position.x-(gameMem.player.cardPlace[key]-2)*cardsArr[key].width; 
	            cardsArr[key].position.y=card_desc.position.y; 
	            cardsArr[key].anchor.setTo(0.5); 
    // card position
			}else{
                gameMem.stack.cards.push(cardsArr[key].key)
                cardsArr[key].anchor.setTo(0.5); 
				cardsArr[key].visible=0
			}

            game.physics.enable(cardsArr[key], Phaser.Physics.ARCADE);

            var style2 = { font: '32px "Shark"',  fill: '#333333', wordWrap: true, wordWrapWidth: cardsArr[key].width, align: "left" };
            cardsArrText[key] = game.add.text(cardsArr[key].position.x, cardsArr[key].position.y, card_data[key]['data'].attack, style2);
            cardsArrText[key].anchor.set(0,0);
            cards.add(cardsArrText[key])

            cardsArrText2[key] = game.add.text(cardsArr[key].position.x, cardsArr[key].position.y, card_data[key]['data'].health, style2);
            cardsArrText2[key].anchor.set(0,0);
            cards.add(cardsArrText2[key])
            game.physics.enable(cardsArrText2[key], Phaser.Physics.ARCADE);
            
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
        t = game.add.text(0, 0, 30, style)
        t.position.copyFrom(time.position);
        t.anchor.setTo(0.5, 0.5);
        t.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);

        health_bar = game.add.text(0, 0, 1, style)
        health_bar.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);
        health_bar.position.copyFrom(health_empty.position)
        health_bar.anchor.setTo(0.5, 0.5);

        health_bar_enemy = game.add.text(0, 0, 1, style)
        health_bar_enemy.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);
        health_bar_enemy.position.copyFrom(health_empty_en.position)
        health_bar_enemy.anchor.setTo(0.5, 0.5);

        health_full.crop(crop_health_full);
        health_full_en.crop(crop_health_full_en);
        curHel=fullHpYour
        curHel_en=fullHpEnemy
    }, 
    update: function () 
    { 
        for (var key in user['cards']) {
            cardsArrText[key].x = cardsArr[key].x-cardsArr[key].width/2+5;
            cardsArrText[key].y = cardsArr[key].y-cardsArr[key].height/2+2;
            cards.add(cardsArrText[key])

            cardsArrText2[key].x = cardsArr[key].x+cardsArr[key].width/2-cardsArrText2[key].width-5;
            cardsArrText2[key].y = cardsArr[key].y-cardsArr[key].height/2+2;
            cards.add(cardsArrText2[key])
            // cardsArrText[key].scale=cardsArr[key].scale
        }

        if(curHel!=gameMem.player.hp){

            health_bar.text=fullHpYour+"/"+gameMem.player.hp
            health_full_height=health_full.height*(gameMem.player.hp/fullHpYour)
            crop_health_full.height=health_full_height
            health_full.updateCrop();
            curHel=gameMem.player.hp
        }

        if(curHel_en!=gameMem.enemy.hp){
            health_bar_enemy.text=fullHpEnemy+"/"+gameMem.enemy.hp
            health_full_height_en=health_full_en.height*(gameMem.enemy.hp/fullHpEnemy)
            crop_health_full_en.height=health_full_height_en
            health_full_en.updateCrop();
            curHel_en=gameMem.enemy.hp
        }
        
    },
    render: function () 
    { 
        var text = timer.duration.toFixed(0);
        t.text=total

    }, 

    nextElem: function(){
        elem=cardsArr[gameMem.stack.cards[gameMem.stack.cards.length-1]]
        // if(elem!=undefined){
            elem.visible=1
            cardsArrText[elem.key].visible
            cardsArrText2[elem.key].visible
            elem.scale={x:(scaleRatio/5.6)/1.5, y:(scaleRatio/5.6)/1.5}
            elem.input.draggable = false;
            elem.position.x=0 + elem.width/2,
            elem.position.y=window.innerHeight - elem.height/2
            elem.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y);
        // }
    },
    pushNewCard: function () 
    { 
        cardStack=gameMem.stack.cards.pop()
        elem=cardsArr[cardStack]
        Card.add(elem.key,gameMem.player.cards,gameMem.player.cardPlace)

        // elem.anchor.setTo((gameMem.player.cardPlace[elem.key]-1)-card_desc.anchor.x, card_desc.anchor.y);
        // elem.visible=1
        // elem.position.copyFrom(card_desc.position); 
        var tween3 = game.add.tween(elem.scale).to({
            x:(scaleRatio/5.6), y:(scaleRatio/5.6)
        }, 200, Phaser.Easing.Bounce.InOut, true);

        visible = game.add.tween(elem.position).to({
            x:card_desc.position.x-(gameMem.player.cardPlace[elem.key]-2)*cardsArrWidth[elem.key],y:card_desc.position.y
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

                // bigText.alpha = 1
// steps for game
                if(yourType[0]==enemType[0]){
                    // bigText.text ="Ничья! \n\""+yourTypeText+" "+yourName+"\" не может победить \""+enemTypeText+" "+enemName+"\""+"\nурон противнику: "+yourAttack
                    this.knock(cardsArr[YOUR_CARD[0] ],EnemyCard,'double',enemAttack)
                    this.knock(EnemyCard,cardsArr[YOUR_CARD[0] ],'enemy',yourAttack)
                        
                }else if(yourType[1]==enemType[0]){
                    // bigText.text ="Победа за вами! \n\""+yourTypeText+" "+yourName+"\" "+yourAttackText+" \""+enemTypeText+" "+enemName+"\""+"\nурон противнику: "+yourAttack
                    this.knock(cardsArr[YOUR_CARD[0] ],EnemyCard,false,yourAttack)
                        
                }else{
                    // bigText.text ="В этот раз не повезло! \n\""+enemTypeText+" "+enemName+"\" "+enemAttackText+" \""+yourTypeText+" "+yourName+"\""+"\nурон Вам: "+enemAttack
                    this.knock(EnemyCard,cardsArr[YOUR_CARD[0] ],'enemy',enemAttack)
                        
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
        cards.remove(cardsArrText[obj.key])
        cards.remove(cardsArrText2[obj.key])
        // game.world.moveDown(cardsArr[obj.key])
        // game.world.bringToTop(cardsArrText[obj.key])
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

            obj.position.x=card_desc.position.x-(gameMem.player.cardPlace[obj.key]-2)*cardsArrWidth[obj.key]; 

            obj.position.y=card_desc.position.y; 

            // obj.position.copyFrom(card_desc.position); 
            // obj.anchor.setTo((gameMem.player.cardPlace[obj.key]-1)-card_desc.anchor.x, card_desc.anchor.y); 
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
                obj.position.x=card_desc.position.x-(gameMem.player.cardPlace[obj.key]-2)*cardsArrWidth[obj.key]; 
                obj.position.y=card_desc.position.y; 
            }            
        }

        

    },
    knock:function(elem,enemy,whose,attack){
    
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
                            gameMem.enemy.hp-=attack

                            cardsArrText[elem.key].visible=0
                            cardsArrText2[elem.key].visible=0
                        }else{
                            // enemy.position.copyFrom(0,card_desc.position.y+100); 
                            // enemy.anchor.setTo(card_desc.anchor.x, card_desc.anchor.y);                       
                            Card.remove(enemy.key,gameMem.game.cards,gameMem.player.cardPlace)
                            elem.position.x=EnemyPosition;                   
                            elem.visible = 0

                            Card.addFirst(enemy.key,gameMem.stack.cards)
                            enemy.visible=0
                            gameMem.player.hp-=attack

                            cardsArrText[enemy.key].visible=0
                            cardsArrText2[enemy.key].visible=0
                        }   
                            // ENEMYText[elem.key].visible=0
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
                            return true
                    })
                })
            })
        })
    }

};

var WIN = { 
    preload: function (){},
    create: function (){
        if(user.tochest!=0)user.tochest--

        ingame.stop();
        salary=15
        if(win){
            button = this.add.button(window.innerWidth/2, window.innerHeight/2, 'win', this.inMenu, this);
            button.scale.setTo(scaleRatio/1.2, scaleRatio/1.2);
            LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "Победа!\nВаша награда "+salary+" золотых"+(user.tochest==0?"\nСтандартный сундук":""), style);
            LoadingText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);

            user.golds+=salary
            user.exp+=15
            MoSql.set('user',user)
        }
        else{
            button = this.add.button(window.innerWidth/2, window.innerHeight/2, 'lose', this.inMenu, this);
            button.scale.setTo(scaleRatio/1.2, scaleRatio/1.2);
            LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "Неудача", style);
            LoadingText.scale.setTo(scaleRatio/2.3, scaleRatio/2.3);
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
