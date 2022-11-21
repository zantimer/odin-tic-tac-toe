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
    
        turns.first.isTurnOf = true;
        
        if(turns.first == aiPlayer && 
            (gameBoard.fields.f1 != 'X'||'O' &&
            gameBoard.fields.f2 != 'X'||'O' &&
            gameBoard.fields.f3 != 'X'||'O' &&
            gameBoard.fields.f4 != 'X'||'O' &&
            gameBoard.fields.f5 != 'X'||'O' &&
            gameBoard.fields.f6 != 'X'||'O' &&
            gameBoard.fields.f7 != 'X'||'O' &&
            gameBoard.fields.f8 != 'X'||'O' &&
            gameBoard.fields.f9 != 'X'||'O'))
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
        function CheckWinner(gameBoard, p) {
            p.addEventListener('click', () =>{
                
            if ((gameBoard.fields['f1'] == 'X' &&
                gameBoard.fields['f2'] == 'X' &&
                gameBoard.fields['f3'] == 'X') ||
                (gameBoard.fields['f1'] == 'O' &&
                gameBoard.fields['f2'] == 'O' &&
                gameBoard.fields['f3'] == 'O'))
                {
                    winnerField.textContent = "something, somehow";
                
                }
                
                else if ((gameBoard.fields['f4'] == 'X' &&
                gameBoard.fields['f5'] == 'X' &&
                gameBoard.fields['f6'] == 'X' )||
                (gameBoard.fields['f4'] == 'O' &&
                gameBoard.fields['f5'] == 'O' &&
                gameBoard.fields['f6'] == 'O'))
                {
                winnerField.textContent = "something, somehow";
                
                }
                
                else if ((gameBoard.fields['f7'] == 'X' &&
                gameBoard.fields['f8'] == 'X' &&
                gameBoard.fields['f9'] == 'X') ||
                (gameBoard.fields['f7'] == 'O' &&
                gameBoard.fields['f8'] == 'O' &&
                gameBoard.fields['f9'] == 'O'))
                {winnerField.textContent = "something, somehow";
                }

            else if ((gameBoard.fields['f1'] == 'X' &&
                gameBoard.fields['f4'] == 'X' &&
                gameBoard.fields['f7'] == 'X' )||
                (gameBoard.fields['f1'] == 'O' &&
                gameBoard.fields['f4'] == 'O' &&
                gameBoard.fields['f7'] == 'O'))
                {winnerField.textContent = "something, somehow";
                }
                
                else if ((gameBoard.fields['f2'] == 'X' &&
                gameBoard.fields['f5'] == 'X' &&
                gameBoard.fields['f8'] == 'X') ||
                (gameBoard.fields['f2'] == 'O' &&
                gameBoard.fields['f5'] == 'O' &&
                gameBoard.fields['f8'] == 'O'))
                {winnerField.textContent = "something, somehow";
                }
                
                else if ((gameBoard.fields['f3'] == 'X' &&
                gameBoard.fields['f4'] == 'X' &&
                gameBoard.fields['f9'] == 'X') ||
                (gameBoard.fields['f3'] == 'O' &&
                gameBoard.fields['f4'] == 'O' &&
                gameBoard.fields['f9'] == 'O'))
                {winnerField.textContent = "something, somehow";
                }
                
                else if ((gameBoard.fields['f1'] == 'X' &&
                gameBoard.fields['f5'] == 'X' &&
                gameBoard.fields['f9'] == 'X') ||
                (gameBoard.fields['f1'] == 'O' &&
                gameBoard.fields['f5'] == 'O' &&
                gameBoard.fields['f9'] == 'O'))
                {winnerField.textContent = "something, somehow";
                }
                
            else if ((gameBoard.fields['f3'] == 'X' &&
                gameBoard.fields['f5'] == 'X' &&
                gameBoard.fields['f7'] == 'X') ||
                (gameBoard.fields['f3'] == 'O' &&
                gameBoard.fields['f5'] == 'O' &&
                gameBoard.fields['f7'] == 'O'))
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
            
            div.id = 'field';
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
                    gameBoard.fields[div.classList.item(0)] = humanPlayer.marker;
                    humanPlayer.isTurnOf = false;
                    turns.first = aiPlayer;
                    startGame();
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
            
        }
        const resetBtn = document.createElement('button');
        document.body.appendChild(resetBtn);
        resetBtn.classList.add('resetBtn');
        resetBtn.textContent = "Reset game"
        resetBtn.addEventListener('click', resetGame);
    })();
    
