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
            && !winner)
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

    const winnerCheck = ((type)=>{
            
            const winConditional =(field1, field2, field3) => gameBoard.fields[field1] != '' &&
            gameBoard.fields[field1] == gameBoard.fields[field2] &&
                        gameBoard.fields[field2] == gameBoard.fields[field3];

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
            return{startGame, resetGame, winCheck, turns, winner}
})();