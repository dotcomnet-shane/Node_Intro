const franc = require('franc');
const langs = require('langs');
const colors = require('colors');
const input = process.argv.slice(2);
const langCode = franc(`${input}`);
const Language = langs.where("3",`${langCode}`);

if (langCode === 'und') {
    console.log(`Sorry we could not identify the language of '${input}' please try with more sample text!`.red)
} else console.log(`We have identified the language as ${Language}.name`.green);
