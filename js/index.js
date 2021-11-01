const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };
  
  // WELCOME SCREEN
  const buildWelcomeScreen = () => {
    buildDom(`
    <div class="welcomeScreen">
    <h1>This is the Welcome Screen</h1>
    <button id="start-button">START GAME</button>
    <br />
    <div>
    <h3>Instructions</h3>
    </div>

    </div>
    `);
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", buildGameScreen);
  };
  
  // GAME SCREEN
  const buildGameScreen = () => {
    buildDom(`
    
    <div class="counter">
        <p class="livesCount"> Lives = 0 </p>
    </div>
    <div id="game-board">
    <canvas id="canvas" width="900" height="900"></canvas>
    </div>  
    <button id="end-button">End Game</button>
    `);
  
    const endButton = document.getElementById("end-button");
    endButton.addEventListener("click", buildGameOverScreen);
  
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
  
    const restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
  };
  
  // When the window loads, then we will run the "buildSplashScreen" function
  // "load" waits for the html and JS
  window.addEventListener("load", buildWelcomeScreen);
  