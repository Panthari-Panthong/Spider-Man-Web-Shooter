let isMovingLeft = false
let isMovingRight = false
let isMoveUp = false
let isMoveDown = false
let isSpace = false

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