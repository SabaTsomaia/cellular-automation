"use strict";
// Selecting HTML elements
const next = document.getElementById('play');
const reset = document.getElementById('reset');
const count = document.getElementById('count');
let countVar = 0;
// initialising Canvas
const app = document.getElementById("canvasApp");
const ctx = app.getContext('2d');
const B_ROWS = 32;
const B_COLS = 32;
let board = [];
for (let r = 0; r < B_ROWS; ++r) {
    board.push(Array(B_COLS).fill('dead'));
}
if (ctx === null) {
    throw new Error('Could not initialize 2d context');
}
const CELL_WIDTH = app.width / B_COLS;
const CELL_HEIGHT = app.height / B_ROWS;
function defaultBackg(ctx) {
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, app.width, app.height);
}
function render(ctx) {
    defaultBackg(ctx);
    ctx.fillStyle = "#703CFF";
    for (let r = 0; r < B_ROWS; ++r) {
        for (let c = 0; c < B_COLS; ++c) {
            if (board[r][c] == 'alive') {
                const x = c * CELL_WIDTH;
                const y = r * CELL_HEIGHT;
                ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
            }
        }
    }
}
function neighboursCount(row, col) {
    let nLiveCount = 0;
    if (row > 0 && col > 0 && row < B_ROWS && col < B_COLS) {
        for (let i = Math.max(0, row - 1); i <= Math.min(B_ROWS - 1, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(B_COLS - 1, col + 1); j++) {
                if (!(i === row && j === col) && board[i][j] == 'alive') {
                    nLiveCount++;
                }
            }
        }
    }
    return nLiveCount;
}
function generateNextBoard(ctx) {
    const newBoard = [];
    for (let r = 0; r < B_ROWS; ++r) {
        const newRow = [];
        for (let c = 0; c < B_COLS; ++c) {
            const nLive = neighboursCount(r, c);
            nLive > 0 ? console.log(nLive) : NaN;
            if (board[r][c] == 'alive') {
                // Live cell
                if (nLive === 2 || nLive === 3) {
                    newRow.push('alive'); // Survives
                }
                else {
                    newRow.push('dead'); // Dies
                }
            }
            else {
                // Dead cell
                if (nLive === 3) {
                    newRow.push('alive'); // Becomes alive
                }
                else {
                    newRow.push('dead'); // Stays dead
                }
            }
        }
        newBoard.push(newRow);
    }
    board = newBoard;
    countVar++;
    count.innerHTML = `T-${countVar}`;
    render(ctx);
}
// Handling Clicks
app.addEventListener('click', (e) => {
    const col = Math.floor(e.offsetX / CELL_WIDTH);
    const row = Math.floor(e.offsetY / CELL_HEIGHT); // Floor it because it is FLOAT
    if (board[row][col] == 'alive')
        board[row][col] = 'dead';
    else
        board[row][col] = 'alive';
    // console.log(`client: ${[e.offsetX,e.offsetY]}`);
    render(ctx);
});
// Handling Drawing-like function
let isMouseDown = false;
app.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    paintCell(e, ctx);
});
app.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        paintCell(e, ctx);
    }
});
app.addEventListener('mouseup', () => {
    isMouseDown = false;
});
app.addEventListener('mouseout', () => {
    isMouseDown = false;
});
function paintCell(e, ctx) {
    const col = Math.floor(e.offsetX / CELL_WIDTH);
    const row = Math.floor(e.offsetY / CELL_HEIGHT);
    board[row][col] = 'alive';
    render(ctx);
}
reset === null || reset === void 0 ? void 0 : reset.addEventListener('click', (e) => {
    defaultBackg(ctx);
    for (let r = 0; r < B_ROWS; ++r) {
        for (let c = 0; c < B_COLS; ++c) {
            if (board[r][c] == 'alive') {
                board[r][c] = 'dead';
            }
        }
    }
    countVar = 0;
    count.innerHTML = ``;
    render(ctx);
});
next === null || next === void 0 ? void 0 : next.addEventListener('click', (e) => {
    //console.log(e);
    generateNextBoard(ctx);
});
render(ctx);
