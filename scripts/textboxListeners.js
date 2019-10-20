function setClass() {
    document.querySelectorAll('input[type=text]').forEach(x => {
        if (x.value === '' && x.classList.contains('has-content')) x.classList.remove('has-content');
        else if (x.value !== '' && !x.classList.contains('has-content')) x.classList.add('has-content');
    })
}