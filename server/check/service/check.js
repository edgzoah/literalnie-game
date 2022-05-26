String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const check = (req) => {
    const response = [];
    let word = req.body.word;
    let wordcp = word;
    const password = 'TEMAT'
    
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