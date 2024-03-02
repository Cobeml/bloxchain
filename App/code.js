
const objects = {
    // nftCollections: [
    //     {
    //       name: string,
    //       abbr: string,
    //       description: string,
    //       data: object //{ key: defaultValue (uint) }[]  
    //     },
    //     //...
    // ],
    // tokens: [
    //     {
    //         name: string,
    //         abbr: string,
    //         supply: uint,
    //         description: string
    //     },
    //     //...
    // ]
}
const structure = `<div>
<canvas id="game"></canvas>
<p>hello world</p>
</div>`
const globalVariables = {
    ball: null,
    events: [],
    interval: null
}
function setup(globalVariables) {
    class Ball {
        constructor() {
            this.x = 0;
            this.y = 0;
        }
        draw(context) {
            context.beginPath();
            context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            context.fillStyle = "red";
            context.fill();
        }
    }
    globalVariables.ball = new Ball();
    function onKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                globalVariables.ball.y--;
                break;
            case 'ArrowDown':
                globalVariables.ball.y++;
                break;
            case 'ArrowLeft':
                globalVariables.ball.x--;
                break;
            case 'ArrowRight':
                globalVariables.ball.x++;
                break;
        }
    }
    document.addEventListener("keydown", onKeyDown);
    globalVariables.events.push(onKeyDown);
    const canvas = document.getElementById("game");
    canvas.width = 600;
    canvas.height = 600;
    return globalVariables;
    // setup game on load
}
function main(globalVariables) {
    // write game logic
    // can call endGame() to end the game
    return new Promise((resolve, reject) => {
        const canvas = document.getElementById("game");
        const context = canvas.getContext("2d");
        function clearCanvas() {
            context.fillStyle = "white";
            context.fillRect(0, 0, 600, 600);
        }
        globalVariables.interval = setInterval(() => {
            clearCanvas();
            globalVariables.ball.draw(context);
            if (globalVariables.ball.x > 100) {
                clearInterval(globalVariables.interval);
                resolve(globalVariables);
            }
            console.log(globalVariables.ball.x, globalVariables.ball.y);
        }, 1000/60)
    })
}
function onEnd(globalVariables) {
    for (const event of globalVariables.events) {
        document.removeEventListener("keydown", event);
    }
    clearInterval(globalVariables.interval)
    // cleanup resources on game end
}
