# GAME PROJECT ONE - PIRATES OF THE CARIBBEAN

# HOW DOES IT WORK?

The game screen has a canvas 600x600 that will be the game scenario. In this scenario we will have a player that has the ability to shot and 3 diferent elements will be coming from the bottom of the canvas. 

Player : Pirate ship. It can be moved 4 directions with the screen arrows.(Up, Down, Right, Left). It can shoot with the space bar. 

Elements that will be appearing on the screen: 

1. Barrel: It can't be destroyed by shooting it, if player colides with it you lose 1 life. 

2. Shark: It can be destroyed by shooting it,if you do it you get +10 score points. If player colides with it you lose 1 life.

3. Pirate: It can be destroyed by shooting it, if you do it you lose 1 life. If player colides with it you get +50 score points. 

Player starts with 5 lifes. Game ends when you miss them. These 5 lifes are displayed on the top-left side of the screen with heart images that decrease when you lose one. Score counter is located on the top-right side of the screen.

# HOW IS IT ORGANIZED? 

- Start screen: Welcoming screen with title and eventlistener (enter) to proceed to the GameScreen. 

- Game screen: Canvas. When you lose all the lifes you go automatically to the game Over screen. Music is playing every time the game screen is displayed

- GameOver screen: You get displayed what was your end score and you get the chance to restart the game by pressing enter. 







