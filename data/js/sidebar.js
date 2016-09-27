
addon.port.on("queryResults", function(results, id) {
    console.log("sidebar script got the results");
    console.log(results);
    if (id != queryId) {
        console.log('old query');
        return;
    }
    var fsdomains = document.getElementById('fsdomains');
    var checkedTLDbox = fsdomains.querySelectorAll('input[type=checkbox]:checked');
    if (checkedTLDbox.length) {
        var checkedTLD = checkedTLDbox[0].value;
    }
    var resultsList = document.getElementById('searchResults');
    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild);
    }
    var domains = {All: {
        count: 0
    }};
    results.forEach(function(value, index) {
        console.dir(value);
        var tld = new URL(value.url).hostname.split(".").pop();
        domains.All.count += 1;
        if (checkedTLD && checkedTLD != tld) {
            return;
        }
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
        cb.value = domainname;
        if (checkedTLD && domainname == checkedTLD) {
            cb.checked = true;
        }
        var label = document.createElement("LABEL");
        label.className = "bminput domain";
        label.appendChild(document.createTextNode(domainname+" ("+domains[domainname].count+")"));
        label.appendChild(cb);
        fsdomains.appendChild(label);
    });

    var search = document.querySelectorAll('.bminput');
    search.forEach(function(element){
        if (element.tagName == 'LABEL') {
            element.addEventListener('click', submitForm);
            return;
        }
    });
});

var queryId = 0;
var submitForm = function (event) {
    var query = document.getElementById('bmquery').value;
    if (query.length < 3) {
        return;
    }
    console.log('form submitted: ' + query);
    queryId += 1;
    addon.port.emit('bmquery', query, queryId);
};


document.getElementById('bmquery').addEventListener('input', submitForm);

