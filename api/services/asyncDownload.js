const download = require('download-file');
const { v4: uuidv4 } = require('uuid');
const tmpFolder = '/tmp/';
var fs = require('fs')

module.exports = asyncDownload;

function asyncDownload(url, folder, fileName) {
    return new Promise ((resolve,reject) => {
        if((typeof url)=='string'){
            try{
                var options = {
                    directory: folder,
                    filename: fileName
                }

                download(url, options, function(err){
                    if (err) throw err
                    resolve(options.directory+options.filename);
                });
            }
            catch(error){
                return reject(error).catch(err => {
                  throw new Error(err);
                });
            }
        }
    })
    .then(function (filePath)
    {
        let result = {};
        result.message = "Success";
        result.result=filePath;
        return(result);
    })
    .catch(function (error) {
        console.log(error);
        let result = {};
        result.message = "Error";
        result.error = error;
        return result;
    });
}
