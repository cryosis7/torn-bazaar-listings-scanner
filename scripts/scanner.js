// TODO: Replace with min version of jQuery
window.$ = window.jQuery = require('jquery');
var UI = require('./scripts/UIController.js');

let key = 'CK0CNIdDaOge7HES';
let allItems = {}

$(function() {
    UI.showTable(false);
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
        throw "@setAllItems - Tried to set all items but was given null parameter"; //TODO: Handle better
    else if (json.error !== undefined) {
        UI.setError(json.error);
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
    UI.showLoader(false, function() { UI.showMessage(true, "Enter an item and your API key to search the market price.") });
}

function getData(callback, category, selections, id = '') {
    let url = `https://api.torn.com/${category}/${id}?selections=${selections}&key=${key}`

    fetch(url)
        .then(res => res.json())
        .then(json => callback(json))
        .catch(err => alert(err))
}