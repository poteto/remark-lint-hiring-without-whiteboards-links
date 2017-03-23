const rule = require('unified-lint-rule');
const generated = require('unist-util-generated');
const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');
const states = require('datasets-us-states-abbr');

function item(tree, file) {
  function visitor(node, index, parent) {
    if (parent.ordered || generated(node)) {
      return;
    }

    const head = node.children[0];
    const link = head && head.children && head.children[0];

    if (!link || link.type !== 'link' || head.children.length === 1) {
      return;
    }

    const rest = toString({ children: head.children.slice(1) })
      .replace(/^\s*\|\s*/, '')
      .split(/\s*\|\s*/);

    const places = rest[0];

    if (rest.length > 2) {
      file.message('Too many pipes, expected ` | location | description` after link', node);
      return;
    }

    function checkPlace(place) {
      const parts = place.split(/\s*,\s*/);
      const state = parts[1] && states.includes(parts[1].toUpperCase());
      const min = 2;
      const max = state ? 3 : min;

      if (parts.length > max) {
        file.message(`Invalid location \`${place}\`, please only include city and country name`,
          node
        );
      }

      if (parts.length < min) {
        file.message(`Invalid location \`${place}\`, please include city and country name`, node);
      }
    }
    places.split(/\s*[/;&]\s*/g).forEach(checkPlace);
  }
  visit(tree, 'listItem', visitor);
}

module.exports = rule('remark-lint:hww-links', item);
