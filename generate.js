const fs = require("fs");

const keyword = process.argv[2];

if (!keyword) {
  console.log("Please provide a keyword");
  process.exit();
}

const slug = keyword
  .toLowerCase()
  .replace(/[^\w\s-]/g, "")
  .replace(/\s+/g, "-");

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${keyword} | ScaleWithFahad</title>

<meta name="description" content="${keyword} guide for Germany, UK and Europe.">

</head>

<body>

<h1>${keyword}</h1>

<p>
Learn everything about ${keyword} for Germany and Europe.
</p>

<h2>Common mistakes</h2>

<ul>
<li>Ignoring VAT</li>
<li>Wrong eBay setup</li>
<li>No compliance strategy</li>
</ul>

<h2>FAQ</h2>

<h3>Is ${keyword} legal?</h3>

<p>
Yes, if properly structured and compliant.
</p>

<hr>

<h2>Deutsch</h2>

<p>
Dieser Artikel erklärt ${keyword} für Deutschland.
</p>

<a href="/ebay-dropshipping-deutschland.html">
eBay Dropshipping Deutschland
</a>

</body>
</html>
`;

fs.writeFileSync(`blog/${slug}.html`, html);

console.log(`✅ blog/${slug}.html created successfully`);