const fs = require('fs');
const folderName = process.argv[2] || 'Project'


// fs.mkdir('Dog', { recursive: true }, (err) => {
//     console.log("I happen in the callback")
//     if (err) throw err;
// });
// console.log("I come after the mkdir command!");
try {
    fs.mkdirSync(folderName);
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`)
    fs.writeFileSync(`${folderName}/styles.css`)
    fs.writeFileSync(`${folderName}/app.js`)
} catch (e) {
    console.log("Something went horribly wrong");
    console.log(e);
}