const { exec } = require("child_process");
const { stdout } = require("process");
let word = require('./words');

const words = word.words

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function os_func() {
    this.execCommand = function (cmd) {
        return new Promise((resolve, reject)=> {
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

const check = (req) => {
    let password = 'TEMAT';
    // exec("./a.out", (error, stdout, stderr) => {
    //     let number = Number(stdout);
    //     password = words[number].toUpperCase();
    //     console.log(password);
    //     return;
    // });
    var os = new os_func();
    let ok = os.execCommand('pwd').then(res=> {
        console.log(res)
        return res
    })
    console.log(ok + 'dds');
    const response = [];
    let word = req.body.word;
    let wordcp = word;
    console.log(password + 'after');

    
    for(let i = 0; i < word.length; i++) {
        if (word[i] == password[i]) {
            word = word.replaceAt(i, '%');
        } else {
            word = word.replace(password[i], '%');
        }
    }
    for(let i = 0; i < word.length; i++) {
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