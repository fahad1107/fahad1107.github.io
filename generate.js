const fs = require("fs");

const keyword = process.argv[2];

const slug = keyword.toLowerCase().replace(/\s+/g, "-");

fs.writeFileSync(`blog/${slug}.html`, `<h1>${keyword}</h1>`);

console.log("File created");