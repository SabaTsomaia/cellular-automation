const play = document.getElementById('play');
const reset = document.getElementById('reset');

const B_ROWS = 32;
const B_COLS = 32;

type State = 'alive' | 'dead';

const stateColor = ["#202020","FF5050"];

const board: Array<Array<State>> = [];
for(let r = 0; r < B_ROWS; ++r)
{
    board.push(new Array(B_COLS).fill('dead'));
}

const app = document.getElementById("canvasApp") as HTMLCanvasElement;
app.width = 600;
app.height = 600;

const ctx = app.getContext('2d');
if(ctx === null)
{
    throw new Error('Could not initialize 2d context');
}

const CELL_WIDTH = app.width / B_COLS;
const CELL_HEIGHT = app.height / B_ROWS;

function defaultBackg()
{
    if(ctx === null)
    {
    throw new Error("Could not initialize 2d context");
    }
    ctx.fillStyle = "#181818";
    ctx.fillRect(0,0,app.width,app.height);
}
function render(){
if(ctx === null)
{
    throw new Error("Could not initialize 2d context");
}
defaultBackg();
ctx.fillStyle = "#703CFF";
console.log(ctx);
for(let r = 0; r < B_ROWS; ++r)
{
    for(let c = 0; c < B_COLS; ++c)
    {
        if(board[r][c] == 'alive')
        {
            const x = c*CELL_WIDTH;
            const y = r*CELL_HEIGHT;    
            ctx.fillRect(x,y,CELL_WIDTH,CELL_HEIGHT); 
            ctx.lineWidth = 1;
            ctx.strokeRect(0,0,0,0);
        }
    }
}
}

app.addEventListener('click', (e) => {
    const col = Math.floor(e.offsetX / CELL_WIDTH);
    const row = Math.floor(e.offsetY / CELL_HEIGHT); // Floor it because it is FLOAT
    console.log(`client: ${[e.offsetX,e.offsetY]}`);
    board[row][col] = 'alive';
    render();
})

reset?.addEventListener('click',(e) => {
defaultBackg();
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
});
render();

// GenerateNextBoard until Every cell is dead + count