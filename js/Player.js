class Player {
    constructor(x,y,height,width,heath){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.cooldown = 0
        this.score = 0
        this.heath = heath
    }

    checkCollision(a,b){
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.height + a.y > b.y
    }
}