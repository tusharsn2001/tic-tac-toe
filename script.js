
let board = [['', '', ''], ['', '', ''], ['', '', '']];

let player1 = true
let player2 = false
let boxes = [];
let available = [];
let availableCount = 9;

let url1 = `url('./player1.png')`;
let url2 = `url('./player2.png')`;

let turn = document.getElementById('turn')
turn.innerText = 'Turn : X'

function initialize() {
    for (let i = 0; i < 3; i++) {
        boxes[i] = []
    }


    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            boxes[i][j] = document.getElementById(`${i * 3 + j}`)
        }

    }



}

function play() {
    initialize();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            (function (i, j) {
                boxes[i][j].addEventListener('click', function () {
                    clicked(i, j);
                }, false);
            })(i, j);
        }
    }

}

// reset
let reset = document.getElementById('reset')
reset.addEventListener('click', () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = ''
            boxes[i][j].innerHTML = null
            boxes[i][j].style.backgroundImage = 'none';
        }
    }
    player1 = true
    player2 = false
    winner = null
    availableCount = 9
    turn.innerText = 'Turn : X'

})


function clicked(i, j) {

    board[i][j] = playerTurn()
    availableCount--;
    //  boxes[i][j].innerHTML = board[i][j]
    boxes[i][j].style.backgroundImage = board[i][j] == 'X' ? url1 : url2
    checkWinner()

}

play()


// for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//         boxes[i][j].addEventListener('click', function () {
//             clicked(i, j)
//         }, false)
//     }

// }






function playerTurn() {
    if (player1) {
        turn.innerText = 'Turn : O'
        player1 = false
        player2 = true

        return 'X'
    }
    else {
        turn.innerText = 'Turn : X'
        player2 = false
        player1 = true
        return 'O'
    }
}


function checkWinner() {

    let winner = null;

    // horizontal

    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // vertical

    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }


    // diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[0][2], board[1][1], board[2][0])) {
        winner = board[1][1];
    }



    if (winner == null && availableCount == 0) {
        turn.innerText = 'Tie'
        console.log('Tie')
        availableCount = 9
    }
    else if (winner != null) {
        turn.innerText = `Winner : ${winner == 'X' ? 'X' : 'O'}`
        console.log(`Winner is ${winner}`)
        winner = null
    }
}


function equals3(a, b, c) {
    return (a == b && b == c && a != '')

}