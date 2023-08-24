const boardSize = 8;
const chessboard = document.getElementById('chessboard');

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const square = document.createElement('div');
        square.classList.add('square');

        if ((i + j) % 2 === 0) {
            square.classList.add('lightBrown');
        } else {
            square.classList.add('darkBrown');
        }

        chessboard.appendChild(square);
    }
}

document.getElementById('colorChoice').addEventListener('change', function(e) {
    const oldTiles = document.querySelectorAll('.square');
    oldTiles.forEach(tile => tile.remove());
    let selectedColor = e.target.value;
    const otherColor = selectedColor === 'white' ? 'darkBrown' : 'lightBrown';
    selectedColor = selectedColor === 'white' ? 'lightBrown' : 'darkBrown';

    console.log(selectedColor, otherColor);
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
    
            if ((i + j) % 2 === 0) {
                square.classList.add(selectedColor);
            } else {
                square.classList.add(otherColor);
            }
    
            chessboard.appendChild(square);
        }
    }
});

