//Trabaja aqui Carlos
// https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Graphics.html - revisa por si te sirve
//https://developer.mozilla.org/es/docs/Games/Tutorials/2D_breakout_game_Phaser/Buttons - revisar por si te sirve
//https://phaser.io/examples/v2/category/text - revisa
var vGlobales = new gVariables();

//Escenas o vistas del juego

//Vista de pausa
var sceneMenuPause = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function sceneMenuPause() {
    Phaser.Scene.call(this, { key: "sceneMenuPause" });
  },

  preload: function () {},

  create: function () {
    this.add.text(500, 550, "Juego Pausado", {
      color: "#000",
      backgroundColor: "#fff",
      fontSize: 25,
      padding: 10,
    });

    resume = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    resume.on("down", (event) => {
      this.scene.stop();
      this.scene.resume("scenePlayGame");
    });
  },

  update: function (time, delta) {},
});

//Vista de juego ganado
var sceneWon = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function sceneWon() {
    Phaser.Scene.call(this, { key: "sceneWon" });
  },

  //Esta objeto init ejecuta una funcion que recibe
  //datos desde donde se llama la escena
  //Aplica para esta escena, debe uncluir si es necesario este
  //objeto en otras escenas
  init: function (data) {
    this.time = data.time;
    this.score = data.score;
  },

  preload: function () {},

  create: function () {
    this.add.text(500, 350, "Has ganado", {
      color: "#000",
      backgroundColor: "#fff",
      fontSize: 25,
      padding: 10,
    });
    this.add.text(500, 450, "Puntuacion: " + this.score, {
        color: "#000",
        backgroundColor: "#fff",
        fontSize: 25,
        padding: 10,
      });
      this.add.text(500, 550, "Tiempo: " + this.time, {
        color: "#000",
        backgroundColor: "#fff",
        fontSize: 25,
        padding: 10,
      });
  },

  update: function (time, delta) {},
});

//Vista de juego perdido
var sceneLose = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function sceneLose() {
    Phaser.Scene.call(this, { key: "sceneLose" });
  },

  init: function (data) {
    this.reasonLose = data.rl;
    this.time = data.time;
    this.score = data.score;
  },

  preload: function () {},

  create: function () {
    this.add.text(
      400,
      350,
      "La nave a explotado por \n" +
        this.reasonLose +
        "\nPresione ENTER para volver a jugar",
      {
        color: "#000",
        backgroundColor: "#fff",
        fontSize: 20,
        padding: 10,
      }
    );
    this.add.text(500, 450, "Puntuacion: " + this.score, {
      color: "#000",
      backgroundColor: "#fff",
      fontSize: 25,
      padding: 10,
    });
    this.add.text(500, 550, "Tiempo: " + this.time, {
      color: "#000",
      backgroundColor: "#fff",
      fontSize: 25,
      padding: 10,
    });

    resume = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    resume.on("down", (event) => {
      this.scene.stop();
      this.scene.stop('scenePlayGame');
      this.scene.launch("scenePlayGame");
    });
  },

  update: function (time, delta) {},
});

//Vista de comenzar juego
var sceneStartGame = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function sceneStartGame() {
    Phaser.Scene.call(this, { key: "sceneStartGame" });
  },

  preload: function () {},

  create: function () {
    this.add.text(400, 350, "Presione ENTER para \n comenzar juego", {
      color: "#000",
      backgroundColor: "#fff",
      fontSize: 20,
      padding: 10,
    });
    resume = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    resume.on("down", (event) => {
      this.scene.stop();
      this.scene.launch("scenePlayGame");
    });
  },

  update: function (time, delta) {},
});

export { sceneMenuPause as default, sceneWon, sceneLose, sceneStartGame};
