const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };
  
  // WELCOME SCREEN
  const buildWelcomeScreen = () => {
    buildDom(`
    <div class="welcomescreen">
    <h1 class="gametitle">PIRATES OF THE CARIBBEAN</h1>
    <h1 class="startheader blinkme">PRESS ENTER TO START THE GAME<h1>
    <br/>
    </div>
    `);
    

    document.addEventListener('keyup', event => {
      if (event.code === 'Enter') {
        buildGameScreen()
      }
    })

  };
  
  // GAME SCREEN
  const buildGameScreen = () => {
    buildDom(`
    <div class="gamescreen">
    <div class="lives"></div>
    <div class="score"></div>
    <div id="game-board" class="gameboard">
    <canvas id="canvas" width="900" height="900"></canvas> 
    </div>  
    </div>
  
    `);
  
   
  
    const game = new Game();
    game.start();
  };
  
  // GAMEOVER SCREEN
  const buildGameOverScreen = () => {
    buildDom(`
    <section class="game-over">
    <h1>Game Over</h1>
    <button id = "game"> TRY AGAIN</button>
    <div class= "pointer"> </div>
    </section>
    `);
  
    document.addEventListener('keyup', event => {
      if (event.code === 'Enter') {
        buildWelcomeScreen()
      }
    })

  };
  
  // When the window loads, then we will run the "buildSplashScreen" function
  // "load" waits for the html and JS
  window.addEventListener("load", buildWelcomeScreen);
  