const boardSize = 8;
const chessboard = document.getElementById('chessboard');

let selectedColor = 'white';

const initialConfiguration = [
    /* Black pieces */
    ['br2', 8, 8],
    ['bn2', 8, 7],
    ['bb2', 8, 6],
    ['bq1', 8, 5],
    ['bk1', 8, 4],
    ['bb1', 8, 3],
    ['bn1', 8, 2],
    ['br1', 8, 1],
    ['bp1', 7, 8],
    ['bp1', 7, 7],
    ['bp1', 7, 6],
    ['bp1', 7, 5],
    ['bp1', 7, 4],
    ['bp1', 7, 3],
    ['bp1', 7, 2],
    ['bp1', 7, 1],
    /* White pieces */
    ['wp8', 2, 8],
    ['wp7', 2, 7],
    ['wp6', 2, 6],
    ['wp5', 2, 5],
    ['wp4', 2, 4],
    ['wp3', 2, 3],
    ['wp2', 2, 2],
    ['wp1', 2, 1],
    ['wr2', 1, 8],
    ['wn2', 1, 7],
    ['wb2', 1, 6],
    ['wq1', 1, 5],
    ['wk1', 1, 4],
    ['wb1', 1, 3],
    ['wn1', 1, 2],
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
                if (selectedColor === 'black' && piece[1] === i + 1 && piece[2] === j + 1) {
                    const img = document.createElement('img');
                    img.src = `assets/pieces/${piece[0][0] === 'w' ? 'white' : 'black'}/${piece[0].substr(0, 2)}.png`;
                    square.appendChild(img);
                } else if (selectedColor === 'white' && piece[1] === 8 - i && piece[2] === 8 - j) {
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
function parsePieces(content) {
    let newContent = content.substr(content.indexOf('<!--/Effects-->') + 16);
    newContent = newContent.substr(newContent.indexOf('<!--/Effects-->') + 15);
    let pieces = newContent.split('</div>');
    pieces.pop();
    let piecesSorted = [];
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].indexOf('element-pool') !== -1) {
            piecesSorted.push([-1, -1]);
            continue;
        }
        let positions = pieces[i].split(' ')[3].substr(7, 2);
        let x = parseInt(positions[0]);
        let y = parseInt(positions[1]);

        piecesSorted.push([x, y]);
    }
    for (let i = 0; i < piecesSorted.length; i++) {
        initialConfiguration[i][2] = piecesSorted[i][0];
        initialConfiguration[i][1] = piecesSorted[i][1];
    }
}

function fetchContent() {
    chrome.runtime.sendMessage({ text: 'get_last_content' }, (response) => {
        console.log(new Date().toLocaleString(), 'fetchContent loaded');
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        const element = doc.querySelector('chess-board.board');

        if (element) {
            parsePieces(element.outerHTML);
            const oldTiles = document.querySelectorAll('.square');
            oldTiles.forEach(tile => tile.remove());
            setupBoard(selectedColor);
        } else {
            console.log("Element non trouve");
        }
    });
}

setInterval(fetchContent, 1000);
