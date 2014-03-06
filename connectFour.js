window.onload = function() {
  var htmlBody = document.getElementById('body');
  var elementArray = createBoard(10);
  for (var x = 0; x < elementArray.length; x++){
    htmlBody.appendChild(elementArray[x]);
  }
  htmlBody.appendChild(dom('div', {style: 'clear: both;'}));

  function createBoard(size) {
    var tableArray = [];
    var total = size * size;
    console.log(total);
    for (var i = 0; i < total; i++){
      tableArray.push(dom('li',
        {class: 'box', style: ' height: ' + 100/size + '%; width: ' + 100/size + '%; display: inline-block;' }));

  }
  return tableArray;

  }

  function dom(name, attributes){
    var node = document.createElement(name);
    if (attributes) {
      forEachIn(attributes, function(attr,value){
        setNodeAttribute(node,attr,value);
      });
    }
    return node;
  }

  function setNodeAttribute(node, attribute, value) {
    if (attribute == "class")
      node.className = value;
    else if (attribute == "checked")
      node.defaultChecked = value;
    else if (attribute == "for")
      node.htmlFor = value;
    else if (attribute == "style")
      node.style.cssText = value;
    else
      node.setAttribute(attribute, value);
  }

  function forEachIn(object, action) {
    for (var property in object) {
      if (object.hasOwnProperty(property))
        action(property, object[property]);
    }
  }

}
