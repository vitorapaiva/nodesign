const download = require('download-file');
const { v4: uuidv4 } = require('uuid');
const tmpFolder = '/tmp/';

module.exports = asyncDownload;

function asyncDownload(url, folder, fileName) {
    return new Promise ((resolve,reject) => {
        try{
            var options = {
                directory: folder,
                filename: fileName
            }

            download(url, options, function(err){
                if (err) throw err
                let result = {};

                result.message = "Success";
                result.result=options.directory+options.filename;
                resolve(result);
            });
        }
        catch(error){
            return reject(error).catch(err => {
              throw new Error(err);
            });
        }
    }).catch(function (error) {
        let result = {};
        result.message = "Error";
        result.error = error;
        return result;
    });
}
