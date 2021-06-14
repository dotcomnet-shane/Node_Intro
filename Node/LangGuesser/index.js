const franc = require('franc')
const langs = require('langs');
const colors = require('colors');
const input = process.argv.slice(2);

console.log(franc)
console.log(input);

function langCode () {
    return franc(`${input}`);

}

function identifyLangCode () {

    return langs.where(3, langCode());


}

console.log((identifyLangCode().name).green);