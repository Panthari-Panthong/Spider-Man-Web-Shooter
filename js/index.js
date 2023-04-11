window.addEventListener('load', () => {
    const gameIntro = document.querySelector('.game-intro')
    gameIntro.style.backgroundImage = "url('images/wallpaper-spiderman.jpeg')"
    gameIntro.style.backgroundRepeat = "no-repeat"
    gameIntro.style.backgroundSize = "cover"
    gameIntro.style.width = "700px"
    gameIntro.style.height = "500px"


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

    const player = {
        x:canvas.width/4, 
        y: canvas.height/2,
        height:100,
        width: 130,
        cooldown: 0,
        score: 0,
        heath: 5
    }

    const enemy = {
        x:canvas.width/2+canvas.width/4, 
        y: canvas.height/2,
        height:170,
        width: 170,
    }

    let animateId


    const webs = []
    let websSpeed = 10

    //Spiderman
    const drawPlayer = () => {
        ctx.drawImage(playerImg,player.x,player.y,player.width,player.height);

        webs.forEach((web, index) => {
            ctx.drawImage(spiderWeb, web.x, web.y, web.width, web.height)
            web.x += web.speed

            if(web.x > canvas.width){
                webs.splice(index, 1)
            }
        })

        if(player.cooldown > 0){
            player.cooldown--
        }
    }


    //Goblin
    const drawEnemy = () => {
        ctx.drawImage(enemyImg,enemy.x,enemy.y,enemy.width,enemy.height);
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
            webs.push({
                x: player.x+player.width-40,
                y: player.y+player.height/2,
                speed: websSpeed,
                width: 20,
                height: 20
            })
        }

        if(animateId %  200 === 0){
            enemy.y = Math.random()*(canvas.height - enemy.height)
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
        document.querySelector('.game-intro').style.display = 'none'
        document.querySelector('#game-board').style.display = 'block'
        animate()

    }

    document.getElementById('start-button').addEventListener('click', () => {
        startGame()
    })


})