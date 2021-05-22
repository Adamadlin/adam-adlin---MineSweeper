const MINE = '🧨';
const EMPTY = ' ';
var NUMBERS;
var gSize = 4;
var gscore = 0

var gBoard;

const boardArr = [];

var gLevel = {
    size: 4,
    mines: 2
}

gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
let timer = 0
let timerh2 = document.getElementById('timer')
let firstClick = false

function tableClicked() {
    if (!firstClick) {
        firstClick = true
        setInterval(() => {
            timer++
            timerh2.innerHTML = timer
        }, 1000
        );
    }

}




function init() {
    gBoard = buildBoard()

    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    randomCell()



    setMinesNegsCount(gSize)


}

var gCell
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function randomCell() {
    var idxI = getRandomInt(0, gLevel.size)
    var idxJ = getRandomInt(0, gLevel.size)


    return { idxI, idxJ }
}

function buildBoard() {
    var board = [];
    var minePosition = minePos(gLevel.size, gLevel.mines)

    for (i = 0; i < gLevel.size; i++) {
        board.push([])
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,

            }
            if (minePosition.some(p => positionsMatch(p, { x: i, y: j }))) {
                cell.isMine = true
            }
            board[i][j] = cell
            console.log(minePosition, i, j)


        }
    }


    for (var i = 0; i < gLevel.MINES; i++) {
        var locationRandomCell = randomCell();
        board[locationRandomCell.idxI][locationRandomCell.idxJ].isMine = true;
    }

    return board;
}



function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]
            currCell.minesAroundCount = countMinesAround(board, i, j)

        }
    }

}
function countMinesAround(board, rowIdx, colIdx) {

    var minesaround = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j];

            if (cell.isMine === true) minesaround++

        }
    }
    return minesaround
}





function renderBoard(board) {
    var strHtml = '<table onclick="tableClicked()"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cellid = 'cell-' + i + '-' + j;
            strHtml += `<td class="cell ${cellid}" onclick="cellClicked(this ,${i},${j} )"></td>`
        }
        strHtml += '</tr>'
    }
    strHtml += '</tbody></table>'
    var elTbody = document.querySelector('.board-container')


    elTbody.innerHTML = strHtml

}


function cellClicked(elCell, i, j) {
    var currCell = gBoard[i][j]
    currCell.isShown = true



    elCell.innerText = currCell.isMine ? MINE : currCell.minesAroundCount

    if (currCell.isMine) {
        document.getElementById('losewin').innerHTML = 'you lose'
    } else {
        name()
    }



}

function name() {
    for (i = 0; i < gLevel.size; i++) {

        for (var j = 0; j < gLevel.size; j++) {
            var s = gBoard[i][j]
            if (s.isMine === false && s.isShown === false) {
                return
            } else {
                document.getElementById('losewin').innerHTML = 'you win'
            }
        }
    }
}

function minePos(boardpos, numberofmines) {
    var positions = []






    while (positions.length < numberofmines) {
        var position = {

            x: randomNumber(boardpos),
            y: randomNumber(boardpos)
        }

        if (!positions.some(p => positionsMatch(p, position))) {
            positions.push(position)
        }

    }

    return positions
}

function positionsMatch(i, j) {
    return i.x === j.x && i.y === j.y

}

function randomNumber(size) {
    return Math.floor(Math.random() * size)
}

function difficulty(elBtn) {
    if (elBtn.innerText === 'Easy') {
        gLevel.size = 4

    } else if (elBtn.innerText === 'Medium') {
        gLevel.size = 8

    } else if ((elBtn.innerText === 'Hard')) {
        gLevel.size = 12

        init()
    }
}



function renderCell(location, value) {

    var elCell = document.querySelector(`.cell cell-${location.i}-${location.j}`);
    elCell.innerText = value;
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;

    return cellClass;
}
function getCellCoord(strCellClasss) {
    var parts = strCellClasss.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}
