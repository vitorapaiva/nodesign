const fs = require('fs');

module.exports = getFile;

function getFile(filePath) {
    return new Promise ((resolve,reject) => {
        try{
            let fileBuffer=fs.readFileSync(filePath);
            return resolve(fileBuffer);
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
