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


function getAirportCode(cityName, callback) {
    var getAccessCode = function(){
        var accessToken = ""
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
            success: function(response) {
                console.log(response)
                if (response) {
                     var accessToken = response.access_token
                    // console.log(access)
            } else {
                console.log('No access token found')
            }
        }
        }).then(response, function(){
            return accessToken
        }

        )
        // return access
    }
    var access = getAccessCode()
    console.log(access)
    $.ajax({
        url: 'https://test.api.amadeus.com/v1/reference-data/locations',
        method: 'GET',
        data: {
            subType: 'CITY,AIRPORT',
            keyword: cityName
        },
        headers: {
            'Authorization': "Bearer "+access
        },
        success: function (response) {
            if (response.data && response.data.length > 0) {
                var airportCode = response.data[0].iataCode
                callback(airportCode)
                return airportCode
            } else {
                console.log('No airports found for the specified city.')
                callback(null)
            }
        },
        error: function (xhr, status, error) {
            console.log('Error:', xhr.responseText)
            callback(null)
        }
    });
}


// function flightfunction() {
//     var departAirport = $(".departureCity").val()
//     var arrivalAirport = $(".arrivalCity").val()
//     var departDate = $(".ddate").val()

//     let flightUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?" + "originLocationCode=" + departAirport + "&destinationLocationCode=" + arrivalAirport + "departureDate=" + departDateEl + "&adults=1&max=2";

//     $.ajax({
//         url: flightUrl,
//         method: 'GET',
//         dataType: 'JSON',
//         data: {
//             "client_id": "3sY9VNvXIjyJYd5mmOtOzJLuL1BzJBBp",


//         }
//     })
//         .then((response) => response.json())
//         .then(data)
//     console.log(data);

// }
$('.submitBtn').click(function () {
    var departureCity = $('.departureCity').val()
    var arrivalCity = $('.arrivalCity').val()
    getAirportCode(departureCity, function (departureAirportCode) {
        if (!departureAirportCode) {
            console.log('Error: Departure city not found.')
            return;
        } 
    })
        getAirportCode(arrivalCity, function (arrivalAirportCode) {
            if (!arrivalAirportCode) {
                console.log('Error: Arrival city not found.')
                return 
            } 
        
            console.log('Departure Airport Code:', departureAirportCode)
            console.log('Arrival Airport Code:', arrivalAirportCode)
})
})
