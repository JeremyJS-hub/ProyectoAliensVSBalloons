let balloonValue;
let balloonAttributes = {
    color: 'bBlue',
    velocity: parseFloat((Math.fround(Math.random() * (2.8 - 2.4)) + 2.4).toString().substr(0, 3)),
    bExplotion: ''
};

class Balloon {    

    constructor(context, attributes) {
        this.balloonValue = context.physics.add.sprite(
          Math.round(Math.random() * (650 - 150)) + 150,
          700,
          attributes.color
        );
        if (attributes === undefined) {
            this.balloonAttributes = balloonAttributes;
        } else {
          if (attributes.color !== 'bBlue') {
            attributes.velocity = parseFloat((Math.fround(Math.random() * (2 - 1.5)) + 1.5).toString().substr(0, 3));
            this.balloonAttributes = attributes;
            return this;
          }
            attributes.velocity = parseFloat((Math.fround(Math.random() * (2.8 - 2.4)) + 2.4).toString().substr(0, 3));
            this.balloonAttributes = attributes;
        }
        return this;
    }

    getBalloonValue(){
        return balloonValue;
    }

    getBalloonAttributes(){
        return balloonAttributes;
    }
    
    setBalloonValue(value){
        this.balloonValue = value;
    }

    setBalloonAttributes(attributes){
        this.balloonAttributes = attributes;
    }
    
}

