window.onload = function () {
		var turn = 1;
		
		function Player(glyph, col)
		{
				this.pieces = []
				this.piece = function () {
						var newPiece = dom('i', { class: 'fa fa-' + glyph + ' player', style: 'color: ' + col });
						this.pieces.push(newPiece);
						return newPiece;
				};
				this.color = col
		}
		var playerOne = new Player('bug', 'darkBlue');
		var playerTwo = new Player('dot-circle-o', 'darkRed');
		var htmlBody = document.getElementById('board');
		var elementArray = createBoard(10);
		for (var x = 0; x < elementArray.length; x++) {
				htmlBody.appendChild(elementArray[x]);
		}
		htmlBody.appendChild(dom('div', {style: 'clear: both;'}));

		function createBoard(size) {
				var tableArray = [];
				var total = size * size;
				for (var i = 0; i < total; i++) {
						var node = dom('div', {class: 'box',
								style: ' height: ' + 100 / size + '%; width: ' + 100 / size + '%;'
						});
						registerEventHandler(node, 'click', function (event) {
								placePiece(this);
						})
						tableArray.push(node);

				}
				return tableArray;

		}

		function placePiece(node) {
				if(turn%2 === 0)
						node.appendChild(playerOne.piece());
				else
						node.appendChild(playerTwo.piece());
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

}
