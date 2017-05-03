
var Menu = 
{ 
    preload: function () 
    { 
    }, 
    create: function () 
    {         
        Menu.physics.startSystem(Phaser.Physics.ARCADE);
        Menu.stage.backgroundColor = '#c7996c';
        // Создаём и добавляем кнопку в нашу игру. Спрайтом будет 
        // игровой лого для меню 
        // Аргументы: X, Y, имя изображения (см. выше), функция обработки клика 
        this.add.button(window.innerWidth/3.5, window.innerHeight/2, 'start', this.startGame, this); 
    }, 
    startGame: function () 
    { 
        // Меняем состояние "Меню" на состояние "Игра" 
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
        timer.add(3000, this.inMenu, this);
        timer.start();

        // this.add.button(0, 0, 'back', this.inMenu, this); 
    }, 
    update: function () 
    { 
    }, 
    render: function () 
    { 
        game.debug.text("Time until event: " + timer.duration.toFixed(0), 10, 20);
    }, 
    onDragStart: function(obj) {

        if ((tween !== null && tween.isRunning) || obj.scale.x === 1)
        {
            return;
        }
        tween = Game.add.tween(obj.scale).to( { x: 3, y: 3 }, 10, Phaser.Easing.Elastic.Out, true);
    },
    inMenu: function (obj) {
        this.state.start('Menu'); 
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
