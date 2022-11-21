//global queries
const xButton = document.querySelector('.X');
const oButton = document.querySelector('.O');
const winnerField = document.querySelector('.winnerField');
//game logic

const gameBoard = (()=>
{
    const fields = {topLeft:'',
    topCenter: '',
    topRight: '',
    centerLeft:'',
    center: '',
    centerRight: '',
    bottomLeft:'',
    bottomCenter: '',
    bottomRight: ''}

    return {fields};
})();

//player factory logic
const playerFactory = (name, who, marker) => 
{
    const isTurnOf = false;        
    return {name, who, marker, isTurnOf}
};

const humanPlayer = playerFactory(prompt('Input name'),
 'human');
const aiPlayer = playerFactory('John but AI', 
'ai')

//game logic

const gameFlow = (()=>{
    const turns = {first: undefined,
                second: undefined};
        if(humanPlayer.marker == 'O')
        {
            turns.first = humanPlayer;
            turns.second = aiPlayer;
        }
        else
        {
            turns.first = aiPlayer;
            turns.second = humanPlayer;
        }
        turns.first.isTurnOf = true;
        if(turns.first == aiPlayer)
        {

        }

        

        xButton.addEventListener('click', () =>{
            humanPlayer.marker = 'X';
            aiPlayer.marker = 'O';
            drawBoard();
            xButton.disabled = true;
            oButton.disabled = true;
        })
        oButton.addEventListener('click', () =>{
            humanPlayer.marker = 'O';
            aiPlayer.marker = 'X';
            drawBoard();
            xButton.disabled = true;
            oButton.disabled = true;
        })
        function CheckWinner(gameBoard, p) {
            p.addEventListener('click', () =>{
                
            if ((gameBoard.topLeft == 'X' &&
                gameBoard.topCenter == 'X' &&
                gameBoard.topRight == 'X') ||
                (gameBoard.topLeft == 'O' &&
                gameBoard.topCenter == 'O' &&
                gameBoard.topRight == 'O'))
                {
                    winnerField.textContent = "something, somehow";
                
                }
                
                else if ((gameBoard.centerLeft == 'X' &&
                gameBoard.center == 'X' &&
                gameBoard.centerRight == 'X' )||
                (gameBoard.centerLeft == 'O' &&
                gameBoard.center == 'O' &&
                gameBoard.centerRight == 'O'))
                {
                winnerField.textContent = "something, somehow";
                
                }
                
                else if ((gameBoard.bottomLeft == 'X' &&
                gameBoard.bottomCenter == 'X' &&
                gameBoard.bottomRight == 'X') ||
                (gameBoard.bottomLeft == 'O' &&
                gameBoard.bottomCenter == 'O' &&
                gameBoard.bottomRight == 'O'))
                {winnerField.textContent = "something, somehow";
                }

            else if ((gameBoard.topLeft == 'X' &&
                gameBoard.centerLeft == 'X' &&
                gameBoard.bottomLeft == 'X' )||
                (gameBoard.topLeft == 'O' &&
                gameBoard.centerLeft == 'O' &&
                gameBoard.bottomLeft == 'O'))
                {winnerField.textContent = "something, somehow";
                }
                
                else if ((gameBoard.topCenter == 'X' &&
                gameBoard.center == 'X' &&
                gameBoard.bottomCenter == 'X') ||
                (gameBoard.topCenter == 'O' &&
                gameBoard.center == 'O' &&
                gameBoard.bottomCenter == 'O'))
                {winnerField.textContent = "something, somehow";
                }
                
                else if ((gameBoard.topRight == 'X' &&
                gameBoard.centerRight == 'X' &&
                gameBoard.bottomRight == 'X') ||
                (gameBoard.topRight == 'O' &&
                gameBoard.centerRight == 'O' &&
                gameBoard.bottomRight == 'O'))
                {winnerField.textContent = "something, somehow";
                }
                
                else if ((gameBoard.topLeft == 'X' &&
                gameBoard.center == 'X' &&
                gameBoard.bottomRight == 'X') ||
                (gameBoard.topLeft == 'O' &&
                gameBoard.center == 'O' &&
                gameBoard.bottomRight == 'O'))
                {winnerField.textContent = "something, somehow";
                }
                
            else if ((gameBoard.topRight == 'X' &&
                gameBoard.center == 'X' &&
                gameBoard.bottomLeft == 'X') ||
                (gameBoard.topRight == 'O' &&
                gameBoard.center == 'O' &&
                gameBoard.bottomLeft == 'O'))
                {winnerField.textContent = "something, somehow";
                }
            })
                }
        
        function drawBoard()
        {
        for (field in gameBoard.fields)
        {
            const div = document.createElement('div');
            const p = document.createElement('p');
            
            div.classList.add('field');
            div.classList.add(field);
            p.classList.add('field-value');
            p.textContent = gameBoard[field];
            
            document.body.appendChild(div);
            div.appendChild(p);
            
            
            humanMarkerDown(p, div);
            CheckWinner(gameBoard, p);
        }
        
        function humanMarkerDown(p, div) {
            p.addEventListener('click', (e) => {
                if (humanPlayer.isTurnOf && e.target.textContent == '') {
                    e.target.textContent = humanPlayer.marker;
                    gameBoard[div.classList.item(1)] = humanPlayer.marker;
                }
            });
        }
        }
    })();
    



humanPlayer.isTurnOf = true;
