// Selecting HTML elements
const next = document.getElementById('play');
const reset = document.getElementById('reset');
const count = document.getElementById('count') as HTMLBodyElement;

let countVar = 0;
// initialising Canvas
const app = document.getElementById("canvasApp") as HTMLCanvasElement;
const ctx = app.getContext('2d');

const B_ROWS = 32;
const B_COLS = 32;

let board: string[][] = [];

for(let r = 0; r < B_ROWS; ++r)
{
    board.push(Array(B_COLS).fill('dead'));
}


if(ctx === null)
{
    throw new Error('Could not initialize 2d context');
}

const CELL_WIDTH = app.width / B_COLS;
const CELL_HEIGHT = app.height / B_ROWS;

function defaultBackg (ctx: CanvasRenderingContext2D): void{
    ctx.fillStyle = "#181818";
    ctx.fillRect(0,0,app.width,app.height);
}

function render(ctx: CanvasRenderingContext2D): void 
{

defaultBackg(ctx);
ctx.fillStyle = "#703CFF";

for(let r = 0; r < B_ROWS; ++r)
{
    for(let c = 0; c < B_COLS; ++c)
    {
        if(board[r][c] == 'alive')
        {
            const x = c*CELL_WIDTH;
            const y = r*CELL_HEIGHT;    
            ctx.fillRect(x,y,CELL_WIDTH,CELL_HEIGHT); 
        }
    }
}}

function neighboursCount(row:number,col: number): number 
{
    let nLiveCount = 0;
    if(row > 0 && col > 0 && row < 32 && col < 32)
    {
        for(let i = Math.max(0, row - 1); i <= Math.min(B_ROWS - 1, row + 1);i++)
        {
            for(let j = Math.max(0, col - 1);j <= Math.min(B_COLS - 1, col + 1); j++)
            {
                if (!(i === row && j === col) && board[i][j] == 'alive') {
                    nLiveCount++;
                }
            }
        }
    }
    return nLiveCount;
}

function generateNextBoard(ctx: CanvasRenderingContext2D): void 
{
 const newBoard: string[][] = [];
 for(let r = 0; r < B_ROWS; ++r)
    {
        const newRow: string[] = [];
        for(let c = 0; c < B_COLS; ++c)
        {

            const nLive = neighboursCount(r,c);
            nLive > 0 ? console.log(nLive) : NaN; 
            if (board[r][c] == 'alive') {
                // Live cell
                if (nLive === 2 || nLive === 3) {
                    newRow.push('alive');  // Survives
                } else {
                    newRow.push('dead');  // Dies
                }
            } else {
                // Dead cell
                if (nLive === 3) {
                    newRow.push('alive');  // Becomes alive
                } else {
                    newRow.push('dead');  // Stays dead
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

app.addEventListener('click', (e) => {
    const col = Math.floor(e.offsetX / CELL_WIDTH);
    const row = Math.floor(e.offsetY / CELL_HEIGHT); // Floor it because it is FLOAT
    if(board[row][col] == 'alive')
        board[row][col] = 'dead'
    else 
        board[row][col] = 'alive';
    // console.log(`client: ${[e.offsetX,e.offsetY]}`);
    render(ctx);
})

reset?.addEventListener('click',(e)=> {
defaultBackg(ctx);
for(let r = 0; r < B_ROWS; ++r)
{
    for(let c = 0; c < B_COLS; ++c)
    {
        if(board[r][c] == 'alive')
        {
            board[r][c] = 'dead';
        }
    }
}
countVar = 0;
count.innerHTML = ``;
render(ctx);
});

next?.addEventListener('click',(e) => {
    //console.log(e);
    generateNextBoard(ctx);
})
render(ctx);

