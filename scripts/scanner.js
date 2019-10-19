// TODO: Replace with min version of jQuery
window.$ = window.jQuery = require('jquery');

let key = 'CK0CNIdDaOge7HES';
let allItems = {}

$(function() {
    showTable(false);
    getData(x => setAllItems(x), 'torn', 'items');
})

function searchBazaars() {
    console.log(allItems);
}

function setAllItems(json) {
    if (json == null)
        throw "@setAllItems - Tried to set all items but was given null parameter";
    else if (json.items === undefined)
        throw "@setAllItems - Invalid json format: " + json;

    allItems = {};
    for (let x in json.items) {
        allItems[json.items[x].name] = {
            "id": x,
            "market_value": json.items[x].market_value !== 0 ? json.items[x].market_value : "No Market Value"
        }
    }

    $('#search_btn').prop('disabled', false);
    $('.loader').parent().fadeOut(200, "swing", setReady);
}

function setReady() {
    $('.loader').parent().remove()
    $('#message').html("Enter an item and your API key to search the market price.")
    $('#message').parent().fadeIn(200)
}

function getData(callback, category, selections, id = '') {
    let url = `https://api.torn.com/${category}/${id}?selections=${selections}&key=${key}`

    fetch(url)
        .then(res => res.json())
        .then(json => callback(json))
        .catch(err => alert(err))
}

function showTable(show) {
    if (show && !$('.results_container').is(":visible")) {
        $('.results_container').fadeIn(200)
    } else if (!show && $('#item_name').is(":visible")) {
        $('.results_container').fadeOut(200)
    }
}