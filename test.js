const test = require('tape');
const remark = require('remark');
const lint = require('remark-lint');
const links = require('./');

const processor = remark().use(lint).use(links);

const markdown = `
- [MyCompany](https://example.com/jobs) | San Francisco, CA; Tokyo, Japan | My description
- [MyCompany](https://example.com/jobs) | Remote | My description
- [MyCompany](https://example.com/jobs) | San Francisco, CA; Tokyo, Japan | | |
- [MyCompany](https://example.com/jobs) | Tokyo | My description
- [MyCompany](https://example.com/jobs) | Melbourne, Victoria, Australia | My description
- [MyCompany](https://example.com/jobs) | 100% remote | My description
- [MyCompany](https://example.com/jobs) | distributed | My description
- [MyCompany](https://example.com/jobs) | anywhere in the world | My description
- [MyCompany](https://example.com/jobs) | 100% online | My description
`;

test('remark-lint-hiring-without-whiteboards-links', (t) => {
  t.deepEqual(
    processor.processSync(markdown).messages.map(String),
    [
      '4:1-4:80: Too many pipes, expected ` | location | description` after link',
      '5:1-5:65: Invalid location `Tokyo`, please include city and country name',
      '6:1-6:90: Invalid location `Melbourne, Victoria, Australia`, please only include city and country name',
      '7:1-7:71: Invalid remote value `100% remote`, please only use `Remote`',
      '8:1-8:71: Invalid remote value `distributed`, please only use `Remote`',
      '9:1-9:81: Invalid remote value `anywhere in the world`, please only use `Remote`',
      '10:1-10:71: Invalid remote value `100% online`, please only use `Remote`'
    ],
    'should validate'
  );
  t.end();
});
