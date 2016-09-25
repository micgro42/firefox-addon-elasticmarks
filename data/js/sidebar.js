
addon.port.on("queryResults", function(results) {
    console.log("sidebar script got the results");
    console.log(results);
    var resultsList = document.getElementById('searchResults');
    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild);
    }
    var domains = {};
    results.forEach(function(value, index) {
        console.dir(value);
        var tld = new URL(value.url).hostname.split(".").pop();
        if (!domains[tld]) {
            domains[tld] = {
                count: 0
            };
        }
        domains[tld].count += 1;
        var link = document.createElement("A");
        link.href = value.url;
        link.appendChild(document.createTextNode(value.title));
        var node = document.createElement("LI");
        node.appendChild(link);
        resultsList.appendChild(node);
    });
    var fsdomains = document.getElementById('fsdomains');
    while (fsdomains.lastChild) {
        if (fsdomains.lastChild.tagName == "LEGEND") {
            break;
        }
        fsdomains.removeChild(fsdomains.lastChild);
    }
    domainList = Object.keys(domains);
    domainList.forEach(function(domainname, index) {
        console.dir(domainname);
        var cb = document.createElement("INPUT");
        cb.type = "checkbox";
        cb.title = "filter by ." + domainname;
        var label = document.createElement("LABEL");
        label.appendChild(document.createTextNode(domainname+" ("+domains[domainname].count+")"));
        label.appendChild(cb);
        fsdomains.appendChild(label);
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


