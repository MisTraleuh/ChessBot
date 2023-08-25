const boardSize = 8;
const chessboard = document.getElementById('chessboard');

const initialConfiguration = {
    'white': [
        ['wr', 0, 0],
        ['wn', 0, 1],
        ['wb', 0, 2],
        ['wk', 0, 3],
        ['wq', 0, 4],
        ['wb', 0, 5],
        ['wn', 0, 6],
        ['wr', 0, 7],
        ['wp', 1, 0],
        ['wp', 1, 1],
        ['wp', 1, 2],
        ['wp', 1, 3],
        ['wp', 1, 4],
        ['wp', 1, 5],
        ['wp', 1, 6],
        ['wp', 1, 7]
    ],
    'black': [
        ['br', 7, 0],
        ['bn', 7, 1],
        ['bb', 7, 2],
        ['bk', 7, 3],
        ['bq', 7, 4],
        ['bb', 7, 5],
        ['bn', 7, 6],
        ['br', 7, 7],
        ['bp', 6, 0],
        ['bp', 6, 1],
        ['bp', 6, 2],
        ['bp', 6, 3],
        ['bp', 6, 4],
        ['bp', 6, 5],
        ['bp', 6, 6],
        ['bp', 6, 7]
    ]
};

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
            for (let color in initialConfiguration) {
                for (let piece in initialConfiguration[color]) {
                    piece = initialConfiguration[color][piece];
                    if (selectedColor === 'black' && piece[1] === i && piece[2] === j) {
                        const img = document.createElement('img');
                        img.src = `assets/pieces/${color}/${piece[0]}.png`;
                        square.appendChild(img);
                    } else if (selectedColor === 'white' && piece[1] === 7 - i && piece[2] === 7 - j) {
                        const img = document.createElement('img');
                        img.src = `assets/pieces/${color}/${piece[0]}.png`;
                        square.appendChild(img);
                    }
                }
            }
            chessboard.appendChild(square);
        }
    }
}


document.getElementById('colorChoice').addEventListener('change', function(e) {
    const oldTiles = document.querySelectorAll('.square');
    oldTiles.forEach(tile => tile.remove());
    let selectedColor = e.target.value;
    setupBoard(selectedColor);
});

setupBoard('white');

function fetchContent() {
    chrome.runtime.sendMessage({ text: 'get_last_content' }, (response) => {
        console.log(new Date().toLocaleString(), 'fetchContent loaded');
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
        const element = doc.querySelector('chess-board.board');

        if (element) {
            console.log(element.outerHTML);
        } else {
            console.log("Element non trouve");
        }
    });
}

setInterval(fetchContent, 1000);
