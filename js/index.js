window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    const bgImg = new Image()
    bgImg.src = "../images/city-backdrop.jpeg"

    const playerImg = new Image()
    playerImg.src = "../images/spiderman.png"

    const player = {
        x:canvas.width/4, 
        y: canvas.height/2,
        height:100,
        width: 130
    }

    let animateId

    let isMovingLeft = false
    let isMovingRight = false
    let isMoveUp = false
    let isMoveDown = false


    const drawPlayer = () => {
        ctx.drawImage(playerImg,player.x,player.y,player.width,player.height);
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

      })
})