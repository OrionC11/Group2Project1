// https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode
// "type": "amadeusOAuth2Token",
// "username": "alutterbein@gmail.com",
// "application_name": "Flight and Flush",
// "client_id": "ROTqII4NAuYXaiFGKI4ZoT8GttNkSHCw",
// "token_type": "Bearer",
// "access_token": "hAGBDOGfm8s80AvRdGBbU3iHPUIV",
// "expires_in": 1799,
// "state": "approved",
// "scope": ""
function displayMap() {
    let center = [4, 44.4]
    var map = tt.map({
        key: "ZKJKtC3EXjK9EOei1P0ipgADrv9RblQy",
        container: "map",
        center: center,
        zoom: 10
    })
    map.on('load', () => {
        new tt.Marker().setLngLat(center).addTo(map)
    })
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl())
    console.log("test log")
}
displayMap()
$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    })
});
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
            createSearchBox()
            console.log("this is happening")
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (e.key === "Escape") {
            closeAllModals();
        }
    });
});

function createSearchBox() {
    var options = {
        searchOptions: {
            key: "ZKJKtC3EXjK9EOei1P0ipgADrv9RblQy",
            language: "en-GB",
            limit: 5,
            query: "restroom"

        },
        autocompleteOptions: {
            key: "ZKJKtC3EXjK9EOei1P0ipgADrv9RblQy",
            language: "en-GB",
        },

    }

    var ttSearchBox = new tt.plugins.SearchBox(tt.services, options)
    console.log(ttSearchBox, options)
    var searchBoxHTML = ttSearchBox.getSearchBoxHTML()
    var modalEl = $(".box") 
    modalEl.appendChild(searchBoxHTML)
}








var departAirport = $(".departureCity").val()
var arrivalAirport = $(".arrivalCity").val()
var departDate = $(".ddate").val()

let flightUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?" + "originLocationCode=" + departAirport + "&destinationLocationCode=" + arrivalAirport + "departureDate=" + departDateEl + "&adults=1&max=2";

fetch(flightUrl)
    .then((response) => response.json())
    .then(data)
console.log(data);


