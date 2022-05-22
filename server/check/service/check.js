const check = (req) => {
    const response = [];
    const word = req.body.word;
    let opassword = 'TEMAT'
    let password = opassword;
    
    for(let i = 0; i < word.length; i++) {
        password = password.replace(word[i], '%');
        console.log(password);
    }
    for(let i = 0; i < password.length; i++) {
        if (password[i] !== '%') {
            response.push({'grey': i});
        } else if (word[i] == opassword[i]) {
            response.push({'green': i});
        } else {
            response.push({'yellow': i});
        }
    }
    console.log('----------');
    const success = word === password ? true : false;
    
    return { response };
}

module.exports = {
	check: check
};