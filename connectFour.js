window.onload = function () {
    "use strict";
    var turn = 1, size = 10;
    var player = function (spec) {
        var that = spec || {};
        that.pieces = [];
        that.glyphPieces = [];
        that.piece = function () {
            var node = dom({
                name: 'i',
                attributes: {
                    class: 'fa fa-' + that.glyph + ' player', style: 'color: ' + that.col
                }
            });
            this.glyphPieces.push(node);
            return node;
        };
        that.checkForWin = function (game) {
            if (checkWin(that.pieces)) {
                alert('Player ' + this + 'won!');
                game.resetGame();
            }
        };
        that.addPiece = function (position) {
            console.log(that.pieces);
            that.pieces.unshift(parseInt(position));
            console.log(that.pieces);
        };
        that.resetPieces = function () {
            that.pieces = [];
            that.glyphPieces.forEach(removeElement);
            that.glyphPieces = [];
        };
        return that;
    };

    var gameMaker = {
        playerOne: player({
            glyph: 'bug', col: 'darkBlue'}),
        playerTwo: player({glyph: 'dot-circle-o', col: 'darkRed'}),
        board: createBoard(size),
        htmlBody: this.document.getElementById('board'),
        makeHTML: function () {
            for (var x = 0; x < this.board.length; x++) {
                this.htmlBody.appendChild(this.board[x].element);
            }
            this.htmlBody.appendChild(dom({name: 'div', attributes: {style: 'clear: both;'}}));
        },
        resetGame: function () {
            this.playerOne.resetPieces();
            this.playerTwo.resetPieces();
        }

    };

    var game = Object.create(gameMaker);
    game.makeHTML();

    var directions = {
        n_s: (-size),
        e_w: 1,
        ne_sw: 1 - size,
        se_nw: 1 + size
    }

    function removeElement(element) {
        element.parentNode.removeChild(element);
    }

    function add(start, dir) {
        return parseInt(start) + parseInt(dir);
    }

    function checkWin(array) {
        function checkNeighbors(direction) {
            return followStreak(that, direction) + followStreak(that, -direction);
        }

        function followStreak(start, direction, streak) {
            streak = streak || 0;
            var newStart = add(start, direction);
            if (newStart < 0 || newStart > size * size || (others.indexOf(newStart) == -1))
                return streak;
            return followStreak(newStart, direction, add(streak, 1));
        }

        var others = array.slice(1, array.length);
        var that = array[0];
        for (var dir in directions) {
            if (directions.hasOwnProperty(dir) && checkNeighbors(directions[dir]) >= 3)
                return true;

        }
        return false;

    }

    //*****************************************************//
    //***************** Set Up Game Board *****************//
    //*****************************************************//
    function createBoard(size) {
        var tableArray = [];
        var total = size * size;
        for (var i = 0; i < total; i++) {
            var node = {
                element: dom({name: 'div', attributes: {class: 'box', 'data-position': i,
                    style: ' height: ' + 100 / size + '%; width: ' + 100 / size + '%;'
                }}),
                position: i
            };
            node.element.addEventListener('click', function () {
                placePiece(this);
            }, false);
            tableArray.push(node);
        }
        return tableArray;

    }

    function placePiece(node) {
        if (turn % 2 === 0) {
            node.appendChild(game.playerOne.piece());
            game.playerOne.addPiece(node.attributes['data-position'].value);
            game.playerOne.checkForWin(game);
        } else {
            node.appendChild(game.playerTwo.piece());
            game.playerTwo.addPiece(node.attributes['data-position'].value);
            game.playerTwo.checkForWin(game);
        }
        turn++;

    }

    function dom(parameters) {
        var name = parameters.name;
        var attributes = parameters.attributes;
        var node = document.createElement(name);
        if (attributes) {
            forEachIn(attributes, function (attr, value) {
                node.setAttribute(attr, value);
                ;
            });
        }
        return node;
    }

//    function setNodeAttribute(node, attribute, value) {
//        if (attribute == "class")
//            node.className = value; else if (attribute == "checked")
//            node.defaultChecked = value; else if (attribute == "for")
//            node.htmlFor = value; else if (attribute == "style")
//            node.style.cssText = value; else
//            node.setAttribute(attribute, value);
//    }

    //*****************************************************//
    //****************** Helper Methods *******************//
    //*****************************************************//
    function forEachIn(object, action) {
        for (var property in object) {
            if (object.hasOwnProperty(property))
                action(property, object[property]);
        }
    }

//    function registerEventHandler(node, event, handler) {
//        if (typeof node.addEventListener == "function")
//            node.addEventListener(event, handler, false); else
//            node.attachEvent("on" + event, handler);
//    }

//    function includes(array, dir) {
//        return array.indexOf(dir) !== -1;
//
//    }

    //		function getGridPos(pos,size) {
//				return {
//						x: pos % size,
//						y: pos / size
//				}
//		}

//		function posAdd(start,dir){
//				return getGridPos(start.x + dir.x, start.y + dir.y);
//		}

    //		function asArray(quasiArray, start) {
//				var result = [];
//				for (var i = (start || 0); i < quasiArray.length; i++)
//						result.push(quasiArray[i]);
//				return result;
//		}

    //		function partial(func) {
//				var fixedArgs = asArray(arguments, 1);
//				return function () {
//						return func.apply(null, fixedArgs.concat(asArray(arguments)));
//				};
//		}

//		function forEach(array, funct) {
//				for (var i = 0; i < array.length; i++) {
//						funct(array[i]);
//				}
//		}

//		var op = {
//				"+": function (a, b) {
//						return a + b;
//				},
//				"==": function (a, b) {
//						return a == b;
//				},
//				"===": function (a, b) {
//						return a === b;
//				},
//				"!": function (a) {
//						return !a;
//				}
//		};
}
