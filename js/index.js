window.addEventListener('load', () => {
    const gameIntro = document.querySelector('.game-intro')
    gameIntro.style.backgroundImage = "url('images/wallpaper-spiderman.jpeg')"
    gameIntro.style.backgroundRepeat = "no-repeat"
    gameIntro.style.backgroundSize = "cover"
    gameIntro.style.width = "700px"
    gameIntro.style.height = "500px"

    const gameBoard = document.querySelector('#game-board')

    const gameOverDiv = document.querySelector('.game-over')
    gameOverDiv.style.display = 'none'
    const result = document.querySelector('#result')
    const totalScore = document.querySelector('#score')

    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    const bgImg = new Image()
    bgImg.src = "images/city-backdrop.jpeg"

    const playerImg = new Image()
    playerImg.src = "images/spiderman.png"

    const spiderWeb = new Image()
    spiderWeb.src = "images/spiderWeb.png"

    const enemyImg = new Image()
    enemyImg.src = "images/green-goblin.png"

    const bombImg = new Image()
    bombImg.src = "images/bomb.png"

    const player = new Player(canvas.width/4,canvas.height/2,100,130,5)

    const enemy = new Player(canvas.width/2+canvas.width/4,canvas.height/2,170,170,5)
 
    const webs = []
    let webSpeed = 10
    
    const bombs = []
    let bombSpeed = 10
    
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
                console.log("GOBLIN GOT HIT")
                webs.splice(index, 1)
                player.score++

                enemy.heath--
                console.log(enemy.heath)
            }
        })

        if(player.cooldown > 0){
            player.cooldown--
        }

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

            if(enemy.checkCollision(bomb, player)){
                console.log("SPIDERMAN GOT HIT")
                bombs.splice(index, 1)
                player.heath--
            }
        })
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


        if(isMovingLeft && player.x > 0){
            player.x -= 3
        }else if(isMovingRight && player.x < canvas.width-player.width){
            player.x += 3
        }else if(isMoveUp && player.y > 0){
            player.y -= 3
        }else if(isMoveDown && player.y < canvas.height-player.height){
            player.y += 3
        }

        if(isSpace && player.cooldown <= 0){
            player.cooldown = 80
            webs.push(new Obstacle(player.x+player.width-40,player.y+player.height/2,webSpeed))
        }

        // Random y position for goblin
        if(animateId %  100 === 0){
            enemy.y = Math.random()*(canvas.height - enemy.height)
            bombs.push(new Obstacle(canvas.width - enemy.width, enemy.y+enemy.height/3, bombSpeed))
        }

        if(gameOver){
            gameIntro.style.display = 'none'
            gameBoard.style.display = 'none'
            gameOverDiv.style.display = 'block'
        }

        //Player score
        ctx.font = '24px Bangers'
        ctx.fillStyle = 'darkblue'
        ctx.fillText('Score: '+ player.score, 20, 30)

        //Player heath
        ctx.fillText('Heath: '+ player.heath, canvas.width/4, 30)
        animateId = requestAnimationFrame(animate)

    }

    const startGame = () => {
        gameIntro.style.display = 'none'
        gameBoard.style.display = 'block'
        gameOverDiv.style.display = 'none'
        animate()

    }

    document.getElementById('start-button').addEventListener('click', () => {
        startGame()
    })


})