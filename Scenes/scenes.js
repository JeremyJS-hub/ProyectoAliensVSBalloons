//Trabaja aqui Carlos
// https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Graphics.html - revisa por si te sirve
//https://developer.mozilla.org/es/docs/Games/Tutorials/2D_breakout_game_Phaser/Buttons - revisar por si te sirve
//https://phaser.io/examples/v2/category/text - revisa
var vGlobales = new gVariables();

var inicio = new Audio('audio/inicio1.mp3');
var menu_pausa = new Audio('audio/menu_pausa.ogg');

//Escenas o vistas del juego

//Vista de pausa
class sceneMenuPause extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneMenuPause' })
    }

    init(data) {

    }

    preload() {}

    create() {
        this.add.text(500, 550, "Juego Pausado", {
            color: "#000",
            backgroundColor: "#fff",
            fontSize: 25,
            padding: 10,
        });

        stopAudio(inicio);
        PlayAudio(menu_pausa);
        resume = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        resume.on("down", (event) => {
            stopAudio(menu_pausa);
            PlayAudio(inicio);
            this.scene.stop();
            this.scene.resume("scenePlayGame");
        });
    }

    update(timer, delta) {}
}

//Vista de juego ganado
class sceneWon extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneWon' })
    }

    init(data) {
        this.time = data.time;
        this.score = data.score;
    }

    preload() {}

    create() {
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
    }

    update(timer, delta) {}
}

//Vista de juego perdido
class sceneLose extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneLose' })
    }

    init(data) {
        this.reasonLose = data.rl;
        this.time = data.time;
        this.score = data.score;
    }

    preload() {}

    create() {
        this.add.text(
            400,
            350,
            "La nave a explotado por \n" +
            this.reasonLose +
            "\nPresione ENTER para volver a jugar", {
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

        PlayAudio(menu_pausa);
        stopAudio(inicio);
        resume = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        resume.on("down", (event) => {

            PlayAudio(inicio);
            stopAudio(menu_pausa);
            bullet2 = null
            this.scene.stop();
            this.scene.stop('scenePlayGame');

            this.scene.start("scenePlayGame", {
                bg: bgScenes[Math.floor(Math.random() * (4 - 0)) + 0]
            });
        });
    }

    update(timer, delta) {}
}

//Vista de comenzar juego
class sceneStartGame extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneStartGame' })
    }
    preload() {}

    create() {
        this.add.text(400, 350, "Presione ENTER para \n comenzar juego", {
            color: "#000",
            backgroundColor: "#fff",
            fontSize: 20,
            padding: 10,
        });

        resume = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        PlayAudio(menu_pausa);

        resume.on("down", (event) => {

            PlayAudio(inicio);
            stopAudio(menu_pausa);
            this.scene.start("scenePlayGame", {
                bg: bgScenes[Math.floor(Math.random() * (4 - 0)) + 0]
            });
        });
    }
    update(timer, delta) {}
}

function PlayAudio(audio) {
    audio.play();
    audio.currentTime = 0;
}

function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

export { sceneMenuPause as default, sceneWon, sceneLose, sceneStartGame };