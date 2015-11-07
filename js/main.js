var nlform = new NLForm(document.getElementById('nl-form'));

var links = [
	// {
	// 	"url": "http://google.com",
	// 	"title": "text",
	// 	"summary": "fuck you",
	// 	"time": 2
	// }
];
function capitalize(s){
	return s[0].toUpperCase() + s.slice(1);
}
function stripTrailingSlash(str) {
    if(str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}
$(".nl-submit").click(function(e) {
	e.preventDefault();
		if ($('#textValue').prop('value') === "") {
			return;
		};
	$('#loading').show();
	$('#submit-button').hide();
	$.get("http://alligator.eu-gb.mybluemix.net/query/" + $('#textValue').prop('value') + "/" +  $('#timeValue').prop('value'), function(response) {

	 	$.each(response['results'], function(i,row){
		 	var array = {
		 		"summary" : row["abstract"],
		 		"title" : row["title"],
		 		"time" : row["time_taken"] ,
		 		"url" : row["url"],
		 		"exceeded" : row["exceeded"] ? true : false,
		 		"score" : row["score"]
		 	};
		 	links.push(array);
	 	});

		$(".table-materialize").toggleClass('is-visible');
		// $(".nl-form").
		$(".nl-form").html('Learning about ' + $('#textValue').prop('value') + ' for ' + $('#timeValue').prop('value') + ' minutes');
		$('.nl-form').animate({text: '0px'}, 1000);
		var templateRow = _.template("<tr style=<%= exceeded ? 'color:#BBBBBB;' : '' %> > \
				<td><a href= <%= stripTrailingSlash(url) %> style= <%= exceeded ? 'color:#BBBBBB;' : '' %>  ><b><%= title %></b></a><br /> \
				<%= summary %> \
				</td> \
				<td><%= time %> minute<%= parseInt(time, 10) > 1 ? 's' : '' %></td> \
				<td><%= score %></td> \
				</tr> ");
		var htmlRows = ""
		var temp = ""

		_.each(links, function (link) {
			htmlRows += templateRow(link);
		})

		$('#search-result').append(htmlRows)
		$('#loading').hide();
	}, 'json')
	.fail(function() {
		Materialize.toast('Error accessing the server, please refresh the page and try again', 4000)
		$('#loading').hide();
		$('#submit-button').show();


	})
;
});