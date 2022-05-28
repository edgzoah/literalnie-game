$(document).ready(() => {
    const inputs = document.getElementsByTagName('input');
    const inputsLength = inputs.length;
    const pattern =  ['A','a','Ą','ą','B','b','C','c','Ć','ć','D','d','E','e','Ę','ę','F','f','G','g','H','h','I','i','J','j','K','k','L','l','Ł','ł','M','m','N','n','Ń','ń','O','o','Ó','ó','P','p','R','r','S','s','Ś','ś','T','t','U','u','W','w','Y','y','Z','z','Ź','ź','Ż','ż'];
    let previousKey;
    const chances = [null, null, null, null, null, null];
    let word = ['', '', '', '', ''];
    let isDeleting = false;
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

    let nextWord = new Date();
    let year = nextWord.getFullYear();
    let month = nextWord.getMonth();
    let day = nextWord.getDate()+1;
    let hour = 0;
    let minute = 0;
    let second = 0;
    let ms = 0;
    let nextDayWord = new Date(year, month, day, hour, minute, second, ms).getTime();

    let timer = setInterval(() => {
        let date = new Date().getTime();
        let distance = nextDayWord - date;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        $('.modal-body').html(`Do następnego słowa: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000)

    const isGreen = (item) => {
        return item == '#538d4e';
    }
   
    const submitLine = (lineId) => {
        const nextLine = (Number(lineId) + 1).toString();

        if (word.join('').length === 5) {
            const submitedWord = word.join('');

            word = ['', '', '', '', ''];
            chances[lineId] = submitedWord;

            $.post('/api/check', { word: submitedWord })
            .then((response) => {
                response.response.forEach((element, index) => {
                    $(`#${nextLine-1+'-'+index}`).css('background', element);
                });
                if (response.response.every(isGreen)) {
                    $('#myModal').modal();
                    $(`#${lineId}`).find('input').prop('disabled', true);
                } else {
                    activeLine(nextLine);
                    $(`#${nextLine}`).find('input').first().focus();
                    if (nextLine == 6) {
                        $('#myModal1').modal();
                    }
                }
            });

        }
    };

    $('input').focus(function(e) {
        let firsttwo = $(this).attr('id').substring(0, 2);
        let lastprev = Number($(this).attr('id')[$(this).attr('id').length-1])-1;
        let previous = firsttwo + '' + lastprev;
        if ($(`#${previous}`).val() == '') {
            $(`#${previous}`).focus();
        }
        return false;
    });
    
    $('input').keypress(function(e) {
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
            const charIndex = id[1];

            e.target.value = key;

            word[charIndex] = key;

            if (nextInput) {
                nextInput.focus();
            }
        }
    });

    $('html').keydown((e) => {
        if (e.keyCode == 8) {
            if (previousKey == 13) {
                return false;
            }
            isDeleting = true;
            $('input').each((index, el) => {
                if ($('input').eq(index).val() == '') {
                    $('input').eq(index-1).focus();
                    if ($('input').eq(index-1).is(':focus')) {
                        word[$('input').eq(index-1).attr('id')[2]] = '';
                        $('input').eq(index-1).val('');
                        return false;
                    }
                    isDeleting = false;
                    return false;
                }
            });
        }
        previousKey = e.keyCode;
    });
    $('input').blur(function(e) {
        if ($(this).attr('id')[2] == 4 && pattern.includes($(this).val())) {
            $(this).focus();
        }
        if ($(this).val() == '' && !isDeleting) {
            $(this).focus();
        }
        if (isDeleting) {
            isDeleting = false;
        }
    })
});