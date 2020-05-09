const fs = require('fs');

module.exports = getFile;

function getFile(filePath) {
    return new Promise((resolve, reject) => {
        if ((typeof filePath) == 'string') {
            try {
                let fileBuffer = fs.readFile(filePath, (err, data) => {
                    if (err) throw err;
                    resolve(data);
                });
            } catch (error) {
                return reject(error).catch(err => {
                    throw new Error(err);
                });
            }
        }
    }).catch(function (error) {
        console.log(error);
        let result = {};
        result.message = "Error";
        result.error = error;
        return result;
    });
}
