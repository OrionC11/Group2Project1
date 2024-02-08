// var mapContainer = $('#map')
function displayMap(){
    let center = [4,44.4]
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
var departAirportEl = $(".departureCity")
var arrivalAirportEl = $(".arrivalCity")
var departDateEl = $(".ddate")
$(function(){
    var departDate = departDateEl.val()
    var departAirport = deportAirport.val()
    var arrivalAirport = arrivalAirport.val()
    return departDate, departAirport, arrivalAirport
})
displayMap()
let flightUrl= "https://test.api.amadeus.com/v2/shopping/flight-offers?" + "originLocationCode=" + departAirport + "&destinationLocationCode=" + arrivalAirport + "departureDate=" + departDateEl + "&adults=1&max=2";

fetch(flightUrl)
.then((response) => response.json())
.then(data)
console.log(data);






     $(function(){
        $("#datepicker").datepicker({
          changeMonth: true,
          changeYear: true
        })});


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