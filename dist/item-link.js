'use strict';

var rule = require('unified-lint-rule');
var generated = require('unist-util-generated');
var visit = require('unist-util-visit');
var toString = require('mdast-util-to-string');
var states = require('datasets-us-states-abbr');

var remoteRegex = /remote|distributed|anywhere|online/i;

function item(tree, file) {
  function visitor(node, index, parent) {
    if (parent.ordered || generated(node)) {
      return;
    }

    var head = node.children[0];
    var link = head && head.children && head.children[0];

    if (!link || link.type !== 'link' || head.children.length === 1) {
      return;
    }

    var rest = toString({ children: head.children.slice(1) }).replace(/^\s*\|\s*/, '').split(/\s*\|\s*/);

    var places = rest[0];

    if (rest.length > 2) {
      file.message('Too many pipes, expected ` | location | description` after link', node);
      return;
    }

    function checkPlace(place) {
      var parts = place.split(/\s*,\s*/);
      var state = parts[1] && states.includes(parts[1].toUpperCase());
      var min = 2;
      var max = state ? 3 : min;
      var containsRemote = !!remoteRegex.exec(place);
      var invalidRemote = place !== 'Remote';

      if (containsRemote && invalidRemote) {
        file.message('Invalid remote value `' + place + '`, please only use `Remote`', node);
      }

      if (parts.length > max) {
        file.message('Invalid location `' + place + '`, please only include city and country name', node);
      }

      if (parts.length < min) {
        file.message('Invalid location `' + place + '`, please include city and country name', node);
      }
    }
    places.split(/\s*[/;&]\s*/g).forEach(checkPlace);
  }
  visit(tree, 'listItem', visitor);
}

module.exports = rule('remark-lint:hww-links', item);