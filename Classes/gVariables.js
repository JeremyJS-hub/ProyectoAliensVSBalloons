var context = '';
//variable que contendra el asset ufo
var ufo = '';

//tiempo que transcurre en el juego
var timeElapsed = {
  minutes: 0,
  seconds: 0,
  timeElapsedText: "",
};

//Globos
var blg;
var blcreator;
var timebl;
var blcontainer;
var bExplotion = '';
var blloons = ['bRed', 'bBlue', 'bRose', 'bBlue', 'bPurple', 'bBlue', 'bYellow', 'bBlue', 'bGreen']

//configunarion de texto del HUD
var textConfig = {
  color: "#ffff",
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
var bullet2;
var bulletAmount = null;
var reloading = false;
var timer;
var timer2 = null;
//variables del background del escenario
var bgGame = '';
var sun;
var moon;
var cloud;
var bgScenes = ['cDia', 'cNoche', 'skyDia', 'skyNoche']