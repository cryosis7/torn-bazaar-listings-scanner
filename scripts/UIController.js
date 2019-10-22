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
};

$(function() {
    $('.results_container').hide();
    $('#message').parent().hide();
    $('.loader').parent().hide();
});

exports.makeTransition = makeTransition;
exports.showLoader = showLoader;
exports.populateTable = populateTable;

exports.setError = function(json) {
    let errorMsg = errorMessages[json.error.code] == badError ? `${badError}: ${json.error.code}` : errorMessages[json.error.code];
    makeTransition('message', errorMsg)
}

function populateTable(data) {
    let html = data.map(row => `<tr><td>${row.quantity}</td><td>${row.price}</td><td>${row.quantity * row.price}</td></tr>`)
    $('#listings tr:has(td)').remove();
    $('#listings tr').after(html);
}

/**
 * Makes a transition between elements.
 * @param {string} element The element to show. Either 'loader', 'message' or 'table'
 * @param {boolean} message The message to set the message element to.
 */
function makeTransition(element, message) {
    switch (element.toLowerCase()) {
        case 'loader':
            showMessage(false);
            showTable(false, () => showLoader(true));
            break;
        case 'table':
            showMessage(false);
            showLoader(false, () => showTable(true));
            break;
        case 'message':
            showLoader(false);
            showTable(false, () => showMessage(true, message));
            break;
        default:
            throw 'Invalid Parameter - Expected "loader/message/table"';
    }
}

/**
 * Shows or hides the table, with the option to execute a function upon completion.
 * @param {boolean} show True if showing the table, false if hiding.
 * @param {Function} [callback] The function to execute upon completion
 */
function showTable(show, callback) {
    if (callback !== undefined) {
        if (show && $('.results_container').is(":hidden")) {
            $('.results_container').fadeIn(200, callback);
        } else if (!show && $('#item_name').not(":hidden")) {
            $('.results_container').fadeOut(200, callback);
        } else callback();
    } else {
        if (show && $('.results_container').is(":hidden")) {
            $('.results_container').fadeIn(200);
        } else if (!show && $('#item_name').not(":hidden")) {
            $('.results_container').fadeOut(200);
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
        if (show && $('#message').is(":hidden")) {
            if (message !== undefined) $('#message').text(message);
            $('#message').parent().fadeIn(200);
        } else if (!show && $('#item_name').not(":hidden")) {
            $('#message').parent().fadeOut(200);
            if (message !== undefined) $('#message').text(message);
        } else if (show && $('#message').not(":hidden")) {
            if (message !== undefined) $('#message').text(message);
        }
    } else {
        if (show && $('#message').is(":hidden")) {
            $('#message').text(message);
            $('#message').parent().fadeIn(200, callback);
        } else if (!show && $('#item_name').not(":hidden")) {
            $('#message').parent().fadeOut(200, callback);
        } else if (show && $('#message').not(":hidden")) {
            $('#message').text(message);
            callback();
        }
    }
}

/**
 * Shows or hides the loader, with the option to execute a function upon completion.
 * @param {boolean} show True if showing the loader, false if hiding.
 * @param {*} [callback] Optional function to execute upon completion
 */
function showLoader(show, callback) {
    if (callback !== undefined) {
        if (show && $('.loader').parent().is(":hidden")) {
            $('.loader').parent().fadeIn(200, callback);
        } else if (!show && $('.loader').parent().not(":hidden")) {
            $('.loader').parent().fadeOut(200, callback);
        } else callback();
    } else {
        if (show && $('.loader').parent().is(":hidden")) {
            $('.loader').parent().fadeIn(200);
        } else if (!show && $('#item_name').parent().not(":hidden")) {
            $('.loader').parent().fadeOut(200);
        }
    }
}