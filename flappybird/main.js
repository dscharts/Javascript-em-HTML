var game =  new Phaser.Game(400, 490);

var randomHole = Math.floor(Math.random() * 5) + 1;
var randomY = Math.floor((Math.random() * 490) + 1);

var state = {
    preload: function() {
        game.load.image('passaratcho', 'figures/bird.png');
        game.load.image('cano', 'figures/pipe.png');
    },
    
    create: function() {
        game.stage.backgroundColor = '#71c5cf';
        
        game.physics.startSystem(Phaser.Physics.ARCADE); 
        
        this.passaratcho = game.add.sprite(100, 120, 'passaratcho');
        
        game.physics.arcade.enable(this.passaratcho);
        
        this.passaratcho.body.gravity.y = 1000;
        
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        space.onDown.add(this.jump, this);
        
        this.cano = game.add.group();
        
        this.timer = game.time.events.loop(1500, this.addCano(), this);
    },
    
    update: function() {
      
        if (this.passaratcho.y > 490 || this.passaratcho.y < -45) {
            this.restartGame();
        } 
            
    },
    
    restartGame: function() {
        game.state.start('main');
    },
    
    jump: function() {
        this.passaratcho.body.velocity.y = -350;
    },
    
    addSquare: function(x, y) {
        var square = game.add.sprite(x,y,'square');
    
        this.cano.add(square);
    
        game.physics.arcade.enable(square);
    
        square.body.velocity.x = -200;
    
        square.checkWorldBounds = true;
        square.outOfBoundsKill = true;
    },

    addCano: function() {
        var hole = Math.floor(Math.random() * 5) + 1;
        
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.addSquare(400,10 + 1*60);
}

game.state.add('main', state);
game.state.start('main');