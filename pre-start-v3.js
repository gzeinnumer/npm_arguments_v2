const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
var StreamZip = require('node-stream-zip');
const path = require('path');
const { API_URL } = require('./constants');

let file = fs.createWriteStream('file.zip');
let request = http.get(API_URL + "/laravelapi/download/20221028090208_examples_v5_QPAq16AVFz",
    function (response) {
        response.pipe(file);
        file.on('finish', function () {
            var zip = new StreamZip({
                file: './file.zip'
                , storeEntries: true
            });

            zip.on('error', function (err) { console.error('[ERROR]', err); });

            zip.on('ready', function () {
                console.log('All entries read: ' + zip.entriesCount);
            });

            zip.on('entry', function (entry) {
                var pathname = path.resolve('./', entry.name);
                if (/\.\./.test(path.relative('./', pathname))) {
                    console.warn("[zip warn]: ignoring maliciously crafted paths in zip file:", entry.name);
                    return;
                }

                if ('/' === entry.name[entry.name.length - 1]) {
                    console.log('[DIR] ', entry.name);
                    return;
                }

                console.log('[FILE]', entry.name);
                // let includeBase = false;
                // let isBase = entry.name.includes("BasesController");
                // if (!isBase || includeBase) {
                zip.stream(entry.name, function (err, stream) {
                    if (err) { console.error('Error:', err.toString()); return; }

                    stream.on('error', function (err) { console.log('[ERROR]', err); return; });

                    fs.mkdir(
                        path.dirname(pathname),
                        { recursive: true },
                        function (err) {
                            stream.pipe(fs.createWriteStream(pathname));
                        }
                    );
                });
                // }
            });
        })
    }
);