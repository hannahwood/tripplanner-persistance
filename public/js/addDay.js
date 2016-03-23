function addDay() {
  $('.add-day').click(function(event){
  	// console.log($this);
  	newDay();
  	 $(this).before('<button class="btn btn-circle day-btn">'+day.count+'</button>');
  })
}

function changeDay(){
	$('.day-buttons').on('click', '.day-btn',function(event){
		var currentDay = "Day" + $(this).html();
		clearMapMarkers();

		$('.current-day').removeClass('current-day');
		current = currentDay;
		$(this).addClass('current-day');
		updateMapMarkers();
  })
}

function clearMapMarkers(){
	eventArray.forEach(function(element){
		day[current][element].locations.forEach(function(pin){
			pin.marker.setMap(null);
		})	
	})
	clearItinerary();

}

function clearItinerary(){
	$(".itinerary-item").remove();
}

function updateMapMarkers(){
	eventArray.forEach(function(element){
		day[current][element].locations.forEach(function(pin){
			pin.marker.setMap(map);
		})	
	})
	updateItinerary();
	narrowBounds();
}

function updateItinerary(){
	eventArray.forEach(function(element){
		day[current][element].locations.forEach(function(pin){
			$("h4:contains(My "+element+")").next().append("<div class='itinerary-item'><span class='title'>"+pin.name+"</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button></div>");
		})	
	})

	$('#day-title').children('span').html("Day " + current.slice(3));
}

function deleteDay() {
	$('#day-title').on('click', '.remove',function(event) {
		console.log("in delete day" + day);
		var dayNum = Number(current.slice(3));

		clearMapMarkers();

		for (var x = dayNum; x < day.count; x++){
			var dayKey = 'Day'+x;
			var nextDayKey = 'Day'+(x+1);
			day[dayKey] = day[nextDayKey];
		}
		delete day["Day"+day.count];
		console.log(day);
		$('.btn:contains('+day.count+')').remove();
		day.count--;
		if (dayNum > day.count){
			current = "Day"+(day.count);
			$('.btn:contains('+day.count+')').addClass('current-day');
		}
		updateMapMarkers();
		
		

	})
	
}