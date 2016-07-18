var gameOfLife = {
  width: 20,
  height: 20,
  stepInterval: 27,
  createAndShowBoard: function () {
    var goltable = document.createElement("tbody");
    var tablehtml = '';
    var w, h, width = this.width, height = this.height;
    for (h = 0; h < height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (w = 0; w < width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    // add table to the #board element
    document.getElementById('board').appendChild(goltable);
    this.setupBoardEvents();
  },
  forEachCell: function (td) {
    var id = td.id.split("-");
    var row = id[1]*1, col = id[0]*1;
    var i, endr = row + 1;
    var c, endc = col + 1;
    var w = gameOfLife.width, h = gameOfLife.height;
		var cells = gameOfLife.cells;
    td.neighbors = 0;
    for(c = col-1; c <= endc; c++ ) {
      for(i = row-1; i <= endr; i++) {
        ((i !== row || c !== col) && i >= 0 && c >= 0 && i < h && c < w) &&
         cells[c + i * w].getAttribute("data-status") === "alive" && td.neighbors++;
      }
    }
  },
  reviveCell: function () {
    this.className = "alive";
    this.setAttribute("data-status", "alive");
    gameOfLife.stable = false;
  },
  killCell: function () {
    this.className = "dead";
    this.setAttribute("data-status", "dead");
    gameOfLife.stable = false;
  },
  setupBoardEvents: function() {
    var onCellClick = function () {
      this[this.getAttribute("data-status") === "dead" ? "revive": "kill"]();
    };
    this.cells = Array.prototype.slice.call(document.getElementsByTagName("td"));
    this.cells.forEach(function (td) {
      td.onclick = onCellClick;
      td.kill = gameOfLife.killCell;
      td.revive = gameOfLife.reviveCell;
    });

    var board = document.getElementById('board');
    var isEraser = false;
    var isMousedown = false;
    board.onmousedown = function (e) {
      isMousedown = true;
      gameOfLife.isPlaying && gameOfLife.stopPlaying();
      isEraser = e.target.getAttribute('data-status') === 'alive';
    };
    board.onmousemove = function (e) {
      isMousedown && e.target[isEraser ? "kill" : "revive"]();
    };
    board.onmouseup = function () {
      isMousedown = false;
    };
    board.onmouseleave = board.onmouseup;

    document.getElementById("reset_btn").onclick = this.makeRandom.bind(this);
    document.getElementById("clear_btn").onclick = this.clearBoard.bind(this);
    this.playButton.onclick = this.enableAutoPlay.bind(this);
    document.getElementById("step_btn").onclick = this.step.bind(this);
  },
  playButton: document.getElementById("play_btn"),
  isPlaying: false,
  clearFrame: false,
  enableAutoPlay: function () {
    this[this.stable || this.isPlaying ? "stopPlaying": "startPlaying"]();
  },
  startPlaying: function () {
    this.clearFrame = window.setInterval(this.step.bind(this), this.stepInterval);
    this.isPlaying = true;
    this.playButton.innerHTML = "Pause";
  },
  stopPlaying: function () {
    clearInterval(this.clearFrame);
    this.isPlaying = false;
    this.playButton.innerHTML = "Play";
  },
  changeCellStatus: function (td) {
    td.getAttribute("data-status") === "alive" ? (td.neighbors < 2 || td.neighbors > 3) && td.kill():
       (td.neighbors === 3 && td.revive());
  },
  step: function () {
    this.stable = true;
    this.cells.forEach(this.forEachCell);
    this.cells.forEach(this.changeCellStatus);
    if(this.stable) {
      this.stopPlaying();
      this.getLiving().forEach(function (td) {
        td.className = "stable";
      });
    }
  },
  getLiving: function () {
    return Array.prototype.slice.call(document.getElementsByClassName("alive"));
  },
  stable: true,
  makeRandom: function () {
    var rand = Math.random;
  // use width and height so random values can accomodate for any board size 
    var cells = this.cells;
		var length = cells.length - 1;
		var max = length / 3 | 0;
	 	var num = rand() * max + max * 0.5 | 0;
    this.clearBoard();
    while (num--) {
      cells[length * rand() | 0].revive();
    }
  },
  clearBoard: function () {
    // I added this to more easily accomodate the new "stable" status added to cells
    // this way you can clear whether cells are alive or stable...
    // obviously goes through more cells than old version, might be worth it though for simplicity
    this.stopPlaying();
    this.cells.forEach(function(td){
      td.kill();
    });
    this.stable = true;
  //  Array.prototype.slice.call(gameOfLife.getLiving()).forEach(function (td) {const boardSettings = {
    //  width: 20,
    //  height: 20,
    //  stepInterval: 27
    //  };
  //    td.kill();
  //  });
  }
};

gameOfLife.createAndShowBoard();
