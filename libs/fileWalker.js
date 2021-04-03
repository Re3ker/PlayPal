import fs from 'fs';
import path from 'path';
let walk = function(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);
  let afiles =  arrayOfFiles || [];
 
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      afiles = walk(dirPath + "/" + file, afiles);
    } else {
      afiles.push(dirPath + "/" + file);
    }
  })
 
  return afiles;
} 
export { walk };