
function addButtonOnClick(){
  $("#top-panel").on("click", ".btn", function(event){
    var type = $(this).siblings('h4').html();
    var name = $(this).siblings('select').val();
    
    if (type === 'Hotel') {
      var selection = hotels.find(function(element){
        return element.name === name;
        })
    } else if (type === 'Restaurants') {
      var selection = restaurants.find(function(element){
        return element.name === name;
      })
    } else {
      var selection = activities.find(function(element){
        return element.name === name;
      })
    }
    console.log('name = ' + name + ' type = ' + type + ' selection = ' + JSON.stringify(selection));
    addToMap(selection, type);
  })
}

function addThingtoBottomPanel(place, type){
  var newtype = 'My ' + type
  console.log(type);

  $("h4:contains("+newtype+")").next().append("<div class='itinerary-item'><span class='title'>"+place.name+"</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button></div>");
  // addToMap(place, type);
}


function addToMap(place, type) {
  console.log(day[current][type].locations);
  if (type === 'Hotel' && day[current][type].locations[0]){
    deletefromMap(day[current][type].locations.pop());
  }

  var pinExists = day[current][type].locations.find(function(el) {
    return el.name === place.name;
  })
  if (!pinExists){
    var drawnMarker = drawLocation(place.place.location, {icon: day[current][type].pinurl});
    day[current][type].locations.push({name: place.name, marker: drawnMarker});
    addThingtoBottomPanel(place,type);
  }
  narrowBounds()
}

function drawLocation(location, opts) {
  if (typeof opts !== 'object') {
    opts = {};
  }
  opts.position = new google.maps.LatLng(location[0], location[1]);
  opts.map = map;
  var marker = new google.maps.Marker(opts);
  return marker; 
}
