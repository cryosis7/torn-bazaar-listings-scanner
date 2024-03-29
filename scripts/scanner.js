// TODO: Replace with min version of jQuery
window.$ = window.jQuery = require('jquery');
var UI = require('./scripts/UIController.js');
const settings = require('electron-settings');

var key;
var allItems = [];

$(function() {
    UI.makeTransition('message', "Enter an item and your API key to search the market price.");
    // getData(json => setAllItems(json), 'torn', 'items');
})


function searchBazaars() {
    if ($('#api_key').val() !== key) {
        key = $('#api_key').val().replace(' ', '');
        // settings.set('api_key', key);
    }

    getItem($('#item_text.has-content').val(), item => {
        getBazaarPrices(item, (bazaarPrices) => {
            bazaarPrices = bazaarPrices.sort((a, b) => a.price <= b.price ? -1 : 1);
            UI.populateTable(item.name, bazaarPrices.slice(0, Math.min(11, bazaarPrices.length)));
            UI.makeTransition('table');
        });
    });
}

/**
 * Using the JSON parameter, stores all items as an array with fields: name, stripped_name, id and market_value.
 * @param {string} json The json containing all items
 */
function setAllItems(json) {
    if (json == null || json === undefined)
        throw "@setAllItems - Tried to set all items but was given empty parameter"; //TODO: Handle better
    else if (json.items === undefined)
        throw "@setAllItems - Invalid json format: " + json;

    allItems = [];
    for (let x in json.items) {
        allItems.push({
            "name": json.items[x].name,
            "lowercase_name": json.items[x].name.toLowerCase(),
            "id": x,
            "market_value": json.items[x].market_value !== 0 ? json.items[x].market_value : "No Market Value"
        });
    }
}

/**
 * Makes a request to the Torn API then executes the callback function with the JSON results. 
 * @param {function} callback 
 * @param {string} category 
 * @param {string} selections 
 * @param {string} id 
 */
async function getData(callback, category, selections, id = '') {
    let url = `https://api.torn.com/${category}/${id}?selections=${selections}&key=${key}`

    UI.makeTransition('loader');
    fetch(url)
        .then(res => res.json())
        .then(json => json.error === undefined ? callback(json) : UI.setError(json))
        .catch(err => alert(err))
}

/**
 * Get's the item then executes the callback upon completion.
 * @param {string} usersItemName The item to search for.
 */
async function getItem(usersItemName, callback) {
    if (!allItems.length) {
        getData(function(json) {
            setAllItems(json);
            getItem(usersItemName, callback);
            return
        }, 'torn', 'items');
    }

    usersItemName = usersItemName.toLowerCase();
    for (let item of allItems) {
        if (item.lowercase_name.includes(usersItemName)) {
            callback(item);
            return;
        }
    }
    UI.makeTransition("message", "No Items Found")
}

/**
 * Retrieves an array of bazaar prices for an ID, then executes a callback function.
 * @param {object} item The item to search bazaar prices for
 * @param {function} callback The function to execute upon completion
 */
function getBazaarPrices(item, callback) {
    getData(function(json) {
        if (json.bazaar !== null) {

            callback(Object.keys(json.bazaar).map(function(listing) {
                return { 'price': json.bazaar[listing].cost, 'quantity': json.bazaar[listing].quantity }
            }));
        } else {
            UI.makeTransition('message', 'No listings on market for ' + item.name);
        }
    }, 'market', 'bazaar', item.id)
}