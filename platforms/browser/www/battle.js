
var CardsMenu = 
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
