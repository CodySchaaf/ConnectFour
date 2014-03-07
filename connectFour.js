window.onload = function () {
		var turn = 1;
		if (typeof Object.create !== 'function') {
				Object.create = function(o) {
						var F = function() {};
						F.prototype = o;
						return new F ();
				}
		}

		var player = function (spec) {
				var that = spec || {};
				that.pieces = []
				that.piece = function () {
						var newPiece = dom('i', { class: 'fa fa-' + that.glyph + ' player', style: 'color: ' + that.col });
						that.pieces.push(newPiece);
						return newPiece;
				};
				return that;
		};

		function createBoard(size) {
				var tableArray = [];
				var total = size * size;
				for (var i = 0; i < total; i++) {
						var node = {
								element: dom('div', {class: 'box',
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
				if (turn % 2 === 0)
						node.appendChild(this.playerOne.piece()); else
						node.appendChild(this.playerTwo.piece());
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

		function registerEventHandler(node, event, handler) {
				if (typeof node.addEventListener == "function")
						node.addEventListener(event, handler, false); else
						node.attachEvent("on" + event, handler);
		}


		var gameMaker = {
				board: createBoard(10),
				htmlBody: this.document.getElementById('board'),
				makeHTML: function(dom){
						for (var x = 0; x < this.board.length; x++) {
								this.htmlBody.appendChild(this.board[x]);
						}
						this.htmlBody.appendChild(dom('div', {style: 'clear: both;'}));
				},
				playerOne: player({glyph: 'bug', col: 'darkBlue'}),
				playerTwo: player({glyph: 'dot-circle-o', col: 'darkRed'})

		};

		var game = Object.create(gameMaker);
		game.makeHTML(dom);
}
