/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
var promisification = require('./promisification');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  //use fs.readfile read readfilepath and extract first line to get username
  // then do getGIthubProfileAync
  // then use fs.writefile write to file 
  return fs.readFileAsync(readFilePath, 'utf8')
    .then(function(data) {
      if (!data) {
        throw new Error('read file path does not exist')
      } else {
        var username = data.split('\n')[0];
        return username //Where does this username get returned to?
      }
    })
    .then(function(username)  {
      return promisification.getGitHubProfileAsync(username) 
    }) 
    .then(function(body) {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(body));  
  });
}  

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};


//Some Diferences b/w standard node callback signatures and promises:
  //promises involve a lot of returning up a promise chain, where node uses 
    //lots of callbacks to deliver information from one level to the next. 












