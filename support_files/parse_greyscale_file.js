let fs = require('fs');
let path = require('path');

let mistMakersPath = path.join('C:', 'Users', 'Chris', 'Desktop', 'mist_makers');
let filePath = path.join(mistMakersPath, 'RAW_IMAGE.txt');
let newFilePath = path.join(mistMakersPath, 'file_as_int_array.txt');

// Read in the whole file then call parseFileData().
fs.readFile(filePath, 'utf8', parseFileData); 

function parseFileData(err, data) {
    if (err) {
        console.log(err);
        return;
    } 

    let fileAsIntArrays = [];
    let tempArray = [];

    data.replace(/[^0-9]/g, ' ').split(' ').forEach((currentInt, index) => {
        if (currentInt.length === 0) {
            fileAsIntArrays.push(tempArray);
            tempArray = [];
        } else {
            tempArray.push(parseInt(currentInt.trim()));
        };
    });

    // At this point, fileAsIntArray is an array of int arrays representing the file, 
    // and you can do whatever you want with it. 

    // For now, I wrote the array to a file so I could copy and paste. 
    // In the future, you might be sending this array from your node server. 
    writeIntArrayToFile(fileAsIntArrays); 
                                         
};

function writeIntArrayToFile(fileAsIntArrays) {
    let arrayAsString = '[';

    fileAsIntArrays.forEach(function(fileIntRow) {
        if (fileIntRow.length === 0) return;
        arrayAsString += ('[' + fileIntRow + ']' + ',');
    });

    arrayAsString = arrayAsString.substring(0, arrayAsString.length - 1);
    arrayAsString += ']';

    fs.writeFile(newFilePath, arrayAsString, function() {
        console.log('Done writing file.');
    });
};