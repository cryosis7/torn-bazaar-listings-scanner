$(function() {
    setClass();
});

function setClass() {
    $('input[type=text]').each((i, x) => {
        if (x.value === '' && x.classList.contains('has-content')) x.classList.remove('has-content');
        else if (x.value !== '' && !x.classList.contains('has-content')) x.classList.add('has-content');

        // Enabling/Disabling the search button
        $('#search_btn').prop('disabled', $('input[type=text]').is(':not(.has-content)'));
    });
}