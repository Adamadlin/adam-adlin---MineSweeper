const MINE = '🧨';
var gSize = 4;
var gscore = 0

var gBoard;

var gLevel = {
    SIZE: 4,
    MINES: 2
}



function init() {
    var gBoard = creatBoard(gSize)
    renderBoard(gBoard)
}


function creatBoard(gSize) {
    var board = [];
    for (var i = 0; i < gSize; i++) {
        board[i] = [];
        for (var j = 0; j < gSize; j++) {
            var cell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false,
                location: { i: i, j: j }
            }
            board[i][j] = cell

        }
    }

    console.log(board)
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell cell-' + i + '-' + j;
            strHtml += `<td class="${className}" onclick="cellClicked(this ,${cell.location})">  </td>`
        }
        strHtml += '</tr>'
    }

    // renderCell(board[1][1].location, MINE)

    var elTable = document.querySelector('.board')
    elTable.innerHTML = strHtml
}


function difficulty(elBtn) {
    if (elBtn.innerText === 'Easy') {
        gSize = 4
        // console.log(gSize)
    } else if (elBtn.innerText === 'Medium') {
        gSize = 8
        // console.log(gSize)
    } else if ((elBtn.innerText === 'Hard')) {
        gSize = 12
        //console.log(gSize)
    }
    init()
}



function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell cell-${location.i}-${location.j}`);
    elCell.innerText = value;
}

