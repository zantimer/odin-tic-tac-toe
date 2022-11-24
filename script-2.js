//player factory
//display controller
//gameboard
//game flow logic
xBtn = document.querySelector('.X');
oBtn = document.querySelector('.O');
const playerFactory = (name, marker, pick) =>
{
    let isTurnOf = false;
    return {name, marker, pick, isTurnOf}
}

const humanPlayer = playerFactory(prompt('Insert name'), undefined, /*humanPick*/);
const aiPlayer = playerFactory(`${humanPlayer.name} but AI`, undefined, /*aiPick*/);

const gameBoard = (() =>{
    const fields = new Array(9);

    const drawBoard = (a, b) => a + b;

    return {fields, drawBoard}
})();



const displayController = (() =>{
    const drawBoard = (fields) => {
        let i = 0;
        for(field in fields)
            {
                
                const div = document.createElement('div');
                const p = document.createElement('p');

                document.body.appendChild(div);
                div.classList.add('grid');
                div.classList.add(`field`+i);
                
                div.appendChild(p)
                div.addEventListener('click', ()=>{
                    if (p.textContent == '' && humanPlayer.isTurnOf)
                    {
                        p.textContent = humanPlayer.marker;
                        gameBoard.fields[div.classList.item(1).charAt(5)] = humanPlayer.marker;
                    }
                })
                    i++;
                }
        }

        
        return {drawBoard}
    })();
    
    const gameFlow = (()=>{

    })();

    //testlines
    for (let i = 0; i<9; i++)
    {
        gameBoard.fields[i] = '';
    }
    displayController.drawBoard(gameBoard.fields)
    humanPlayer.isTurnOf = true;
    humanPlayer.marker = 'x';
    