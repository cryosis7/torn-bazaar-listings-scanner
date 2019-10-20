// TODO: Replace with min version of jQuery
window.$ = window.jQuery = require('jquery');

let key = 'CK0CNIdDaOge7HES';
let allItems = {}

$(function() {
    showTable(false);
    getData(x => setAllItems(x), 'torn', 'items');
})

function searchBazaars() {
    if ($('#api_key').val() !== key) {
        key = $('#api_key').val().replace(' ', '');
    }
    console.log(allItems);
}

function setAllItems(json) {
    if (json == null)
        throw "@setAllItems - Tried to set all items but was given null parameter";
    else if (json.error !== undefined) {
        setError(json.error);
        return;
    } else if (json.items === undefined) throw "@setAllItems - Invalid json format: " + json;

    allItems = {};
    for (let x in json.items) {
        allItems[json.items[x].name] = {
            "id": x,
            "market_value": json.items[x].market_value !== 0 ? json.items[x].market_value : "No Market Value"
        }
    }

    $('#search_btn').prop('disabled', false);
    $('.loader').parent().fadeOut(200, "swing", function() {
        $('.loader').parent().remove()
        showMessage(true, "Enter an item and your API key to search the market price.");
    });
}

function getData(callback, category, selections, id = '') {
    let url = `https://api.torn.com/${category}/${id}?selections=${selections}&key=${key}`

    fetch(url)
        .then(res => res.json())
        .then(json => callback(json))
        .catch(err => alert(err))
}

function setError(json) {
    showTable(false, function() {
        let errorMsg = errorMessages[json.code] == badError ? `${badError}: ${json.code}` : errorMessages[json.code];

        $('#search_btn').prop('disabled', false);
        if ($('.loader').length) { //Removing the spinner if it exists.
            $('.loader').parent().fadeOut(200, "swing", function() {
                $('.loader').parent().remove()
                showMessage(true, errorMsg);
            });
        } else {
            showMessage(true, errorMsg);
        }
    })
}

/**
 * Shows or hides the table, with the option to execute a function upon completion.
 * @param {boolean} show True if showing the table, false if hiding.
 * @param {Function} [callback] The function to execute upon completion
 */
function showTable(show, callback) {
    if (callback !== undefined) {
        if (show && !$('.results_container').is(":visible")) {
            $('.results_container').fadeIn(200, callback)
        } else if (!show && $('#item_name').is(":visible")) {
            $('.results_container').fadeOut(200, callback)
        } else callback();
    } else {
        if (show && !$('.results_container').is(":visible")) {
            $('.results_container').fadeIn(200)
        } else if (!show && $('#item_name').is(":visible")) {
            $('.results_container').fadeOut(200)
        }
    }
}

/**
 * Shows or hides the message text, with the option to execute a function upon completion.
 * @param {boolean} show True if showing the table, false if hiding.
 * @param {string} [message] Optional parameter to change the text.
 * @param {*} [callback] Optional function to execute upon completion
 */
function showMessage(show, message, callback) {
    if (callback === undefined) {
        if (show && !$('#message').is(":visible")) {
            if (message !== undefined) $('#message').text(message);
            $('#message').parent().fadeIn(200);
        } else if (!show && $('#item_name').is(":visible")) {
            $('#message').parent().fadeOut(200);
            if (message !== undefined) $('#message').text(message);
        } else if (show && $('#message').is(":visible")) {
            if (message !== undefined) $('#message').text(message);
        }
    } else {
        if (show && !$('#message').is(":visible")) {
            $('#message').text(message);
            $('#message').parent().fadeIn(200, callback);
        } else if (!show && $('#item_name').is(":visible")) {
            $('#message').parent().fadeOut(200, callback)
        } else if (show && $('#message').is(":visible")) {
            $('#message').text(message);
            callback()
        }
    }
}

const badError = 'Oops, you found a bug. Please send a message to Cryosis7[926640] with the error code';
const errorMessages = {
    0: badError,
    1: 'No Key Entered',
    2: 'Incorrect API Key',
    3: badError,
    4: badError,
    5: 'Too Many Requests (100 per minute) - Try again shortly',
    6: badError,
    7: badError,
    8: 'IP is temporarily blocked. Try again shortly',
    9: 'The Torn API is currently down :(',
    10: 'Key owner is in federal jail',
    11: 'Recent Key Change - Try again shortly',
    12: 'Torn had an issue reading the key from the database'
}