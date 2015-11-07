import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import Firebase from 'firebase'

function capitalize(s){
	return s[0].toUpperCase() + s.slice(1);
}
function stripTrailingSlash(str) {
    if(str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}
// $(".nl-submit").click(function(e) {
// 	e.preventDefault();
// 		if ($('#textValue').prop('value') === "") {
// 			return;
// 		};
// 	$('#loading').show();
// 	$('#submit-button').hide();
// 	$.get("http://alligator.eu-gb.mybluemix.net/query/" + $('#textValue').prop('value') + "/" +  $('#timeValue').prop('value'), function(response) {

// 	 	$.each(response['results'], function(i,row){
// 		 	var array = {
// 		 		"summary" : row["abstract"],
// 		 		"title" : row["title"],
// 		 		"time" : row["time_taken"] ,
// 		 		"url" : row["url"],
// 		 		"exceeded" : row["exceeded"] ? true : false,
// 		 		"score" : row["score"]
// 		 	};
// 		 	links.push(array);
// 	 	});

// 		$(".table-materialize").toggleClass('is-visible');
// 		// $(".nl-form").
// 		$(".nl-form").html('Learning about ' + $('#textValue').prop('value') + ' for ' + $('#timeValue').prop('value') + ' minutes');
// 		$('.nl-form').animate({text: '0px'}, 1000);
// 		var templateRow = _.template("<tr style=<%= exceeded ? 'color:#BBBBBB;' : '' %> > \
// 				<td><a href= <%= stripTrailingSlash(url) %> style= <%= exceeded ? 'color:#BBBBBB;' : '' %>  ><b><%= title %></b></a><br /> \
// 				<%= summary %> \
// 				</td> \
// 				<td><%= time %> minute<%= parseInt(time, 10) > 1 ? 's' : '' %></td> \
// 				<td><%= score %></td> \
// 				</tr> ");
// 		var htmlRows = ""
// 		var temp = ""

// 		_.each(links, function (link) {
// 			htmlRows += templateRow(link);
// 		})

// 		$('#search-result').append(htmlRows)
// 		$('#loading').hide();
// 	}, 'json')
// 	.fail(function() {
// 		Materialize.toast('Error accessing the server, please refresh the page and try again', 4000)
// 		$('#loading').hide();
// 		$('#submit-button').show();


// 	})
// ;
// });


$(() => {
	class MainButtonsComponent extends React.Component {
		render () {
			return (
	      <form id="nl-form" className="nl-form">
	        <span className="thing">Washrooms</span>
	        <div className="nl-submit-wrap" align="center" id="submit-button">
	          <a className="waves-effect waves-light btn-large">Level 1</a><br /><br />
	          <a className="waves-effect waves-light btn-large">Level 2</a><br /><br />
	          <a className="waves-effect waves-light btn-large">The one we never clean</a><br /><br />
	        </div>
	        <div className="nl-overlay"></div>
	      </form>
      )
		}
	}

	class TableComponent extends React.Component {
		constructor (props) {
			super(props)
			this.state = {logs: []}
		}

		componentWillMount () {
		  this.firebaseRef = new Firebase("https://monikadb.firebaseio.com/logs/");
		  this.firebaseRef.on("child_added", (dataSnapshot) => {
		  	this.setState({logs: this.state.logs.concat(dataSnapshot.val())})
		  	console.log(this.state)
		  })
		}

		render () {
			var tableRowNodes = []
			var tableRows = this.state.logs[this.state.logs.length - 1]
			console.log(tableRows)
			if (tableRows) {
				var keys = Object.keys(tableRows)
				
				for (let key of keys) {
					tableRowNodes.push(
						<tr key={key}>
							<td>{key}</td>
							<td>{tableRows[key]}</td>
						</tr>
					)
				}
			}
			
			return (
				<table>
	        <thead>
	          <tr>
	              <th data-field="id">Device ID</th>
	              <th data-field="time">Time Spent</th>
	          </tr>
	        </thead>
	        <tbody>
	          {tableRowNodes}
	        </tbody>
	      </table>
			)
		}
	}


	// <img src="images/loading_animation.gif" id="loading" align="center" height=30% width=30% style="display:none;"></img>
        
 //      </div>
 	      // <Route path="about" component={About}/>
	      // <Route path="users" component={Users}>
	      //   <Route path="/user/:userId" component={User}/>
	      // </Route>
	      // <Route path="*" component={NoMatch}/>
	ReactDOM.render((
	  <Router>
	    <Route path="/" component={MainButtonsComponent}></Route>
	    <Route path="/level1" component={TableComponent}></Route>
	  </Router>
	), document.getElementById('main'))
})