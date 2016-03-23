

function removeButtonOnClick(){
   $("#bottom-panel").on("click", ".btn", function(event){
    var itineraryItem = $(this).closest('.itinerary-item').html();
    var name = $(this).siblings('.title').html();
    var type = $(this).closest('.list-group').siblings('h4').html().split(' ')[1];
    var marker = day[current][type].locations.findIndex(function(element){
      return element.name = name;
    })
    deletefromMap(day[current][type].locations[marker]);
    day[current][type].locations.splice(marker, 1);
  })
}

function deletefromMap(pin){
  pin.marker.setMap(null);
  $("span:contains("+pin.name+")").parent().remove();

  narrowBounds();
}

// exports.removeButtonOnClick = removeButtonOnClick;
// exports.deletefromMap = deletefromMap;