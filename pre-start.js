const fs = require('fs');

setTimeout(function () {
    const value = {
        "one": 1,
        "two": 2
    };

    fs.writeFileSync('new-file.json', JSON.stringify(value));
}, 1000)