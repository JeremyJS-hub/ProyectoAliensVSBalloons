//Clase para crear el ufo
var ufoValue;
var ufoAttributes = {
    helioTank: 100,
    helioTankText: '',
    explotion: '',
    score: 0,
    scoreText: '',
    velocity: 6,
    weapon: '',
    laser: '',
    timeBullet: 0,
    ufoActions: {
        UP: '',
        DOWN: '',
        SHOOT:'',
        PAUSE: ''
    }
} 
var context;

class Ufo {

    constructor(context) {
        if (Ufo.exists) {
            Ufo.instance.ufoValue = context.physics.add.image(850, 300, "ufo");
            Ufo.instance.ufoValue.setCollideWorldBounds(true);
            return Ufo.instance;
        }

        Ufo.exists = true;
        this.ufoValue = context.physics.add.image(850, 300, "ufo");
        this.exists = true;
        this.context = context;
        this.ufoAttributes = ufoAttributes
        this.ufoValue.setCollideWorldBounds(true);
        Ufo.instance = this;
        
        return Ufo.instance;
    }

}