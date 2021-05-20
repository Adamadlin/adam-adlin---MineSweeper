const MINE = '🧨';
const EMPTY = ' ';
var gSize = 4;
var gscore = 0

var gBoard;

var gLevel = {
    SIZE: 4,
    MINES: 2
}



function init() {
    var gBoard = buildBoard(gSize)
    renderBoard(gBoard)
    // renderCell(gBoard[1][1].location, MINE)

}


function buildBoard(gSize) {
    var board = [];
    for (var i = 0; i < gSize; i++) {
        board[i] = [];
        for (var j = 0; j < gSize; j++) {
            var cell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false,
                // board: MINE,
                location: { i: i, j: j }
            }
            board[i][j] = cell

            // console.log(cell.location.i)
        }
    }


    board[1][2].isMine = true;
    board[3][1].isMine = true;


    console.log(board)
    return board;
}
// function countFoodAround(mat, rowIdx, colIdx) { // 4 , 0

//     var foodCount = 0;
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) { // 3 4 5
//         if (i < 0 || i > mat.length - 1) continue;
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (j < 0 || j > mat[0].length - 1) continue;
//             if (i === rowIdx && j === colIdx) continue
//             var cell = mat[i][j];
//             // console.log('cell', cell);
//             if (cell === food) foodCount++

//         }
//     }
//     return foodCount

// function countNeighbours(board, rowIdx, colIdx) {
//     var counterneighbours = 0
//     for (var j = colIdx - 1; j <= colIdx + 1; j++) continue
//     if (j < 0 || j > mat[0].length - 1) continue;
//     if (i === rowIdx && j === colIdx) continue
//     var cell = board[i][j];
//     console.log('cell', cell);
//     if (cell === food) foodCount++
// }



function renderBoard(board) {
    var strHtml = '<table><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })
            if (board[i][j].isMine === true) {
                strHtml += `<td class= "cell ${cellClass}" onclick="cellClicked(this ,${cell.location})"> ${MINE} </td>`
            } else {
                strHtml += `<td class="cell ${cellClass}" onclick="cellClicked(this ,${cell.location})"> ${EMPTY} </td>`
            }
        }
        strHtml += '</tr>'
    }
    strHtml += '</tbody></table>'
    console.log(strHtml)

    var elTbody = document.querySelector('.board-container')


    elTbody.innerHTML = strHtml
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

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}
function getCellCoord(strCellClasss) {
    var parts = strCellClasss.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}