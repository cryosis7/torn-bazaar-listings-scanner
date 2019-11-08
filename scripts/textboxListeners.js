$(function() {
    $('#api_key').val(settings.get('api_key'));
    setClass();

    $("input").keyup((event) => { if (event.keyCode === 13) searchBazaars() });
});

/**
 * Runs through all the input fields and gives them the 'has-content' class if they contain text.
 */
function setClass() {
    $('input[type=text]').each((i, x) => {
        if (x.value === '' && x.classList.contains('has-content')) x.classList.remove('has-content');
        else if (x.value !== '' && !x.classList.contains('has-content')) x.classList.add('has-content');

        // Enabling/Disabling the search button
        $('#search_btn').prop('disabled', $('input[type=text]').is(':not(.has-content)'));
    });
}

/**
 * Stores the entered text into the api key settings then calls the setClass() function.
 */
function setApiKey() {
    settings.set('api_key', $('#api_key').val().replace(' ', ''))
    setClass();
}