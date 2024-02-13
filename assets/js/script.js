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
let submitBtn = $('.submitBtn')



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
            var modalEl = $(".box")
            modalEl.html('');

        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
            var modalEl = $(".box")
            modalEl.html('');
        }
    });
});

function createSearchBox() {
    var options = {
        searchOptions: {
            key: "ZKJKtC3EXjK9EOei1P0ipgADrv9RblQy",
            language: "en-GB",
            limit: 5,
            // query: "restroom"

        },
        autocompleteOptions: {
            key: "ZKJKtC3EXjK9EOei1P0ipgADrv9RblQy",
            language: "en-GB",
        },

    }
    $(".box .tt-search-box").remove();
    var ttSearchBox = new tt.plugins.SearchBox(tt.services, options)
    console.log("dang")
    console.log(ttSearchBox, options)
    var searchBoxHTML = ttSearchBox.getSearchBoxHTML()
    var modalEl = $(".box")
    console.log(modalEl)
    modalEl.append(searchBoxHTML)
}


function getAccessCode(callback) {
    $.ajax({
        url: "https://test.api.amadeus.com/v1/security/oauth2/token",
        method: 'POST',
        data: {
            grant_type: "client_credentials",
            client_id: "fbjcGA5jsGIuiu2gNgHUJ0CfqCyZ9dMp",
            client_secret: "P1wiYMjga5fzgGwe"
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (response) {
            console.log(response)
            if (response && response.access_token) {
                callback(response.access_token);
            } else {
                console.log('No access token found');
                callback(null);
            }
        },
        error: function (xhr, status, error) {
            console.log('Error:', xhr.responseText);
            callback(null);
        }
    });
}

// function getFlightOffers(accessToken, callback) {
//     var departureCity = $('.departureCity').val();
//     var arrivalCity = $('.arrivalCity').val();
//     getAccessCode(function (accessToken) {
//         if (!accessToken) {
//             console.log('Error: Access token not obtained.');
//             callback(null);
//             return;
//         }})
//         $.ajax({
//             url: 'test.api.amadeus.com/v2/shopping/flight-offers',
//             method: 'GET',
//             data: {
//                 originLocationCode:   getAirportCode(departureCity, function (departureAirportCode) {
//                     if (!departureAirportCode) {
//                         console.log('Error: Departure city not found.');
//                         return;
//                     }}),
//                 destinationLocationCode: getAirportCode(arrivalCity, function (arrivalAirportCode) {
//                     if (!arrivalAirportCode) {
//                         console.log('Error: Arrival city not found.');
//                         return;
//                     }}),
//                 departureDate: $('#datepicker').val(),
//                 adults: 1
//             },
//             headers: {
//                 'Authorization': "Bearer " + accessToken
//             },
//             success: function(response) {
//                 console.log(response)
//             }
//         })
//     }

// Define getAirportCode function
function getAirportCode(cityName, callback) {
    // Call getAccessCode to retrieve access token
    getAccessCode(function (accessToken) {
        if (!accessToken) {
            console.log('Error: Access token not obtained.');
            callback(null);
            return;
        }
        // Use the obtained access token to make API call for airport codes
        $.ajax({
            url: 'https://test.api.amadeus.com/v1/reference-data/locations',
            method: 'GET',
            data: {
                subType: 'CITY,AIRPORT',
                keyword: cityName
            },
            headers: {
                'Authorization': "Bearer " + accessToken
            },
            success: function (response) {
                if (response.data && response.data.length > 0) {
                    var airportCode = response.data[0].iataCode;
                    callback(airportCode);
                } else {
                    console.log('No airports found for the specified city.');
                    callback(null);
                }
            },
            error: function (xhr, status, error) {
                console.log('Error:', xhr.responseText);
                callback(null);
            }
        });
    });
}
// Click event handler for the submit button
// $('.submitBtn').click(function () {

//     getFlightOffers(function (departureAirportCode, arrivalAirportCode) {

//         if (!departureAirportCode) {
//             console.log('Error: Departure Airport Code not found.');
//             callback(null);
//             return;
//         } else if (!arrivalAirportCode){
//             console.log('Error: Arrival Airport Code not found.');
//             callback(null);
//             return;
//         }
//     })
// })

// Click event handler for the submit button
$('.submitBtn').click(function () {
    var departureCity = $('.departureCity').val();
    var arrivalCity = $('.arrivalCity').val();
    var departureAirportCode, arrivalAirportCode;

    getAirportCode(departureCity, function (departureCode) {
        departureAirportCode = departureCode;
        getAirportCode(arrivalCity, function (arrivalCode) {
            arrivalAirportCode = arrivalCode;
            // Now that we have both airport codes, call getFlightOffers
            if (departureAirportCode && arrivalAirportCode) {
                getAccessCode(function (accessToken) {
                    if (!accessToken) {
                        console.log('Error: Access token not obtained.');
                        return;
                    }
                    getFlightOffers(accessToken, departureAirportCode, arrivalAirportCode, function (flightOffers) {
                        console.log(flightOffers);
                    });
                });
            } else {
                console.log('Error: Airport codes not obtained.');
            }
        });
    });
});

// Modify getFlightOffers function to accept departure and arrival airport codes
function getFlightOffers(accessToken, departureAirportCode, arrivalAirportCode, callback) {
    $.ajax({
        url: 'https://test.api.amadeus.com/v2/shopping/flight-offers',
        method: 'GET',
        data: {
            originLocationCode: departureAirportCode,
            destinationLocationCode: arrivalAirportCode,
            departureDate: $('#datepicker').val(),
            adults: 1
        },
        headers: {
            'Authorization': "Bearer " + accessToken
        },
        success: function(response) {
            callback(response);
        },
        error: function(xhr, status, error) {
            console.log('Error:', xhr.responseText);
            callback(null);
        }
    });
}