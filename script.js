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

    switch (fields) {
        case fields[0]==fields[1] && fields[1]==fields[2]:
            winnerField.textContent = "something, somehow";
            break;
        case fields[0]==fields[1] && fields[1]==fields[2]:
            winnerField.textContent = "something, somehow";
            break;
            
        case fields[0]==fields[1] && fields[1]==fields[2]:
            winnerField.textContent = "something, somehow";
            break;
        
        case fields[0]==fields[1] && fields[1]==fields[2]:
        winnerField.textContent = "something, somehow";
        break;
        
        case fields[0]==fields[1] && fields[1]==fields[2]:
        winnerField.textContent = "something, somehow";
        break;
        
        case fields[0]==fields[1] && fields[1]==fields[2]:
        winnerField.textContent = "something, somehow";
        break;
        
        case fields[0]==fields[1] && fields[1]==fields[2]:
            winnerField.textContent = "something, somehow";
            break;
        
            case fields[0]==fields[1] && fields[1]==fields[2]:
            winnerField.textContent = "something, somehow";
            break;
    
        default:
            break;
    }

    return fields;
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
    xButton.disabled = true;
    oButton.disabled = true;
})

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
        while (turns.first.isTurnOf = true)
        {
            //mark the board
            //wait for current player field choice
            //pass the turn to other player
        }
})

function drawBoard()
{
    for (field in gameBoard)
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


humanPlayer.isTurnOf = true;
