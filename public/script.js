$(document).ready(function() {
    const inputs = document.getElementsByTagName('input');
    const inputsLength = inputs.length;
    const pattern =  ['A','a','Ą','ą','B','b','C','c','Ć','ć','D','d','E','e','Ę','ę','F','f','G','g','H','h','I','i','J','j','K','k','L','l','Ł','ł','M','m','N','n','Ń','ń','O','o','Ó','ó','P','p','R','r','S','s','Ś','ś','T','t','U','u','W','w','Y','y','Z','z','Ź','ź','Ż','ż'];
    
    const chances = [null, null, null, null, null, null];
    let word = ['', '', '', '', ''];

    const activeLine = (lineId) => {
        for(let i = 0; i < inputsLength; i++) {
            const input = inputs[i];
            
            input.disabled = false;
            
            if (input.parentElement.id !== lineId) {
                input.disabled = true;
            }
        }
    };
    
    activeLine('0');
    $('#0-0').focus();
    
    const submitLine = (lineId) => {
        const nextLine = (Number(lineId) + 1).toString();

        if (word.join('').length === 5) {
            const submitedWord = word.join('');

            word = ['', '', '', '', ''];
            chances[lineId] = submitedWord;

            $.post('/api/check', { word: submitedWord })
            .then((response) => {
                console.log(response);

                activeLine(nextLine);
                $('#'+nextLine).find('input').first().focus();
            });
        }
    };

    for(let i = 0; i < inputsLength; i++) {
        const input = inputs[i];
        
        input.addEventListener('keypress', (e) => {
            const key = e.key.toUpperCase();

            if (key === 'ENTER') {
                const id = e.target.id.split('-');
                const line = id[0];

                submitLine(line);
                return;
            };

            if (pattern.includes(key)) {
                const nextInput = e.target.nextElementSibling;
                const id = e.target.id.split('-');
                const line = id[0];
                const charIndex = id[1];

                e.target.value = key;

                word[charIndex] = key;

                if (nextInput) {
                    nextInput.focus();
                }
            }
        })
    }
});