let badError = 'Oops, you found a bug. Please send a message to Cryosis7[926640] with the error code';
let errorMessages = {
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

exports.setError = function (json) {
    showTable(false, function () {
        let errorMsg = errorMessages[json.code] == badError ? `${badError}: ${json.code}` : errorMessages[json.code];

        $('#search_btn').prop('disabled', false);
        showLoader(false, x => showMessage(true, errorMsg))
    });
}

exports.populateTable = function(data) {
    data = [
        {'quantity': 2, 'price': '840000'},
        {'quantity': 4, 'price': '845000'},
        {'quantity': 1, 'price': '847000'}];

    let html = data.map(row => `<tr><td>${row.quantity}</td><td>${row.price}</td><td>${row.quantity * row.price}</td></tr>`)
    $('#listings tr:has(td)').remove();
    $('#listings tr').after(html);
}

/**
 * Shows or hides the table, with the option to execute a function upon completion.
 * @param {boolean} show True if showing the table, false if hiding.
 * @param {Function} [callback] The function to execute upon completion
 */
exports.showTable = function (show, callback) {
    if (callback !== undefined) {
        if (show && !$('.results_container').is(":visible")) {
            $('.results_container').fadeIn(200, callback);
        } else if (!show && $('#item_name').is(":visible")) {
            $('.results_container').fadeOut(200, callback);
        } else callback();
    } else {
        if (show && !$('.results_container').is(":visible")) {
            $('.results_container').fadeIn(200);
        } else if (!show && $('#item_name').is(":visible")) {
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
exports.showMessage = function (show, message, callback) {
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
            $('#message').parent().fadeOut(200, callback);
        } else if (show && $('#message').is(":visible")) {
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
exports.showLoader = function (show, callback) {
    console.log(callback);
    
    if (callback !== undefined) {
        if (show && !$('.loader').parent().is(":visible")) {
            $('.loader').parent().fadeIn(200, callback);
        } else if (!show && $('.loader').parent().is(":visible")) {
            $('.loader').parent().fadeOut(200, callback);
        } else callback();
    } else {
        if (show && !$('.loader').parent().is(":visible")) {
            $('.loader').parent().fadeIn(200);
        } else if (!show && $('#item_name').parent().is(":visible")) {
            $('.loader').parent().fadeOut(200);
        }
    }
}