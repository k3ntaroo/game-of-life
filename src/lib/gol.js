
/* constants */
const DEAD = false;
const ALIVE = true;
const CELL_WIDTH = 3;

const ALIVE_STYLE = 'rgba(100, 255, 100, 1)';
const DEAD_STYLE = 'rgba(255, 255, 255, 1)';

const step_vectors = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1]
];

/*
 * conway's game of life
 */
class GOL {
  /*
   * parameters of constructor
   *   height: the number of rows in the field
   *   width: the number of columns in the field
   *   context: the context of the canvas
   */
  constructor (height, width, ctx) {
    this.row = Math.floor(height / CELL_WIDTH);
    this.column = Math.floor(width / CELL_WIDTH);
    this.ctx = ctx;
    this.fields = [generateRamdomField(this.row, this.column),
                   generateEmptyField(this.row, this.column)];

    this.adj_cells = generateField(this.row, this.column, () => 0);

    this.frame = 0;
  }

  run () {
    const FPS = 20;
    this.renderFieldInit();
    setInterval(this.proceed.bind(this), 1000 / FPS);
  }

  proceed () {
    this.updateField();
    this.rerenderField();
    ++this.frame;
  }

  updateField () {
    const adj_cells = this.adj_cells;
    for (let r = 0; r < this.row; ++r) {
      adj_cells[r].fill(0);
    }

    const currentField = this.fields[this.frame % 2];
    const nextField = this.fields[1 - this.frame % 2];

    for (let r = 0; r < this.row; ++r) {
      for (let c = 0; c < this.column; ++c) {
        if (currentField[r][c] == ALIVE) {
          step_vectors.forEach(([dr, dc]) => {
            const [ar, ac] = [r + dr, c + dc];
            if (0 <= ar && ar < this.row && 
                0 <= ac && ac < this.column) {
              ++adj_cells[ar][ac];
            }
          });
        }
      }
    }

    for (let r = 0; r < this.row; ++r) {
      for (let c = 0; c < this.column; ++c) {
        // update a cell
        const adj = adj_cells[r][c];
        if (currentField[r][c] == DEAD) {
          nextField[r][c] = adj == 3 ? ALIVE : DEAD;
        } else {
          nextField[r][c] = (adj == 2 || adj == 3) ? ALIVE : DEAD;
        }
      }
    }
  }

  renderFieldInit () {
    const currentField = this.fields[0];

    this.ctx.fillStyle = DEAD_STYLE;
    this.ctx.fillRect(this.row * CELL_WIDTH, this.column * CELL_WIDTH, 0, 0);

    // render ALIVE
    this.ctx.fillStyle = ALIVE_STYLE;
    for (let r = 0; r < this.row; ++r) {
      for (let c = 0; c < this.column; ++c) {
        if (currentField[r][c] == ALIVE) {
          this.ctx.fillRect(
              CELL_WIDTH * r,
              CELL_WIDTH * c,
              CELL_WIDTH,
              CELL_WIDTH
              );
        }
      }
    }
  }

  rerenderField () {
    const prevField = this.fields[this.frame % 2];
    const currentField = this.fields[1 - this.frame % 2];

    // rerender DEAD -> ALIVE
    this.ctx.fillStyle = ALIVE_STYLE;
    for (let r = 0; r < this.row; ++r) {
      for (let c = 0; c < this.column; ++c) {
        if (prevField[r][c] == DEAD && currentField[r][c] == ALIVE) {
          this.ctx.fillRect(
              CELL_WIDTH * r,
              CELL_WIDTH * c,
              CELL_WIDTH,
              CELL_WIDTH
          );
        }
      }
    }

    // rerender ALIVE -> DEAD
    this.ctx.fillStyle = DEAD_STYLE;
    for (let r = 0; r < this.row; ++r) {
      for (let c = 0; c < this.column; ++c) {
        if (prevField[r][c] == ALIVE && currentField[r][c] == DEAD) {
          this.ctx.fillRect(
              CELL_WIDTH * r,
              CELL_WIDTH * c,
              CELL_WIDTH,
              CELL_WIDTH
          );
        }
      }
    }
  }
}

/* field generators */

function generateField (row, column, generator) {
  const field = new Array(row);
  for (let j = 0; j < row; ++j) {
    field[j] = new Array(column);
    for (let k = 0; k < column; ++k) {
      field[j][k] = generator();
    }
  }

  return field;
}

function generateEmptyField (row, column) {
  return generateField(row, column, () => DEAD);
}

function generateRamdomField (row, column) {
  return generateField(row, column,
      () => [DEAD, ALIVE][Math.floor(Math.random() * 98) % 2]);
}

/* END field generators */

module.exports = GOL;
