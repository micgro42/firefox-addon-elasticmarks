
addon.port.on("queryResults", function(results) {
    console.log("sidebar script got the results");
    console.log(results);
    var resultsList = document.getElementById('searchResults');
    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild);
    }
    results.forEach(function(value, index) {
        var link = document.createElement("A");
        link.href = value.url;
        link.appendChild(document.createTextNode(value.title));
        var node = document.createElement("LI");
        node.appendChild(link);
        resultsList.appendChild(node);
    });
});

var search = document.getElementById('bmsearch');
search.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var query = document.getElementsByName('bmquery')[0].value;
    console.log('form submitted: ' + query);
    addon.port.emit('bmquery', query);
});


