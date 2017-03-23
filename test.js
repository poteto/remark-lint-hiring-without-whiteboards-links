const test = require('tape');
const remark = require('remark');
const lint = require('remark-lint');
const links = require('./');

const processor = remark().use(lint).use(links);

const markdown = `
- [MyCompany](https://example.com/jobs) | San Francisco, CA; Tokyo, Japan | My description
- [MyCompany](https://example.com/jobs) | San Francisco, CA; Tokyo, Japan | | |
- [MyCompany](https://example.com/jobs) | Tokyo | My description
- [MyCompany](https://example.com/jobs) | Melbourne, Victoria, Australia | My description
`;

test('remark-lint-hiring-without-whiteboards-links', (t) => {
  t.deepEqual(
    processor.processSync(markdown).messages.map(String),
    [
      '3:1-3:80: Too many pipes, expected ` | location | description` after link',
      '4:1-4:65: Invalid location `Tokyo`, please include city and country name',
      '5:1-5:90: Invalid location `Melbourne, Victoria, Australia`, please only include city and country name'
    ],
    'should validate'
  );
  t.end();
});
