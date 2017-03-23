# remark-lint-hiring-without-whiteboards-links

This [remark-lint](https://github.com/wooorm/remark-lint) rule was created for [hiring-without-whiteboards](https://github.com/poteto/hiring-without-whiteboards) to enforce [hiring-without-whiteboards](https://github.com/poteto/hiring-without-whiteboards) [formatting guidelines](https://github.com/poteto/hiring-without-whiteboards/blob/master/CONTRIBUTING.md#format).

This rule only applies to list items starting with a link. It enforces the following things:

### Location

A single location must contain city name and country, separated by a `,`.
Multiple locations should be separated by `;`, `&` or `/`.
Remote should just contain `Remote`, and not `online`, `distributed`, `anywhere`, etc

#### Good

    - [MyCompany](https://example.com/jobs) | San Francisco, CA; Tokyo, Japan | My description
    - [MyCompany](https://example.com/jobs) | San Francisco, CA; Tokyo, Japan; Remote | My description

#### Bad

    - [MyCompany](https://example.com/jobs) | Tokyo | My description
    - [MyCompany](https://example.com/jobs) | Melbourne, Victoria, Australia | My description
    - [MyCompany](https://example.com/jobs) | Tokyo, Japan (HQ) & anywhere in the world | My description

### Format

The link format should be `company name and link | locations | description`.

#### Good

    - [MyCompany](https://example.com/jobs) | San Francisco, CA; Tokyo, Japan | My description

#### Bad

    - [MyCompany](https://example.com/jobs) | San Francisco, CA; Tokyo, Japan

## Using the rule

### Via `.remarkrc`

```bash
npm install -g remark-cli
npm install remark-lint remark-lint-hiring-without-whiteboards-links
```

Then, set up your `.mdastrc`:

```JSON
{
  "plugins": [
    "lint",
    "lint-hww-links"
  ]
}
```

Now you can use the following command to run the lint:

```bash
remark xxx.md
```

### Via CLI

```bash
npm install -g remark-cli
npm install remark-lint remark-lint-hiring-without-whiteboards-links
remark -u lint -u lint-hww-links xxx.md
```
