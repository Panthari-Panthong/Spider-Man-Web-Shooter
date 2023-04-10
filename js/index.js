window.addEventListener('load', () => {
    const gameIntro = document.querySelector('.game-intro')
    gameIntro.style.backgroundImage = "url('../images/wallpaper-spiderman.jpeg')"
    gameIntro.style.backgroundRepeat = "no-repeat"
    gameIntro.style.backgroundSize = "cover"
    gameIntro.style.width = "700px"
    gameIntro.style.height = "500px"


    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    const bgImg = new Image()
    bgImg.src = "../images/city-backdrop.jpeg"

    const playerImg = new Image()
    playerImg.src = "../images/spiderman.png"

    const spiderWeb = new Image()
    spiderWeb.src = "../images/spiderWeb.png"

    const player = {
        x:canvas.width/4, 
        y: canvas.height/2,
        height:100,
        width: 130,
        cooldown: 0
    }

    let animateId

    let isMovingLeft = false
    let isMovingRight = false
    let isMoveUp = false
    let isMoveDown = false
    let isSpace = false

    const webs = []
    let websSpeed = 7


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


    const animate = () => {
        ctx.drawImage(bgImg, 0,0, canvas.width,canvas.height)
        drawPlayer()


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


    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') {
            isMovingLeft = true
        }
        if (event.key === 'ArrowRight') {
            isMovingRight = true
        }
  
        if (event.key === 'ArrowUp') {
            isMoveUp = true
        }
  
        if (event.key === 'ArrowDown') {
            isMoveDown = true
        }

        if (event.key === ' '){
            isSpace = true
        }  
    })

    document.addEventListener('keyup', event => {
        if (event.key === 'ArrowLeft') {
          isMovingLeft = false
        }
        if (event.key === 'ArrowRight') {
          isMovingRight = false
        }

        if (event.key === 'ArrowUp') {
            isMoveUp = false
        }

        if (event.key === 'ArrowDown') {
            isMoveDown = false
        }
        
        if (event.key === ' '){
            isSpace = false
        }  

      })
})