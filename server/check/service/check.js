const { exec } = require("child_process");
let word = require('./words');

const words = word.words

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

class os_func {
    execCommand = (cmd) => {
        return new Promise((resolve, reject) => {
           exec(cmd, (error, stdout, stderr) => {
             if (error) {
                reject(error);
                return;
            }
            resolve(stdout)
           });
       })
   }
}

const check = async (req) => {
    let word = req.body.word;
    let os = new os_func();
    let ok = await os.execCommand('.\\a.exe');

    let password = words[ok].toUpperCase();

    const response = [];
    const wordcp = word;

    
    for (let i = 0; i < word.length; i++) {
        if (word[i] == password[i]) {
            word = word.replaceAt(i, '%');
        } else {
            word = word.replace(password[i], '%');
        }
    }

    for (let i = 0; i < word.length; i++) {
        if (word[i] !== '%') {
            response.push('#3a3a3c');
        } else if (wordcp[i] == password[i]) {
            response.push('#538d4e');
        } else {
            response.push('#b59f3b');
        }
    }
    
    return { response };
}

module.exports = {
	check: check
};