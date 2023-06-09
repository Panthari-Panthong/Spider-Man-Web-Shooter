window.addEventListener('load', () => {
    const gameIntro = document.querySelector('.game-intro')
    gameIntro.style.display = 'block'

    const gameBoard = document.querySelector('#game-board')
    gameBoard.style.display = 'none'

    const gameOverDiv = document.querySelector('.game-over')
    gameOverDiv.style.display = 'none'

    const result = document.querySelector('#result')
    const totalScore = document.querySelector('#score')

    const textBtn = document.getElementById('mute') 
    textBtn.innerText = 'mute'

    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    const playerHeath = 20
    const enemyHeath = 20

    // constructor(x,y,height,width,heath,weaponSpeed)
    const player = new Player(canvas.width/4,canvas.height/2,100,130,playerHeath,15)

    // constructor(x,y,height,width,heath,weaponSpeed)
    const enemy = new Player(canvas.width/2+canvas.width/4,canvas.height/2,170,170,enemyHeath,20)
 
    const webs = []
    const bombs = []
    
    let animateId
    let gameOver = false

    //Spiderman
    const drawPlayer = () => {
        ctx.drawImage(playerImg,player.x,player.y,player.width,player.height);

        //Draw a web after click spacebar
        webs.forEach((web, index) => {
            ctx.drawImage(spiderWeb, web.x, web.y, web.width, web.height)
            web.x += web.speed

            // check a web if it's going out of the screen and remove it from webs array
            if(web.x > canvas.width){
                webs.splice(index, 1)
            }

            // check collision when goblin got hit buy the web and remove it from webs array 
            if(player.checkCollision(web, enemy)){
                // console.log("GOBLIN GOT HIT")
                enemyHurt.play()
                webs.splice(index, 1)
                player.score++

                enemy.heath--
                // console.log(enemy.heath)
            }
        })

        //check the cooldown if more than 0
        // player can press spacebar again
        if(player.cooldown > 0){
            player.cooldown--
        }

        // check if the player heath go down to 0
        // the game will be over
        if(player.heath === 0){
            gameOver = true
            result.innerHTML = "You lose"
            totalScore.innerHTML = `Your score is ${player.score}`
        }
    }


    //Goblin
    const drawEnemy = () => {
        ctx.drawImage(enemyImg,enemy.x,enemy.y,enemy.width,enemy.height);

        bombs.forEach((bomb, index) => {
            ctx.drawImage(bombImg, bomb.x, bomb.y, bomb.width, bomb.height)
            bomb.x -= bomb.speed

            if(bomb.x < 0){
                bombs.splice(index,1)
            }

            // check collision if the bomb hit player
            // reduce player's heath 
            if(enemy.checkCollision(bomb, player)){
                // console.log("SPIDERMAN GOT HIT")
                playerHurt.play()
                bombs.splice(index, 1)
                player.heath--
            }
        })

        // check if the heath of enemy go to 0
        // the game will be over
        if(enemy.heath === 0){
            gameOver = true
            result.innerHTML = "You win"
            totalScore.innerHTML = `Your score is ${player.score}`
        }
    }


    const animate = () => {
        ctx.drawImage(bgImg, 0,0, canvas.width,canvas.height)
        drawPlayer()
        drawEnemy()

        // condition check for pressing the keyboard
        // control the movement player
        // fixed the player to not goout of the game frame
        if(isMovingLeft && player.x > 0){
            player.x -= 3
        }else if(isMovingRight && player.x < canvas.width-player.width){
            player.x += 3
        }else if(isMoveUp && player.y > 0){
            player.y -= 3
        }else if(isMoveDown && player.y < canvas.height-player.height){
            player.y += 3
        }

        // track the player to not press long spacebar by setting cooldown variable
        if(isSpace && player.cooldown <= 0){
            player.cooldown = 50
            webs.push(new Obstacle(player.x+player.width-40,player.y+player.height/2,player.weaponSpeed))
        }

        // Random movement y position for goblin every 50 frame
        // add bomb to bombs array every 500 frame
        if(animateId %  50 === 0){
            enemy.y = Math.random()*(canvas.height - enemy.height)
            bombs.push(new Obstacle(canvas.width - enemy.width, enemy.y+enemy.height/3, enemy.weaponSpeed))
        }

        //Display player's score
        ctx.font = '24px Bangers'
        ctx.fillStyle = 'darkblue'
        ctx.fillText('Score: '+ player.score, 20, 30)
        
        //Display player's heath
        ctx.fillText('Heath: '+ player.heath, canvas.width/4, 30)

        // check if game is over than bring the player to the gameover page
        // and stop with the animate
        if(gameOver){
            gameIntro.style.display = 'none'
            gameBoard.style.display = 'none'
            gameOverDiv.style.display = 'block'
            cancelAnimationFrame(animateId)
            gameOverSound.play()
            baseSound.pause()
            baseSound.currentTime = 0
            
        }else{
            animateId = requestAnimationFrame(animate)
        }
    }

    const startGame = () => {
        gameIntro.style.display = 'none'
        gameBoard.style.display = 'block'
        gameOverDiv.style.display = 'none'
        animate()
        baseSound.play()
    }

    const restartGame = () => {
        gameOver = false
        player.score = 0
        player.heath = playerHeath
        enemy.heath = enemyHeath

        startGame()
    }


    document.getElementById('start-button').addEventListener('click', () => {
        startGame()
    })

    document.getElementById('restart-button').addEventListener('click', () => {
        restartGame()
    })

    document.getElementById('home-button').addEventListener('click', () => {
        window.location.reload();
    })

    document.getElementById('mute').addEventListener('click', (event) => {
        baseSound.muted = !baseSound.muted;
        if(event.target.innerText == 'mute'){
            textBtn.innerText = 'Unmute'
        }else{
            textBtn.innerText = 'mute'
        }
            
    })

})