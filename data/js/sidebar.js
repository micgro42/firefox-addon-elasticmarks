'use strict';
var elasticmarks = elasticmarks || {};

elasticmarks.domainfilter = function domainfilter(result, checkedTLD) {
    const tld = new URL(result.url).hostname.split('.').pop();
    return !(checkedTLD && checkedTLD !== tld);
};

elasticmarks.domaincount = function(domains, bookmark) {
    const tld = new URL(bookmark.url).hostname.split('.').pop();
    if (!domains[tld]) {
        domains[tld] = {
            count: 0
        };
    }
    domains[tld].count += 1;
    return domains;
};

elasticmarks.createElements = function(result) {
    var link = document.createElement('A');
    link.href = result.url;
    link.appendChild(document.createTextNode(result.title));
    var node = document.createElement('LI');
    node.appendChild(link);
    return node;
};

elasticmarks.displayDomains = function (fsdomains, domains, checkedTLD) {
    while (fsdomains.lastChild) {
        if (fsdomains.lastChild.tagName === 'LEGEND') {
            break;
        }
        fsdomains.removeChild(fsdomains.lastChild);
    }
    var domainList = Object.keys(domains);
    domainList.forEach(function(domainname) {
        var cb = document.createElement('INPUT');
        cb.type = 'checkbox';
        cb.value = domainname;
        cb.id = 'domain-' + domainname;
        if (checkedTLD && domainname === checkedTLD) {
            cb.checked = true;
        }
        const count = domains[domainname].count;
        var label = document.createElement('LABEL');
        label.className = 'bminput domain';
        label.htmlFor = cb.id;
        label.appendChild(document.createTextNode(domainname+' ('+count+')'));
        label.style.order = count;
        fsdomains.appendChild(cb);
        fsdomains.appendChild(label);
    });
};

elasticmarks.displayTags = function (fstags, tags) {
    while (fstags.lastChild) {
        if (fstags.lastChild.tagName === 'LEGEND') {
            break;
        }
        fstags.removeChild(fstags.lastChild);
    }
    Object.keys(tags).reduce(function(fstags, tagname) {
        var cb = document.createElement('INPUT');
        cb.type = 'checkbox';
        cb.value = tagname;
        cb.id = 'tag-' + tagname;
        const count = tags[tagname];
        var label = document.createElement('LABEL');
        label.className = 'bminput tag';
        label.htmlFor = cb.id;
        label.appendChild(document.createTextNode(tagname+' ('+count+')'));
        label.style.order = -count;
        fstags.appendChild(cb);
        fstags.appendChild(label);
        return fstags;
    },fstags);
};

addon.port.on('queryResults', function(results, id) {
    if (id !== queryId) {
        return;
    }
    var fsdomains = document.getElementById('fsdomains');
    var checkedTLDbox = fsdomains.querySelectorAll('input[type=checkbox]:checked');
    const checkedTLD = checkedTLDbox.length ? checkedTLDbox[0].value : null;
    var resultsList = document.getElementById('searchResults');
    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild);
    }
    const domainInitial = {All: {
        count: results.length
    }};
    const filteredResults = results.filter(result => elasticmarks.domainfilter(result, checkedTLD));
    const domains = filteredResults.reduce(elasticmarks.domaincount, domainInitial);
    filteredResults.map(elasticmarks.createElements)
        .map(bookmark => resultsList.appendChild(bookmark));

    const fstags = document.getElementById('fstags');
    const tags = filteredResults.reduce(elasticmarks.tagCounter, {});

    elasticmarks.displayDomains(fsdomains, domains, checkedTLD);
    elasticmarks.displayTags(fstags, tags);


    var search = document.querySelectorAll('.bminput');
    search.forEach(function(element){
        if (element.tagName === 'LABEL') {
            element.addEventListener('click', submitForm);
            return;
        }
    });
});

var queryId = 0;
var submitForm = function () {
    var query = document.getElementById('bmquery').value;
    const MIN_QUERY_LENGTH = 3;
    if (query.length < MIN_QUERY_LENGTH) {
        return;
    }
    queryId += 1;
    addon.port.emit('bmquery', query, queryId);
};


document.getElementById('bmquery').addEventListener('input', submitForm);

