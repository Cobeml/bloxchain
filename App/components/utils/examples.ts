
export const count = `
<html>
    <head>
        <script>
            var count = 0; // Initialize count
            function updateCount() {
                count++; // Increment count
                document.getElementById('countDisplay').innerText = 'The count is ' + count; // Update display
            }
        </script>
    </head>
    <body>
        <p id="countDisplay">
            The count is 0 <!-- Initialize display -->
        </p>
        <button onclick="updateCount()">Increment Count</button> <!-- Button to update count -->
    </body>
</html>
`;


export const ball = `
<html>

    <head>
    </head>
    <body>
        <div>
            <canvas id="canvas"></canvas>
            <button id="reset-button" onclick="reset()" style="display: none;">Reset</button>
        </div>
        <script>
            const canvas = document.getElementById("canvas");
            canvas.width = 600;
            canvas.height = 600;
            const context = canvas.getContext("2d");
            let ball = { x: 0, y: 0 };
            function draw() {
                context.beginPath();
                context.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
                context.fillStyle = "blue";
                context.fill();
            }
            const moveAmount = 20;
            document.addEventListener("keydown", (event) => {
                switch (event.key) {
                    case "ArrowUp":
                        if (ball.y - moveAmount >= 10) { // Check top boundary (considering ball radius)
                            ball.y -= moveAmount;
                        }
                        break;
                    case "ArrowDown":
                        if (ball.y + moveAmount <= canvas.height - 10) { // Check bottom boundary (considering ball radius)
                            ball.y += moveAmount;
                        }
                        break;
                    case "ArrowLeft":
                        if (ball.x - moveAmount >= 10) { // Check left boundary (considering ball radius)
                            ball.x -= moveAmount;
                        }
                        break;
                    case "ArrowRight":
                        if (ball.x + moveAmount <= canvas.width - 10) { // Check right boundary (considering ball radius)
                            ball.x += moveAmount;
                        }
                        break;
                }
            });
            function clearCanvas() {
                context.fillStyle = "red";
                context.fillRect(0, 0, 400, 400);
                context.fillStyle = "green";
                context.fillRect(0, 400, canvas.width, canvas.height);
                context.fillStyle = "green";
                context.fillRect(400, 0, canvas.width, canvas.height);
            }
            function reset() {
                ball = { x: 0, y: 0 };
                document.getElementById("reset-button").style.display = "none";
            }
            const interval = setInterval(() => {
                clearCanvas();
                draw();
                if (ball.x > 400 || ball.y > 400) {
                    document.getElementById("reset-button").style.display = "block";
                }
            }, 1000 / 60)
        </script>
    </body>

</html>
`;
export const setup = `
<html>
    <head>
        <script id="setup">
            // function is evaluated when game is uploaded. 
            // Not evaluated in each play
            // Not saved on chain
            function setup() {
                return {
                    nfts: [
                        {
                            name: "Test",
                            description: "A Test",
                            abbr: "T",
                            data: {
                                success: 0,
                                retries: 1
                            }
                        },
                        {
                            name: 'Chicken',
                            description: "cluck cluck",
                            abbr: "CHICK",
                            data: {
                                health: 20,
                                damage: 40,
                                charisma: 69
                            }
                        }
                        /*
                            {
                                name: // collection name
                                description: // collection description
                                abbr: // token abbreviation
                                data: // template of data you want stored on each nft ex. {health: 100, damage: 200}...
                            }
                        */
                    ],
                    tokens: [
                        {
                            name: "Gold",
                            abbr: "GOLD",
                            description: "ooh shiny...",
                            supply: 1000,
                        },
                        {
                            name: "Silver",
                            abbr: "SILVER",
                            description: "shiny...",
                            supply: 500
                        }
                        /*  
                        {
                            name: // token name
                            description: // token description
                            abbr: // token abbreviation
                            supply: // token max supply
                        }
                        */ 
                    ],
                    user: {
                        level: 0,
                        damage: 20,
                        exp: 1000,
                    }
                        /*  
                        {
                            key, int pairs of data
                        }
                        */
                    
                }
            }
        </script>
    </head>
    <body>
        <p> Hello World </p>
        <script>
            // your code here
        </script>
    </body>
</html>

`;

export const post = `


<html>
    <head>
        <script id="setup">
            // function is evaluated when game is uploaded. 
            // Not evaluated in each play
            // Not saved on chain
            function setup() {
                return {
                    nfts: [
                        {
                            name: "Test",
                            description: "A Test",
                            abbr: "T",
                            data: {
                                success: 0,
                                retries: 1
                            }
                        },
                        {
                            name: 'Chicken',
                            description: "cluck cluck",
                            abbr: "CHICK",
                            data: {
                                health: 20,
                                damage: 40,
                                charisma: 69
                            }
                        }
                        /*
                            {
                                name: // collection name
                                description: // collection description
                                abbr: // token abbreviation
                                data: // template of data you want stored on each nft ex. {health: 100, damage: 200}...
                            }
                        */
                    ],
                    tokens: [
                        {
                            name: "Gold",
                            abbr: "GOLD",
                            description: "ooh shiny...",
                            supply: 1000,
                        },
                        {
                            name: "Silver",
                            abbr: "SILVER",
                            description: "shiny...",
                            supply: 500
                        }
                        /*  
                        {
                            name: // token name
                            description: // token description
                            abbr: // token abbreviation
                            supply: // token max supply
                        }
                        */ 
                    ],
                    user: {
                        level: 0,
                        damage: 20,
                        exp: 1000,
                    }
                        /*  
                        {
                            key, int pairs of data
                        }
                        */
                    
                }
            }
        </script>
    </head>
    <body>
        <p> Hello World </p>
        <button onclick="viewObjects()"> View Objects </button>
        <script>
        function viewObjects() {
            console.log({nfts, tokens, user});
        }
        let counter = 0;
        const interval = setInterval(() => {
            if (nfts) {
                counter++;
                console.log("nfts found")
                console.log(nfts)
            }
            if (tokens) {
                counter++;
                console.log("tokens found")
                console.log(tokens);
            }
            if (user) {
                counter++;
                console.log("user found")
                console.log(user)
            }
            if (counter == 3) {
                console.log("all found");
                clearInterval(interval);
            }
            console.log("Found " + counter + "/3")
        }, 1000 / 60);
            // your code here
        </script>
    </body>
</html>

`;


export const communication = `
<html>
    <head>
        <script id="setup">
            // function is evaluated when game is uploaded. 
            // Not evaluated in each play
            // Not saved on chain
            function setup() {
                return {
                    nfts: [
                        {
                            name: "Test",
                            description: "A Test",
                            abbr: "T",
                            data: {
                                success: 0,
                                retries: 1
                            }
                        },
                        {
                            name: 'Chicken',
                            description: "cluck cluck",
                            abbr: "CHICK",
                            data: {
                                health: 20,
                                damage: 40,
                                charisma: 69
                            }
                        }
                        /*
                            {
                                name: // collection name
                                description: // collection description
                                abbr: // token abbreviation
                                data: // template of data you want stored on each nft ex. {health: 100, damage: 200}...
                            }
                        */
                    ],
                    tokens: [
                        {
                            name: "Gold",
                            abbr: "GOLD",
                            description: "ooh shiny...",
                            supply: 1000,
                        },
                        {
                            name: "Silver",
                            abbr: "SILVER",
                            description: "shiny...",
                            supply: 500
                        }
                        /*  
                        {
                            name: // token name
                            description: // token description
                            abbr: // token abbreviation
                            supply: // token max supply
                        }
                        */ 
                    ],
                    user: {
                        level: 0,
                        damage: 20,
                        exp: 1000,
                    }
                        /*  
                        {
                            key, int pairs of data
                        }
                        */
                    
                }
            }
        </script>
    </head>
    <body>
        <p> Hello World </p>
        <button onclick="viewObjects()"> View Objects </button>
        <button onclick="requestItemsUpdate()">Request object update </button>
        <button onclick="sendTransactionToFrontendAndWait('__tokenToUser', '0', {tokenAddress: tokens.all()[0][1].address, amount: 20})">Send token tx</button>
        <script>
        function viewObjects() {
            console.log({nfts, tokens, user});
        }
        let counter = 0;
        const interval = setInterval(() => {
            if (nfts) {
                counter++;
                console.log("nfts found")
                console.log(nfts)
            }
            if (tokens) {
                counter++;
                console.log("tokens found")
                console.log(tokens);
            }
            if (user) {
                counter++;
                console.log("user found")
                console.log(user)
            }
            if (counter == 3) {
                console.log("all found");
                clearInterval(interval);
            }
            console.log("Found " + counter + "/3")
        }, 1000 / 60);
            // your code here
        </script>
    </body>
</html>
`;