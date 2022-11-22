//global queries
const xButton = document.querySelector('.X');
const oButton = document.querySelector('.O');
const winnerField = document.querySelector('.winnerField');
//game logic

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

let winner = false;
const gameFlow = (()=>{
    const turns = {first: undefined,
                second: undefined};
        function startGame(){
            
        
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
                    aiPlayer.isTurnOf = false;
                    turns.first = humanPlayer;
                    turns.first.isTurnOf = true;
                    turns.second = aiPlayer;
                }
            }
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
        
        function drawBoard()
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
        const divs = document.querySelectorAll('#field');
        divs.forEach(div =>{
            div.addEventListener('click',()=>{winnerCheck.CheckWinner(gameBoard)});
        })
        
        function humanMarkerDown(p, div) {
            p.addEventListener('click', (e) => {
                if (humanPlayer.isTurnOf && e.target.textContent == ''&&!winner) {
                    e.target.textContent = humanPlayer.marker;
                    gameBoard.fields[div.classList.item(0)] = humanPlayer.marker;
                    
                    if (!winnerCheck.CheckWinner(gameBoard))
                    {humanPlayer.isTurnOf = false;
                    turns.first = aiPlayer;
                    startGame();}
                }
            });
        }
        }

        xButton.addEventListener('click', startGame);
        oButton.addEventListener('click', startGame);

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
            winnerField.textContent = '';
            xButton.disabled = false;
            oButton.disabled = false;
            winner = false;
            
        }
        const resetBtn = document.createElement('button');
        document.body.appendChild(resetBtn);
        resetBtn.classList.add('resetBtn');
        resetBtn.textContent = "Reset game"
        resetBtn.addEventListener('click', resetGame);

        const winnerCheck = {CheckWinner:
        function CheckWinner(gameBoard) {
            if (!winner)    
            {
                if ((gameBoard.fields['f1'] == humanPlayer.marker &&
                gameBoard.fields['f2'] == humanPlayer.marker &&
                gameBoard.fields['f3'] == humanPlayer.marker) ||
                (gameBoard.fields['f1'] == aiPlayer.marker &&
                gameBoard.fields['f2'] == aiPlayer.marker &&
                gameBoard.fields['f3'] == aiPlayer.marker))
                {
                    winnerField.textContent = gameBoard.fields['f1'] ==
                     humanPlayer.marker ?
                     `${humanPlayer.name} won!`:`${aiPlayer.name} won!`;
                     aiPlayer.isTurnOf = false;
                     humanPlayer.isTurnOf = false;
                     winner = true;
                     console.log('conditional 1');
                     return true;
                }
                
                else if ((gameBoard.fields['f4'] == humanPlayer.marker &&
                gameBoard.fields['f5'] == humanPlayer.marker &&
                gameBoard.fields['f6'] == humanPlayer.marker )||
                (gameBoard.fields['f4'] == aiPlayer.marker &&
                gameBoard.fields['f5'] == aiPlayer.marker &&
                gameBoard.fields['f6'] == aiPlayer.marker))
                {
                    winnerField.textContent = gameBoard.fields['f4'] ==
                    humanPlayer.marker ?
                    `${humanPlayer.name} won!`:`${aiPlayer.name} won!`;
                    aiPlayer.isTurnOf = false;
                    humanPlayer.isTurnOf = false;
                    winner = true;
                    console.log('conditional 2');
                    return true;
                }
                
                else if ((gameBoard.fields['f7'] == humanPlayer.marker&&
                gameBoard.fields['f8'] == humanPlayer.marker &&
                gameBoard.fields['f9'] == humanPlayer.marker) ||
                (gameBoard.fields['f7'] == aiPlayer.marker &&
                gameBoard.fields['f8'] == aiPlayer.marker &&
                gameBoard.fields['f9'] == aiPlayer.marker))
                {
                    winnerField.textContent = gameBoard.fields['f7'] ==
                     humanPlayer.marker ?
                     `${humanPlayer.name} won!`:`${aiPlayer.name} won!`;
                     aiPlayer.isTurnOf = false;
                    humanPlayer.isTurnOf = false;
                    winner = true;
                    console.log('conditional 3');
                    return true;
                }

            else if ((gameBoard.fields['f1'] == humanPlayer.marker &&
                gameBoard.fields['f4'] == humanPlayer.marker &&
                gameBoard.fields['f7'] == humanPlayer.marker )||
                (gameBoard.fields['f1'] == aiPlayer.marker &&
                gameBoard.fields['f4'] == aiPlayer.marker &&
                gameBoard.fields['f7'] == aiPlayer.marker))
                {
                    winnerField.textContent = gameBoard.fields['f1'] ==
                     humanPlayer.marker ?
                     `${humanPlayer.name} won!`:`${aiPlayer.name} won!`;
                     aiPlayer.isTurnOf = false;
                    humanPlayer.isTurnOf = false;
                    winner = true;
                    console.log('conditional 4');
                    return true;
                }
                
                else if ((gameBoard.fields['f2'] == humanPlayer.marker &&
                gameBoard.fields['f5'] == humanPlayer.marker &&
                gameBoard.fields['f8'] == humanPlayer.marker) ||
                (gameBoard.fields['f2'] == aiPlayer.marker &&
                gameBoard.fields['f5'] == aiPlayer.marker &&
                gameBoard.fields['f8'] == aiPlayer.marker))
                {
                    winnerField.textContent = gameBoard.fields['f2'] ==
                     humanPlayer.marker ?
                     `${humanPlayer.name} won!`:`${aiPlayer.name} won!`;
                     aiPlayer.isTurnOf = false;
                    humanPlayer.isTurnOf = false;
                    winner = true;
                    console.log('conditional 5');
                    return true;
                }
                
                else if ((gameBoard.fields['f3'] == humanPlayer.marker &&
                gameBoard.fields['f6'] == humanPlayer.marker &&
                gameBoard.fields['f9'] == humanPlayer.marker) ||
                (gameBoard.fields['f3'] == aiPlayer.marker &&
                gameBoard.fields['f6'] == aiPlayer.marker &&
                gameBoard.fields['f9'] == aiPlayer.marker))
                {
                    winnerField.textContent = gameBoard.fields['f3'] ==
                     humanPlayer.marker ?
                     `${humanPlayer.name} won!`:`${aiPlayer.name} won!`;
                     aiPlayer.isTurnOf = false;
                    humanPlayer.isTurnOf = false;
                    winner = true;
                    console.log('conditional 6');
                    return true;
                }
                
                else if ((gameBoard.fields['f1'] == humanPlayer.marker &&
                gameBoard.fields['f5'] == humanPlayer.marker &&
                gameBoard.fields['f9'] == humanPlayer.marker) ||
                (gameBoard.fields['f1'] == aiPlayer.marker &&
                gameBoard.fields['f5'] == aiPlayer.marker &&
                gameBoard.fields['f9'] == aiPlayer.marker))
                {
                    winnerField.textContent = gameBoard.fields['f1'] ==
                     humanPlayer.marker ?
                     `${humanPlayer.name} won!`:`${aiPlayer.name} won!`;
                     aiPlayer.isTurnOf = false;
                    humanPlayer.isTurnOf = false;
                    winner = true;
                    console.log('conditional 7');
                    return true;
                }
                
            else if ((gameBoard.fields['f3'] == humanPlayer.marker &&
                gameBoard.fields['f5'] == humanPlayer.marker &&
                gameBoard.fields['f7'] == humanPlayer.marker) ||
                (gameBoard.fields['f3'] == aiPlayer.marker &&
                gameBoard.fields['f5'] == aiPlayer.marker &&
                gameBoard.fields['f7'] == aiPlayer.marker))
                {
                    winnerField.textContent = gameBoard.fields['f3'] ==
                     humanPlayer.marker ?
                     `${humanPlayer.name} won!`:`${aiPlayer.name} won!`;
                     aiPlayer.isTurnOf = false;
                    humanPlayer.isTurnOf = false;
                    winner = true;
                    console.log('conditional 8');
                    return true;
                }
                else
                {
                return false;
                }
            }
            }
            
        }
    })();
    
