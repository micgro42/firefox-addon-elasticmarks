var self = require("sdk/self");

var buttons = require('sdk/ui/button/action');

var button = buttons.ActionButton({
  id: "elasticmarks-sidebar-button",
  label: "Open Elastic Bookmarks Sidebar",
  icon: {
    "16": "./bookmark-16.png",
    "32": "./bookmark-32.png",
    "64": "./bookmark-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  sidebar.show();
}


var sidebar = require("sdk/ui/sidebar").Sidebar({
    id: 'elasticmarks-sidebar',
    title: 'Elastic Bookmarks Sidebar',
    url: "./sidebar.html",
    onAttach: function (worker) {
        worker.port.on("bmquery", function(query) {
            console.log('addon script got query: ' + query);
            let { search } = require("sdk/places/bookmarks");

            search(
                { query: query }
            ).on("end", function (results) {
                console.log(results);
                worker.port.emit("queryResults", results);
            });
        });
    }
});

