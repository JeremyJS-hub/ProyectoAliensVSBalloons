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

  ufo.ufoAttributes.laserText = context.add.text(
    1,
    550,
    "Balas:" +
      ufo.ufoAttributes.laser.children.size +
      "/" +
      ufo.ufoAttributes.laser.children.size,
    textConfig
  );

  limits.textLimitYA = context.add.text(700, 50, "", textLimitConfig);
  limits.textLimitYB = context.add.text(700, 550, "", textLimitConfig);
}

//Funcion que controla los globos
function balloonsController() {
  /**
   * Eric trabaja aqui - actualizacion de indicaciones
   *
   * 4. Los globos emergen aleatoriamente desde la parte inferior de la pantalla, y suben hasta
   *    desaparecer de la pantalla. Los colores de los globos también son aleatorios.
   *
   * Debes crear un grupo de globos en la funcion laserBulletAndBallonsCreator()
   * la variable que contiene al grupo de globos es blg
   * - guiate del grupo de lasers de arriba es igual
   * solo que en create donde dice bullet pones esto: blloons[Math.round(Math.random() * (8 - 0)) + 0]
   * y en 20 pones 30
   *
   * luego aqui continuas con el movimiento hacia arriba - guiate en la funcion ufoController()
   * dentro esta la funcion actionShoot() y usa las variables de globos en gVariables
   *
   * 
   */
}
bullet

//Funcion que controla al ufo
function ufoController() {
  if (ufo.ufoAttributes.ufoActions.UP.isDown) {
    ufo.ufoValue.y = ufo.ufoValue.y - ufo.ufoAttributes.velocity;
    ufo.ufoAttributes.weapon.y = ufo.ufoValue.y;
    showLimits();
    endGame("limitCollision");
    if (ufo.ufoAttributes.ufoActions.SHOOT.isDown) {
      actionShoot();
    }
  } else if (ufo.ufoAttributes.ufoActions.DOWN.isDown) {
    ufo.ufoValue.y = ufo.ufoValue.y + ufo.ufoAttributes.velocity;
    ufo.ufoAttributes.weapon.y = ufo.ufoValue.y;
    showLimits();
    endGame("limitCollision");
    if (ufo.ufoAttributes.ufoActions.SHOOT.isDown) {
      actionShoot();
    }
  } else if (ufo.ufoAttributes.ufoActions.SHOOT.isDown) {
    actionShoot();
  } else if (ufoAttributes.ufoActions.RELOAD.isDown) {
    if (timer2 === null) {
      if (
        ufo.ufoAttributes.laser.getTotalUsed() ===
        ufo.ufoAttributes.laser.children.size
      ) {
        timer2 = context.time.addEvent({
          delay: 3000,
          callback: reloadBullets,
        });
        reloading = true;
        bulletAmount = null;
      }
    } else {
      ufo.ufoAttributes.laserText.setText("Recargando...");
    }
  } else {
  }

  function reloadBullets() {
    ufo.ufoAttributes.laser.children.each((bullet) => {
      bullet.visible = false;
      bullet.active = false;
    }, this);
    timer2 = null;
    reloading = false;
    ufo.ufoAttributes.laserText.setText(
      "Balas: " +
        ufo.ufoAttributes.laser.children.size +
        "/" +
        ufo.ufoAttributes.laser.children.size
    );
    //agregar efecto de sonido de recarga aqui
  }

  function actionShoot() {
    if (context.time.now > ufo.ufoAttributes.timeBullet) {
      bullet2 = ufo.ufoAttributes.laser.getFirstDead(false);
      if (bullet2) {
        bullet2.body.reset(ufo.ufoValue.x - 130, ufo.ufoValue.y);
        bullet2.visible = true;
        bullet2.active = true;
        bullet2.body.velocity.x = -1000;
        ufo.ufoAttributes.timeBullet = context.time.now + 300;

        if (bulletAmount === null) {
          bulletAmount = ufo.ufoAttributes.laser.children.size;
        }
        ufo.ufoAttributes.laserText.setText(
          "Balas: " +
            ufo.ufoAttributes.laser.children.size +
            "/" +
            (bulletAmount -= 1)
        );
        //agregar efecto de sonido de disparos aqui
      }
      if (
        ufo.ufoAttributes.laser.getTotalUsed() ===
          ufo.ufoAttributes.laser.children.size &&
        reloading === true
      ) {
        ufo.ufoAttributes.laserText.setText("Recargando...");
      } else if (
        ufo.ufoAttributes.laser.getTotalUsed() ===
          ufo.ufoAttributes.laser.children.size &&
        reloading === false
      ) {
        ufo.ufoAttributes.laserText.setText(
          "Galushi se ha quedado sin balas, R para recargar"
        );
      } else {
      }
    }
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

//funcion que controla la puntuacion
function scoringController(collider1, collider2) {
  /** Esta funcion se ejecuta en la funcion collideAndOverlapObjectsDetecter() dentro del primer add.collider() y recibe los parametros:
   *  collider1 y collider2 que son los objetos que colisionan (en este caso son los globos(collider1) y los laseres(collider2))
   *
   * Ricardo trabaja aqui - actualizacion de indicaciones
   *
   * 10. Los globos azules aumentan la cantidad de helio en 10 puntos, los demás la aumentan en 1
   *      punto.
   *
   * ufo.ufoAttributes.helioTank - cantidad de helio - por defecto 100 - aumenta segun los globos que explotan y si es menor o igual a 100
   *
   * chequear si collider1.texture.key es igual a (es un string):
   * bBlue \ ufo.ufoAttributes.helioTank += 10
   * bRed \ ufo.ufoAttributes.helioTank +=  1
   * bPurple \ ufo.ufoAttributes.helioTank += 1
   * bYellow \ ufo.ufoAttributes.helioTank += 1
   * bRose \ ufo.ufoAttributes.helioTank += 1
   * bGreen \ ufo.ufoAttributes.helioTank += 1
   *
   * Actualiza en pantalla el helio con: ufo.ufoAttributes.helioTankText.setText(ufo.ufoAttributes.helioTank) //esto es de prueba hasta que se agrege la barra de progreso en la pantalla
   *
   * 11. Cuando la nave logre un total de 500 puntos en la cantidad de helio, se pasa al siguiente
   *      nivel.
   *
   * ufo.ufoAttributes.score - puntuacion - por defecto 0 - aumentar segun los globos que explotan
   *
   * chequear si collider1.texture.key es igual a:
   * bBlue \ ufo.ufoAttributes.score += 20
   * bRed \ ufo.ufoAttributes.score += 10
   * bPurple \ ufo.ufoAttributes.score += 10
   * bYellow \ ufo.ufoAttributes.score += 10
   * bRose \ ufo.ufoAttributes.score += 10
   * bGreen \ ufo.ufoAttributes.score += 10
   *
   * chequear si ufo.ufoAttributes.score es mayor o igual a 500 ejecutar endGame('youWon')
   *
   * Actualizar score en pantalla con: ufo.ufoAttributes.scoreText(ufo.ufoAttributes.score + ' pts')
   */
}

//funcion para crear  laseres y globos
function laserBulletAndBallonsCreator() {
  ufo.ufoAttributes.laser = context.physics.add.group();
  ufo.ufoAttributes.laser.body = true;
  for (let i = 0; i < 20; i++) {
    blcreator = ufo.ufoAttributes.laser.create(0, 0, "bullet");
    blcreator.visible = false;
    blcreator.active = false;
    blcreator.name = "bullet " + i;
  }

  ufo.ufoAttributes.blg= context.physics.add.group();
  ufo.ufoAttributes.blg.body=true;
  for(let i = 0; i < 30 ; i++){
      blcreator= ufo.ufoAttributes.blg.create(500,610,blloons[Math.round(Math.random() * (8 - 0)) + 0]);
      blcreator= ufo.ufoAttributes.blg.create(400,584,blloons[Math.round(Math.random() * (8 - 0)) + 0]);
      blcreator= ufo.ufoAttributes.blg.create(350,584,blloons[Math.round(Math.random() * (8 - 0)) + 0]);
      blcreator= ufo.ufoAttributes.blg.create(280,600,blloons[Math.round(Math.random() * (8 - 0)) + 0]);
      blcreator= ufo.ufoAttributes.blg.create(600,610,blloons[Math.round(Math.random() * (8 - 0)) + 0]);
      blcreator= ufo.ufoAttributes.blg.create(680,600,blloons[Math.round(Math.random() * (8 - 0)) + 0]);
      
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
    ufo.ufoAttributes.ufoActions.SHOOT = 0;
    ufo.ufoAttributes.ufoActions.RELOAD = 0;
    bulletAmount = null;

    ufo.ufoAttributes.explotion = context.physics.add.sprite(
      850,
      ufo.ufoValue.y,
      "explotion"
    );
    ufo.ufoValue.destroy();
    ufo.ufoAttributes.weapon.destroy();
    ufo.ufoAttributes.explotion.play("explotion");
    //agregar efecto de explosion de nave aqui
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
 /* context.physics.add.collider(
    blg.children.entries,
    ufo.ufoAttributes.laser.children.entries,
    (collider1, collider2) => {
      if (bExplotion === "") {
        bExplotion = context.physics.add.sprite(
          collider1.x,
          collider1.y,
          "bExplotion"
        );
      } else {
        bExplotion.x = collider1.x;
        bExplotion.y = collider1.y;
      }
      scoringController(collider1, collider2);
      collider1.destroy();
      collider2.visible = false;
      collider2.x = 0;
      collider2.y = 0;
      bExplotion.play("bExplotion");
      //agregar efecto de sonido de explosion de globo aqui
    },
    () => {},
    this
  );*/
}

//funcion que determina el background del escenario
function sceneBackground(bg) {
  if (bg === "cDia") {
    var div = document.getElementById("gameContainer");
    div.style.backgroundColor = "#99CCFF";
    bgGame = context.add.image(450, 400, "city");
    cloud = context.add.image(450, -100, "cloudDay");
    cloud.flipY = true;
  } else if (bg === "cNoche") {
    var div = document.getElementById("gameContainer");
    div.style.backgroundColor = "#0f130c";
    bgGame = context.add.image(450, 400, "city");
    cloud = context.add.image(450, -100, "cloudNight");
    cloud.flipY = true;
  } else if (bg === "skyDia") {
    var div = document.getElementById("gameContainer");
    div.style.backgroundColor = "#99CCFF";
    bgGame = context.add.image(450, 300, "cloudDay");
    sun = context.add.image(875, 15, "sun");
  } else if (bg === "skyNoche") {
    var div = document.getElementById("gameContainer");
    div.style.backgroundColor = "#0f130c";
    moon = context.add.image(450, 300, "stars");
    sun = context.add.image(875, 15, "moon");
    bgGame = context.add.image(450, 500, "cloudNight");
  }
}

class scenePlayGame extends Phaser.Scene {
  constructor() {
    super({ key: "scenePlayGame" });
  }

  preload() {
    //images
    this.load.image("sun", "./src/images/scenaryBackground/animeted sun.png");
    this.load.image("cloudDay", "./src/images/scenaryBackground/cloudDay.png");
    this.load.image(
      "cloudNight",
      "./src/images/scenaryBackground/cloudNight.png"
    );
    this.load.image("stars", "./src/images/scenaryBackground/stars.png");
    this.load.image("moon", "./src/images/scenaryBackground/animated moon.png");
    this.load.image("city", "./src/images/scenaryBackground/city.png");

    //sprites
    this.load.image("ufo", "./src/images/ufo.png");
    this.load.image("weapon", "./src/images/weapon.png");
    this.load.image("bullet", "./src/images/laser2.png");
    this.load.image("bRed", "./src/images/g-rojo.png");
    this.load.image("bBlue", "./src/images/g-azul.png");
    this.load.image("bYellow", "./src/images/g-amarillo.png");
    this.load.image("bGreen", "./src/images/g-verde.png");
    this.load.image("bRose", "./src/images/g-rosa.png");
    this.load.image("bPurple", "./src/images/g-morado.png");

    //spritesheet
    this.load.spritesheet("explotion", "./src/images/explotion.png", {
      frameWidth: 92.77777777,
      frameHeight: 90,
    });

    this.load.spritesheet("bExplotion", "./src/images/balloonExplote.png", {
      frameWidth: 90,
      frameHeight: 90,
    });

    this.forceSingleUpdate = true;
  }

  init(data) {
    this.sceneBg = data.bg;
  }

  create() {
    context = this;

    //background del juego
    sceneBackground(context.sceneBg);

    animations();

    //objetos fisicos del juego
    ufo = new Ufo(context);
    ufo.ufoAttributes.weapon = context.add.image(
      ufo.ufoValue.x - 55,
      ufo.ufoValue.y - 5,
      "weapon"
    );

    //limites de la fisica
    context.physics.world.setBounds(0, 0, 900, 550, true, true, true, false);

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
    ufo.ufoAttributes.ufoActions.RELOAD = context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );

    sceneController();
    laserBulletAndBallonsCreator();
    collideAndOverlapObjectsDetecter();
    HUD();

    timer = context.time.addEvent({
      delay: 360000,
      callback: () => {
        //agregar efecto de sonido de explosion de nave aqui
        context.scene.launch("sceneLose", {
          rl: "tiempo acabado.",
          time: timeElapsed.timeElapsedText.text,
          score: ufo.ufoAttributes.score,
        });
      },
    });
    //agregar musica de fondo de gameplay aqui
  }

  update(time, delta) {
    context = this;
    ufoController();
    balloonsController();
    timePlaying();
  }
}

//Exports
export { scenePlayGame as default };
