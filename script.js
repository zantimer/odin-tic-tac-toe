//game logic

const gameBoard = (()=>
{
    const fields = {topLeft:'X',
    topCenter: 'X',
    topRight: 'X',
    centerLeft:'X',
    center: 'X',
    centerRight: 'X',
    bottomLeft:'X',
    bottomCenter: 'X',
    bottomRight: 'X',}

    return fields;
})();

const gameFlow = ((playerA, playerB)=>
{
    //1. decide whose turn it is
    //2. decide whose turn is it next
    //3. decide what marker to put down
    //4. decide where
    //5. pass over turn to next player
    
    const playerTurns = {current:undefined,
    next: undefined}
    if(playerA.marker == 'X')
    {
        playerTurns.current = playerA;
        playerTurns.next = playerB;
    }
    else
    {
        playerTurns.current = playerB;
        playerTurns.next = playerA;
    }

})();

//player factory logic

const playerFactory = (name) =>{
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
}

const actualPlayer = (name) => {
    const {sayName} = playerFactory(name);
    const pickLogic = () => console.log('Pick logic will be here');
    return {sayName, pickLogic};
}

const humanPlayer = actualPlayer('John doe');

