var vGlobales = new gVariables();

//Funciones principales

//funcion que muestra el hud
function HUD() {
  timeElapsed.timeElapsedText = context.add.text(425, 1, "00:00", textConfig);

  ufo.ufoAttributes.scoreText = context.add.text(
    1,
    1,
    ufo.ufoAttributes.score + " pts",
    textConfig
  );

  ufo.ufoAttributes.helioTankText = context.add.text(
    840,
    1,
    ufo.ufoAttributes.helioTank,
    textConfig
  );

  limits.textLimitYA = context.add.text(700, 50, "", textLimitConfig);
  limits.textLimitYB = context.add.text(700, 550, "", textLimitConfig);
}

//Funcion que controla los globos
function balloonsController() {
  /* 
    Eric trabaja aqui 
 
    //4. Los globos emergen aleatoriamente desde la parte inferior de la pantalla, y suben hasta
    //    desaparecer de la pantalla. Los colores de los globos también son aleatorios.
    https://phaser.io/examples/v2/arcade-physics/group-vs-group - chequea esto, para geenerar los globos mediante group() - agregalo a la funcion createBulletLaserAndBallons();
    //Para crear globos (chequea las variables de globos en gVariables y el color en preload(), esta es una de ejemplo):
      bExample = new Balloon(context, {
        color: 'bExample',
      });

    //bExample.balloonValue.y - posision en y - numero que disminuye para el efecto de ascender
    
    //bExample.balloonValue.y = bExample.balloonValue.y - bExample.balloonAttributes.velocity //para hacer que  ascienda el globo
    
    //5. La velocidad de los globos es aleatoria, los azules deben subir más rápido. 
        
    se establece con la creacion del globo, solo tiene que poner una de las variables de globo como color, por ejemplo bBlue = azul, bRed = rojo

    */
}

//Funcion que controla al ufo
function ufoController() {
  if (ufo.ufoAttributes.ufoActions.UP.isDown) {
    ufo.ufoValue.y = ufo.ufoValue.y - ufo.ufoAttributes.velocity;
    ufo.ufoAttributes.weapon.y = ufo.ufoValue.y;
    showLimits();
    endGame("limitCollision");
  } else if (ufo.ufoAttributes.ufoActions.DOWN.isDown) {
    ufo.ufoValue.y = ufo.ufoValue.y + ufo.ufoAttributes.velocity;
    ufo.ufoAttributes.weapon.y = ufo.ufoValue.y;
    showLimits();
    endGame("limitCollision");
  } else if (ufo.ufoAttributes.ufoActions.SHOOT.isDown) {
    console.log('shooting');
    /*if (context.time.now > ufo.ufoAttributes.timeBullet) {
      bullet = ufo.ufoAttributes.laser.getFirstAlive(false);

      if (bullet) {
        console.log(bullet);
        bullet.visible = true;
        ufo.ufoAttributes.timeBullet = context.time.now + 150;
      }
    }*/
  } else {
    return;
  }
}

//funcion que controla el tiempo de juego
function timePlaying() {
  timeElapsed.minutes = Math.floor(parseInt(timer.getElapsedSeconds()) / 60);
  timeElapsed.seconds = parseInt(timer.getElapsedSeconds()) % 60;
  timeElapsed.timeElapsedText.setText(
    timeElapsed.minutes.toString().padStart(2, "0") +
      ":" +
      timeElapsed.seconds.toString().padStart(2, "0")
  );
  if (parseInt(timer.getElapsedSeconds()) === 360) {
    endGame("timedOut");
  } else {
    /**
     * Yonaiky trabaja aqui
     * 8. Por cada 10 segundos que pasen, la nave pierde 5 puntos en la cantidad de helio disponible
     *    para la nave.
     * parseInt(timer.getElapsedSeconds()) - para obtener tiempo transcurrido en segundos
     * ufo.ufoAttributes.helioTank - obtener helio - por defecto 100 - disminuir segun el mandato
     *ufo.ufoAttributes.helioTankText.setText(ufo.ufoAttributes.helioTank) - para mostrar en pantalla
     *
     * 9.Si la cantidad de helio llega a cero, la nave explota y termina el juego con Game Over.
     * ufo.ufoAttributes.helioTank - si es igual a 0 ejecutar endGame('helioTankEmpty')
     */
  }
}

//controles de funciones de escena como pausar
function sceneController() {
  ufoAttributes.ufoActions.PAUSE.on("down", (event) => {
    if (ufo.ufoAttributes.ufoActions.PAUSE !== 0) {
      context.scene.launch("sceneMenuPause");
      context.scene.pause();
    } else {
      return;
    }
  });
}

/**
 *     ufo.ufoAttributes.laser = context.physics.add.sprite(
        ufo.ufoValue.x - 135,
        ufo.ufoValue.y,
        "laserBullet"
      );
 */
//Funciones secundarias

//funcion que controla la puntuacion
function scoringController() {
  //Ricardo trabaja aqui
  /*
    10. Los globos azules aumentan la cantidad de helio en 10 puntos, los demás la aumentan en 1
        punto. 

        //ufo.ufoAttributes.helioTank - cantidad de helio - por defecto 100 - aumentar segun los globos que explotan si es menor a 101
        https://phaser.io/examples/v2/arcade-physics/group-vs-group - chequea para la colision entre el globo y el laser
        chequear variables de globos en gVariables y en funcion preload():
        globoAzul = bBlue \ ufo.ufoAttributes.helioTank = ufo.ufoAttributes.helioTank + 10
        globoRojo = bRed \ ufo.ufoAttributes.helioTank = ufo.ufoAttributes.helioTank + 1
        globoMorado = bPurple \ ufo.ufoAttributes.helioTank = ufo.ufoAttributes.helioTank + 1
        globoAmarillo = bYellow \ ufo.ufoAttributes.helioTank = ufo.ufoAttributes.helioTank + 1
        globoRosado = bRose \ ufo.ufoAttributes.helioTank = ufo.ufoAttributes.helioTank + 1
        globoVerde = bGreen \ ufo.ufoAttributes.helioTank = ufo.ufoAttributes.helioTank + 1
        


    11. Cuando la nave logre un total de 500 puntos en la cantidad de helio, se pasa al siguiente
        nivel. no hecho - Ricardo
        
        //ufo.ufoAttributes.score - puntuacion - por defecto 0 - aumentar segun los globos que explotan

        chequear variables de globos en gVariables y en funcion preload():
        globoAzul = bBlue \ ufo.ufoAttributes.score = ufo.ufoAttributes.score + 20
        globoRojo = bRed \ ufo.ufoAttributes.score = ufo.ufoAttributes.score + 10
        globoMorado = bPurple \ ufo.ufoAttributes.score = ufo.ufoAttributes.score + 10
        globoAmarillo = bYellow \ ufo.ufoAttributes.score = ufo.ufoAttributes.score + 10
        globoRosado = bRose \ ufo.ufoAttributes.score = ufo.ufoAttributes.score + 10
        globoVerde = bGreen \ ufo.ufoAttributes.score = ufo.ufoAttributes.score + 10

        //ufo.ufoAttributes.scoreText(ufo.ufoAttributes.score + ' pts') - para mostrar en la pantalla

        //ufo.ufoAttributes.score - puntuacion - verificar si es igual a 500 - ejecutar la funcion endGame('youWon');
    */
}

//funcion para crear  laseres - no terminado
function laserBulletsCreator() {
  ufo.ufoAttributes.laser = context.physics.add.group();
  ufo.ufoAttributes.laser.body = true;
  for (var i = 0; i < 20; i++) {
    bullet = ufo.ufoAttributes.laser.create(0, 0, "bullet");
    bullet.name = "bullet" + i;
    bullet.exists = false;
    bullet.visible = false;
    bullet.checkWorldBounds = true;
  }
}

//funcion que muestra los limites si el ufo se acerca
function showLimits() {
  if (ufo.ufoValue.y < limits.limitYA + 100) {
    limits.textLimitYA.text = "Peligro -----------";
  } else {
    if (limits.textLimitYA.text !== "") {
      limits.textLimitYA.text = "";
    }
  }

  if (ufo.ufoValue.y > limits.limitYB - 100) {
    limits.textLimitYB.text = "Peligro -----------";
  } else {
    if (limits.textLimitYB.text !== "") {
      limits.textLimitYB.text = "";
    }
  }
}

//Funcion que acaba el juego dada la razon
function endGame(reason) {
  if (reason === "limitCollision") {
    if (ufo.ufoValue.y <= limits.limitYA) {
      actionLose("lya");
    } else if (ufo.ufoValue.y >= limits.limitYB) {
      actionLose("lyb");
    } else {
      return;
    }
  } else if (reason === "youWon") {
    context.scene.launch("sceneWon", {
      time: timeElapsed.timeElapsedText.text,
      score: ufo.ufoAttributes.score,
    });
  } else if (reason === "helioTankEmpty") {
    actionLose(reason);
  } else if (reason === "timedOut") {
    actionLose(reason);
  } else {
    return;
  }
  function actionLose(limit) {
    ufo.ufoAttributes.ufoActions.UP = 0;
    ufo.ufoAttributes.ufoActions.DOWN = 0;
    ufo.ufoAttributes.ufoActions.PAUSE = 0;
    ufo.ufoAttributes.explotion = context.physics.add.sprite(
      850,
      ufo.ufoValue.y,
      "explotion"
    );
    ufo.ufoAttributes.explotion.setCollideWorldBounds(true);
    ufo.ufoValue.destroy();
    ufo.ufoAttributes.weapon.destroy();
    ufo.ufoAttributes.explotion.play("explotion");

    if (limit === "lya") {
      context.scene.launch("sceneLose", {
        rl: "llegar al limite superior.",
        time: timeElapsed.timeElapsedText.text,
        score: ufo.ufoAttributes.score,
      });
    } else if (limit === "lyb") {
      context.scene.launch("sceneLose", {
        rl: "llegar al limite inferior.",
        time: timeElapsed.timeElapsedText.text,
        score: ufo.ufoAttributes.score,
      });
    } else if (limit === "helioTankEmpty") {
      context.scene.launch("sceneLose", {
        rl: "agotar el helio.",
        time: timeElapsed.timeElapsedText.text,
        score: ufo.ufoAttributes.score,
      });
    } else if (limit === "timedOut") {
      context.scene.pause();
      context.scene.launch("sceneLose", {
        rl: "tiempo acabado.",
        time: timeElapsed.timeElapsedText.text,
        score: ufo.ufoAttributes.score,
      });
    } else {
      return;
    }
  }
}

//funcion para crear animaciones
function animations() {
  context.anims.create({
    key: "explotion",
    frameRate: 100,
    frames: context.anims.generateFrameNumbers("explotion", {
      start: 0,
      end: 71,
    }),
    repeat: 0,
    hideOnComplete: true,
  });
  context.anims.create({
    key: "bExplotion",
    frameRate: 35,
    frames: context.anims.generateFrameNumbers("bExplotion", {
      start: 0,
      end: 17,
    }),
    repeat: 0,
    hideOnComplete: true,
  });
}

//funcion para crear colisiones y/o traslapaciones entre objetos
function collideAndOverlapObjectsDetecter() {
  /*context.physics.add.collider(
    ufo.ufoAttributes.laser,
    bRed.balloonValue,
    () => {
      ufo.ufoAttributes.laser.destroy();
      bRed.balloonValue.destroy();
    }
  );*/
}

class scenePlayGame extends Phaser.Scene {
  constructor() {
    super({ key: "scenePlayGame" });
  }

  preload() {
    //images
    this.load.image("bgSky", "./images/bgSky.png");

    //sprites
    this.load.image("ufo", "./images/ufo.png");
    this.load.image("weapon", "./images/weapon.png");
    this.load.image("bullet", "./images/laser.png");
    this.load.image("bRed", "./images/g-rojo.png");
    this.load.image("bBlue", "./images/g-azul.png");
    this.load.image("bYellow", "./images/g-amarillo.png");
    this.load.image("bGreen", "./images/g-verde.png");
    this.load.image("bRose", "./images/g-rosa.png");
    this.load.image("bPurple", "./images/g-morado.png");

    //spritesheet
    this.load.spritesheet("explotion", "./images/explotion.png", {
      frameWidth: 92.77777777,
      frameHeight: 90,
    });

    this.load.spritesheet("bExplotion", "./images/balloonExplote.png", {
      frameWidth: 90,
      frameHeight: 90,
    });
  }

  create() {
    context = this;
    //background del juego
    bgGame = context.add.image(450, 300, "bgSky");
    
    animations();
    timer = context.time.addEvent({ delay: 360000 });
    
    //objetos fisicos del juego
    ufo = new Ufo(context);
    ufo.ufoAttributes.weapon = context.add.image(
      ufo.ufoValue.x - 55,
      ufo.ufoValue.y - 5,
      "weapon"
      );
      
      //limites de la fisica
    context.physics.world.setBounds(0, 50, 900, 525, false, false, true, true);
    
    //gamepad
    ufo.ufoAttributes.ufoActions.UP = context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    ufo.ufoAttributes.ufoActions.DOWN = context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
      );
    ufo.ufoAttributes.ufoActions.SHOOT = context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
      );
      ufo.ufoAttributes.ufoActions.PAUSE = context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
      );
    
    bRed = new Balloon(context, {
      color: "bRed",
      velocity: 2,
      explotion: "",
    });
    bBlue = new Balloon(context, {
      color: "bBlue",
      velocity: 2,
      explotion: "",
    });

    HUD();
    sceneController();
    //collideAndOverlapObjectsDetecter();
  }
  
  update(time, delta) {
    context = this;
    ufoController();
    balloonsController();
    scoringController();
    timePlaying();
    //laserBulletsCreator();
    /** bullet.x = ufo.ufoAttributes.laser.x - 3;
    bullet.y = ufo.ufoValue.y; */
  }
}

//Exports
export { scenePlayGame as default };
