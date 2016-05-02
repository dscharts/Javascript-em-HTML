var game =  new Phaser.Game(400, 490);
var randomX = Math.floor((Math.random() * 400) + 1);
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
        this.cano = game.add.sprite(randomX, randomY, 'cano');
        
        game.physics.arcade.enable(this.passaratcho);
        game.physics.arcade.enable(this.cano);
        
        this.passaratcho.body.gravity.y = 1000;
        this.cano.body.gravity.x = -350;
        
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        space.onDown.add(this.jump, this);
    },
    
    update: function() {
      
        if (this.passaratcho.y > 490 || this.passaratcho.y < -45) {
            this.restartGame();
    } else if (this.passaratcho.y >= this.cano.y - 25 && this.passaratcho.x >= this.cano.x - 25 && this.passaratcho.x <= this.cano.x + 25) {
            this.restartGame();
    }
        
        if (this.cano.x < -15) {
            this.cano.x = 415;
        }
            
    },
    
    restartGame: function() {
        game.state.start('main');
    },
    
    jump: function() {
        this.passaratcho.body.velocity.y = -350;
    }
}

game.state.add('main', state);
game.state.start('main');