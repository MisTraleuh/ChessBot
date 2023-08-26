const boardSize = 8;
const chessboard = document.getElementById('chessboard');

const pieceMap = {
    'R': 'r',
    'N': 'n',
    'B': 'b',
    'K': 'k',
    'Q': 'q',
    'P': 'p'
};

let selectedColor = 'white';

let initialConfiguration = [
    /* Black pieces */
    ['br2', 8, 8],
    ['bn2', 7, 8],
    ['bb2', 6, 8],
    ['bq1', 5, 8],
    ['bk1', 4, 8],
    ['bb1', 3, 8],
    ['bn1', 2, 8],
    ['br1', 1, 8],
    ['bp1', 8, 7],
    ['bp1', 7, 7],
    ['bp1', 6, 7],
    ['bp1', 5, 7],
    ['bp1', 4, 7],
    ['bp1', 3, 7],
    ['bp1', 2, 7],
    ['bp1', 1, 7],
    /* White pieces */
    ['wp8', 8, 2],
    ['wp7', 7, 2],
    ['wp6', 6, 2],
    ['wp5', 5, 2],
    ['wp4', 4, 2],
    ['wp3', 3, 2],
    ['wp2', 2, 2],
    ['wp1', 1, 2],
    ['wr2', 8, 1],
    ['wn2', 7, 1],
    ['wb2', 6, 1],
    ['wq1', 5, 1],
    ['wk1', 4, 1],
    ['wb1', 3, 1],
    ['wn1', 2, 1],
    ['wr1', 1, 1],
]

function setupBoard(selectedColor) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
    
            if ((i + j) % 2 === 0) {
                square.classList.add("white");
            } else {
                square.classList.add('black');
            }
            for (let piece in initialConfiguration) {
                piece = initialConfiguration[piece];
                if (selectedColor === 'black' && piece[1] === j + 1 && piece[2] === i + 1) {
                    const img = document.createElement('img');
                    img.src = `assets/pieces/${piece[0][0] === 'w' ? 'white' : 'black'}/${piece[0].substr(0, 2)}.png`;
                    square.appendChild(img);
                } else if (selectedColor === 'white' && piece[1] === 8 - j && piece[2] === 8 - i) {
                    const img = document.createElement('img');
                    img.src = `assets/pieces/${piece[0][0] === 'w' ? 'white' : 'black'}/${piece[0].substr(0, 2)}.png`;
                    square.appendChild(img);
                }
            }
            chessboard.appendChild(square);
        }
    }
}


document.getElementById('colorChoice').addEventListener('change', function(e) {
    const oldTiles = document.querySelectorAll('.square');
    oldTiles.forEach(tile => tile.remove());
    selectedColor = e.target.value;
    setupBoard(selectedColor);
});

setupBoard(selectedColor);

/*****************************************************
*                 GET CONTENT OF PAGE                *
*****************************************************/

let indexContent = 0;
let lastMove = '';

function parseMoves(moves) {
    console.log("parseMoves => move:", moves);
    let res = '';

    for (move of moves) {
        if (move.lastElementChild?.classList.contains('icon-font-chess')) {
            res += move.lastElementChild.getAttribute('data-figurine') + move.innerText + '/';
        } else {
            res += move.innerText + '/';
        }
    }
    console.log("GetMoveFunction => res:", res);
    return res;
}

function fetchContent() {
    chrome.runtime.sendMessage({ text: 'get_last_content' }, (response) => {
        console.log(new Date().toLocaleString(), 'fetchContent loaded');
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        const element = doc.querySelectorAll('.node');

        console.log("doc.querySelectorAll", element);
        if (element && element.length > 0) {
            if (lastMove == parseMoves(element).split("/").pop()) {
                console.log("No new content");
                return;
            }
            lastMove = parseMoves(element).split("/").pop();
            const oldTiles = document.querySelectorAll('.square');
            oldTiles.forEach(tile => tile.remove());
            setupBoard(selectedColor);
        } else {
            console.log("Element non trouve");
        }
    });
}

setInterval(fetchContent, 1000);
