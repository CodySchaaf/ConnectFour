window.onload = function () {
		var turn = 1;
		var size = 10;
		var player = function (spec) {
				var that = spec || {};
				that.pieces = []
				that.piece = function () {
						var newPiece = dom('i', { class: 'fa fa-' + that.glyph + ' player', style: 'color: ' + that.col });
						that.pieces.push(newPiece);
						return newPiece;
				};
				that.checkForWin = function() {
						var streak = 1;
						getStreak(that.pieces, streak);
				};
				that.addPiece = function(position) {
						that.pieces.push(gridPos(position,size));
				}
				return that;
		};

		var gameMaker = {
				playerOne: player({glyph: 'bug', col: 'darkBlue'}),
				playerTwo: player({glyph: 'dot-circle-o', col: 'darkRed'}),
				board: createBoard(size),
				htmlBody: this.document.getElementById('board'),
				makeHTML: function(){
						for (var x = 0; x < this.board.length; x++) {
								this.htmlBody.appendChild(this.board[x].element);
						}
						this.htmlBody.appendChild(dom('div', {style: 'clear: both;'}));
				}

		};

		var game = Object.create(gameMaker);
		game.makeHTML();

		function getGridPos(pos,size) {
				return {
						x: pos % size,
						y: pos / size
				}
		}

		function posAdd(start,dir){
				return getGridPos(start.x + dir.x, start.y + dir.y);
		}

		function partial(func) {
				var fixedArgs = asArray(arguments, 1);
				return function(){
						return func.apply(null, fixedArgs.concat(asArray(arguments)));
				};
		}

		function asArray(quasiArray, start) {
				var result = [];
				for (var i = (start || 0); i < quasiArray.length; i++)
						result.push(quasiArray[i]);
				return result;
		}

		var directions = {
				n: gridPos(0,-1),
				s: gridPos(0,1),
				e: gridPos(1,0),
				w: gridPos(-1,0),
				ne: gridPos(1,-1),
				se: gridPos(1,1),
				sw: gridPos(-1,1),
				nw: gridPos(-1,-1)
		}

		function getStreak(array,streak) {
				var neighbors = []
				for(dir in directions) {
						posAdd
				}
		}

		function createBoard(size) {
				var tableArray = [];
				var total = size * size;
				for (var i = 0; i < total; i++) {
						var node = {
								element: dom('div', {class: 'box', 'data-position': i,
										style: ' height: ' + 100 / size + '%; width: ' + 100 / size + '%;'
								}),
								position: i
						};
						registerEventHandler(node.element, 'click', function (event) {
								placePiece(this);
						})
						tableArray.push(node);
				}
				return tableArray;

		}

		function placePiece(node) {
				if (turn % 2 === 0) {
						node.appendChild(game.playerOne.piece());
						game.playerOne.addPiece(node['data-position'])
						game.playerOne.checkForWin();
				} else {
						node.appendChild(game.playerTwo.piece());
						game.playerTwo.addPiece(node['data-position'])
						game.playerTwo.checkForWin();
				}
				turn++;

		}

		function dom(name, attributes) {
				var node = document.createElement(name);
				if (attributes) {
						forEachIn(attributes, function (attr, value) {
								setNodeAttribute(node, attr, value);
						});
				}
				return node;
		}

		function setNodeAttribute(node, attribute, value) {
				if (attribute == "class")
						node.className = value; else if (attribute == "checked")
						node.defaultChecked = value; else if (attribute == "for")
						node.htmlFor = value; else if (attribute == "style")
						node.style.cssText = value; else
						node.setAttribute(attribute, value);
		}

		function forEachIn(object, action) {
				for (var property in object) {
						if (object.hasOwnProperty(property))
								action(property, object[property]);
				}
		}

		function forEach(array, funct) {
				for (var i = 0; i < array.length; i++) {
						funct(array[i]);
				}
		}

		function registerEventHandler(node, event, handler) {
				if (typeof node.addEventListener == "function")
						node.addEventListener(event, handler, false);
				else
						node.attachEvent("on" + event, handler);
		}

}
