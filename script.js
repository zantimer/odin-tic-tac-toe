//gameboard
const gameBoard = (()=>
{
    const fields = {['f1']:'',
    ['f2']: '',
    ['f3']: '',
    ['f4']:'',
    ['f5']: '',
    ['f6']: '',
    ['f7']:'',
    ['f8']: '',
    ['f9']: ''}

    return {fields};
})();

// display logic

const displayController = (() =>
{
    const drawBoard = () =>
        {
        for (field in gameBoard.fields)
        {
            const div = document.createElement('div');
            const p = document.createElement('p');
            
            div.id = 'field';
            div.classList.add(field);
            p.classList.add('field-value');
            p.textContent = gameBoard[field];
            
            document.body.appendChild(div);
            div.appendChild(p);
            
            
            humanMarkerDown(p, div);
        }
        // const divs = document.querySelectorAll('#field');
        // divs.forEach(div =>{
        //     div.addEventListener('click',()=>{gameFlow.winCheck()});
        // })
        
        
    }
    const humanMarkerDown = (p, div) => {
        p.addEventListener('click', (e) => {
            if (humanPlayer.isTurnOf && e.target.textContent == ''&&!gameFlow.winner) {
                e.target.textContent = humanPlayer.marker;
                gameBoard.fields[div.classList.item(0)] = humanPlayer.marker;
                if (!gameFlow.winCheck())
                {
                humanPlayer.isTurnOf = false;
                gameFlow.turns.first = aiPlayer;
                gameFlow.startGame();
                }
                else
                {
                    humanPlayer.isTurnOf = false;
                }
            }
        });
        }
        const xButton = document.querySelector('.X');
        const oButton = document.querySelector('.O');
        const winnerField = document.querySelector('.winnerField');
        const buttons = () => {

            xButton.addEventListener('click', () =>{
                humanPlayer.marker = 'X';
                aiPlayer.marker = 'O';
                displayController.drawBoard();
                xButton.disabled = true;
                oButton.disabled = true;
            })
            oButton.addEventListener('click', () =>{
                humanPlayer.marker = 'O';
                aiPlayer.marker = 'X';
                displayController.drawBoard();
                xButton.disabled = true;
                oButton.disabled = true;
            }) 
        xButton.addEventListener('click', gameFlow.startGame);
        oButton.addEventListener('click', gameFlow.startGame);

        const resetBtn = document.createElement('button');
        document.body.appendChild(resetBtn);
        resetBtn.classList.add('resetBtn');
        resetBtn.textContent = "Reset game"
        resetBtn.addEventListener('click', gameFlow.resetGame);
        };
             
        return {drawBoard, buttons, winnerField, xButton, oButton}
        
    })();
    
    
//player factory logic
const playerFactory = (name, who, marker) => 
{
    const isTurnOf = false;
    const hasMoved = false;        
    return {name, who, marker, isTurnOf}
};

const humanPlayer = playerFactory(prompt('Input name'),
 'human');
const aiPlayer = playerFactory('John but AI', 
'ai')

//game logic

const gameFlow = (()=>{
    let winner = false;
    let minimaxer = true;
    const turns = {first: undefined,
                second: undefined};
        const startGame = ()=>{
            
            if (winner)
            {
                return;
            }
        
        if(humanPlayer.marker == 'O' && !humanPlayer.hasMoved)
        {
            turns.first = humanPlayer;
            turns.second = aiPlayer;
            humanPlayer.hasMoved=true;
        }
        else if(humanPlayer.marker == 'X')
        {
            turns.first = aiPlayer;
            turns.second = humanPlayer;
        }
    
        if(!winner)
        {
        turns.first.isTurnOf = true;
        }
        if(turns.first == aiPlayer && 
            (gameBoard.fields.f1 != 'X'||'O' &&
            gameBoard.fields.f2 != 'X'||'O' &&
            gameBoard.fields.f3 != 'X'||'O' &&
            gameBoard.fields.f4 != 'X'||'O' &&
            gameBoard.fields.f5 != 'X'||'O' &&
            gameBoard.fields.f6 != 'X'||'O' &&
            gameBoard.fields.f7 != 'X'||'O' &&
            gameBoard.fields.f8 != 'X'||'O' &&
            gameBoard.fields.f9 != 'X'||'O') && aiPlayer.isTurnOf
            && !winner &&!minimaxer)
        {
            console.log('my turn now')
            function randomField(min, max)
            {
                return Math.floor(Math.random() *(max-min)+1);
            }
            let aiPick = randomField(0, 9);
            console.log(`got me pick = ${aiPick}`);
            let i=0;
            while(gameBoard.fields[`f${aiPick}`] != '')
            {
                i++;
                aiPick = randomField(0,9);
                console.log(`got me pick = ${aiPick}`);
                if(gameBoard.fields[`f${aiPick}`] == '' || i == 30)
                {
                    break;
                }
            }
            if(gameBoard.fields[`f${aiPick}`] == '')
                {
                    console.log('starting loop');
                    gameBoard.fields[`f${aiPick}`] = aiPlayer.marker;
                    const div = document.body.querySelector(`.f${aiPick}`);
                    const divP = div.querySelector('.field-value');
                    divP.textContent = aiPlayer.marker;
                    
                    winCheck();
                    aiPlayer.isTurnOf = false;
                    turns.first = humanPlayer;
                    turns.first.isTurnOf = true;
                    turns.second = aiPlayer;
                    
                }
            }
            else if (minimaxer && turns.first == aiPlayer)
            {
                let bestMove = findBestMove(gameBoard.fields);
                gameBoard.fields[bestMove.field] = aiPlayer.marker;
                const div = document.body.querySelector(`.${bestMove.field}`);
                    const divP = div.querySelector('.field-value');
                    winCheck();
                    divP.textContent = aiPlayer.marker;
                    aiPlayer.isTurnOf = false;
                    turns.first = humanPlayer;
                    turns.first.isTurnOf = true;
                    turns.second = aiPlayer;

            }
        }
        

        function resetGame()
        {
            for (field in gameBoard.fields)
            {
                gameBoard.fields[field] = '';
                const fieldQuery = document.querySelectorAll(`.field-value`);
                fieldQuery.forEach(field => {
                    field.textContent ='';
                })
                const divs = document.querySelectorAll('#field');
                divs.forEach(div => {
                    div.remove()
                })
            }
            displayController.winnerField.textContent = '';
            displayController.xButton.disabled = false;
            displayController.oButton.disabled = false;
            winner = false;
            
        }

    function winIterator(field, nr) {

        displayController.winnerField.textContent = gameBoard.fields[field] ==
            humanPlayer.marker ?
            `${humanPlayer.name} won!` : `${aiPlayer.name} won!`;
                aiPlayer.isTurnOf = false;
                humanPlayer.isTurnOf = false;
                winner = true;
                console.log(`win condition ${nr}`);
            }

            const winConditional =(field1, field2, field3) => gameBoard.fields[field1] != '' &&
            gameBoard.fields[field1] == gameBoard.fields[field2] &&
                        gameBoard.fields[field2] == gameBoard.fields[field3];
    const winnerCheck = ((type)=>{
            

                switch (type){
                    case 'row':
                        {
                        for(let i = 1; i<=7; i+=3)
                        {
                            if (winConditional(`f${i}`, `f${i+1}`, `f${i+2}`))
                            {
                                winIterator(`f${i}`, 'row')
                                console.log(i)
                                return true;
                            }
                        }
                        }

                    case 'line':
                        for(let i = 1; i<=3; i++)
                        {
                            if (winConditional(`f${i}`, `f${i+3}`, `f${i+6}`))
                            {
                                winIterator(`f${i}`, 'line')
                                return true;
                            }
                        }

                    case 'diag':
                        if(winConditional('f1', 'f5', 'f9'))
                        {
                            winIterator('f1', 'diag')
                            return true
                        }
                        else if( winConditional(`f3`, `f5`, `f7`))
                        {
                            winIterator('f3', 'diag')
                            return true;
                        }
                            
                    default:
                        return false;
                        break;
                }
            
        } );
               const winCheck = () => {
                if (winnerCheck('row')||winnerCheck('line')||winnerCheck('diag'))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
////////////minimax 
            const move = (field) =>{
                return {field}
            }

            function isMovesLeft(board)
            {
                for(let i = 1; i<10;i++)
                {
                    if (board[`f${i}`] == '')
                    {
                        return true;
                    }
                }
                return false;
            }

            function evaluate(board)
            {
                for(let row = 1; row<4;row+=3)
                {
                    
                    if (winConditional(`f${row}`,
                     `f${row+1}`, `f${row+2}`))
                    {
                        if (board[`f${row}`]== aiPlayer.marker)
                        {
                            return +10;
                        }
                        else if (board[`f${row}`] == humanPlayer.marker)
                        {
                            return -10;
                        }
                    }
                }

                for(let col = 1; col<4;col++)
                {
                    
                    if (winConditional(`f${col}`,
                     `f${col+3}`, `f${col+6}`))
                    {
                        if (board[`f${col}`]== aiPlayer.marker)
                        {
                            return +10;
                        }
                        else if (board[`f${col}`] == humanPlayer.marker)
                        {
                            return -10;
                        }
                    }
                }
                        if(winConditional('f1', 'f5', 'f9'))
                        {
                            if(board['f1'] == aiPlayer.marker)
                            {
                                return +10;
                            }
                            else if (board['f1'] == humanPlayer.marker)
                            {
                                return -10;
                            }

                        }
                        else if( winConditional(`f3`, `f5`, `f7`))
                        {
                            if(board['f3'] == aiPlayer.marker)
                            {
                                return +10;
                            }
                            else if (board['f3'] == humanPlayer.marker)
                            {
                                return -10;
                            }
                        }
                        return 0;
            }

            function minimax(board, depth, isMax)
            {
                let score = evaluate(board);

                if (score == 10)
                {
                    return score;
                }
                if (score == -10)
                {
                    return score;
                }
                if (isMovesLeft(board) == false)
                {
                    return 0;
                }
                if (isMax)
                {
                    let best = -1000;
                    for(let i = 0; i <10; i++)
                    {
                        if (board[`f${i}`]=='')
                        {
                            board[`f${i}`] = aiPlayer.marker

                            best = Math.max(best, minimax(board, depth+1, !isMax))

                            board[`f${i}`] = '';
                        }
                    }
                    return best;

                }
                else
                {
                    let best = 1000;
                    //traverse all cells
                    for(let i = 0; i <10; i++)
                    {
                        if (board[`f${i}`]=='')
                        {
                            board[`f${i}`] = humanPlayer.marker

                            best = Math.min(best, minimax(board, depth+1, !isMax))

                            board[`f${i}`] = '';
                        }
                    }
                    return best;
                }
            }
            function findBestMove(board)
            {
                let bestVal = -1000;
                let bestMove = move();
                bestMove.field = -1;
                for (let i = 1; i<10;i++)
                {
                    if (board[`f${i}`] == '')
                    {
                        board[`f${i}`] = aiPlayer.marker;
                        let moveVal = minimax(board, 0, false)
                        board[`f${i}`]='';
                        if (moveVal>bestVal)
                        {
                            bestMove.field = `f${i}`;
                            bestVal = moveVal;
                        }
                    }
                }
                return bestMove;
            }
            return{startGame, resetGame, winCheck, turns, winner, findBestMove}
})();

window.onload = displayController.buttons;



//minimax pseudo code
// define move const
// function to check if any moves left
//function evaluate(gameboard.fields) =
// check rows/lines/diag for x/o and return 
//scores for max and minimising (+10/-10, if none won 0)
// minimax(gameBoard.fields, depth, isMax)
//score = evaluate(board)
// if score == 10 return score
// if score == -10 return score
// if no more moves return 0
//if maximisers move
//1. let best = -1000;
// loop through cells =>
// if gameboard.fields[field i] == ''
//2. {board[i] = player make move
//best = math.max(best, 
//minimax(board, depth+1, !isMax))
//board[i] = ''
//}
//return best
//minimiser loop, same as above, but
//1. best =1000;
//2. make move opponent
//function findbestmove(board)
//{
    //let bestVal = -1000;
    // let bestMove = new Move();
    // bestMove.row = -1;
    // bestMove.col = -1;
// loop through board=>
// make move
// get moveVal = minimax(board, 0, false)
//undo move
// if moveVal > best val
//bestMove.row = i
//bestMove.col = j
//bestVal = moveVal;
    //}
    //return bestMove
