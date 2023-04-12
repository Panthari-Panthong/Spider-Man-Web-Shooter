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

    // Sounds effect
    const baseSound = new Audio('sounds/base-sound.wav')
    baseSound.volume = 0.1
    baseSound.loop=true
    const playerHurt = new Audio('sounds/playerHurt.mp3')
    const enemyHurt = new Audio('sounds/enemy-hurt.mp3')
    const gameOverSound = new Audio('sounds/gameove.wav')
    gameOverSound.volume = 0.3