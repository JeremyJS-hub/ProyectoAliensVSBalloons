var context = '';
var bgGame = '';
//variable que contendra el asset ufo
var ufo = '';

//tiempo que transcurre en el juego
var timeElapsed = {
  minutes: 0,
  seconds: 0,
  timeElapsedText: "",
};
var timer
//Globos y sus atributos
var bRed;
var bBlue;
var bRose;
var bPurple;
var bYellow;
var bGreen;

//configunarion de texto del HUD
var textConfig = {
  color: "#000",
  fontSize: 25,
  padding: 10,
};

//configuracion de texto limites
var textLimitConfig = {
  color: "#FF0000",
  fontSize: 25,
};

//limites hasta donde no debe llegar el ufo
var limits = {
  limitYA: 85,
  limitYB: 540,
  textLimitYA: "",
  textLimitYB: "",
};

class gVariables{
    constructor(){
        if (gVariables.exists) {
            return gVariables.instance;
        }
        gVariables.exists = true
        gVariables.instance = this;
        return gVariables.instance;
    }
}

var resume = '';
var bullet;
var executed = false;