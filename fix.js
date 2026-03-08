const fs = require('fs');
['clinicalEngine.js', 'templates.js', 'render.js'].forEach(f => {
    let file = 'app/' + f;
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/\\`/g, '`').replace(/\\\$/g, '$');
    fs.writeFileSync(file, text);
});
console.log('Fixed files');
