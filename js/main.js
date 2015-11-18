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
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}


$(() => {
	class MainButtonsComponent extends React.Component {
		render () {
			return (
	      <form id="nl-form" className="nl-form">
	        <span className="thing">Washrooms</span>
	        <div className="nl-submit-wrap" align="center" id="submit-button">
	          <a className="waves-effect waves-light btn-large" href="/#/level1">Level 1</a><br /><br />
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
			this.state = {
				logs: [],
				elapsed: 0,
				interval: null,
				lastSlow: 0
			}
		}

		updateElapsed () {
			if (!this.state.logs.length) {
				console.log('uninit')
				return setTimeout(this.updateElapsed.bind(this), 1000)
			}
			var tableRows = this.state.logs[this.state.logs.length - 1]
			var keys = Object.keys(tableRows)
			var startTime = tableRows[keys[0]]
			if (keys.length == 2) {
				console.log('slow')
				var elapsed = Math.floor(Date.now()/1000 - startTime)
				this.setState({elapsed: elapsed, lastSlow: elapsed})
		  	setTimeout(this.updateElapsed.bind(this), 1000)
		  } else {
		  	console.log('fast')
		  	var lastSlow = Math.max(this.state.lastSlow, 80) + 1
		  	this.setState({elapsed: lastSlow + Math.floor((Date.now()/1000 - startTime - lastSlow) * 120)})
		  	//this.setState({elapsed: this.state.elapsed + 2})
		  	setTimeout(this.updateElapsed.bind(this), 1000/60)
		  }
		}

		componentWillMount () {
		  this.firebaseRef = new Firebase("https://monikadb.firebaseio.com/logs/");
		  this.firebaseRef.on("child_added", (dataSnapshot) => {
		  	this.setState({logs: this.state.logs.concat(dataSnapshot.val())})
		  })
		  this.updateElapsed.bind(this)()
		}

		render () {
			var tableRowNodes = []
			var tableRows = this.state.logs[this.state.logs.length - 1]
			if (tableRows) {
				var keys = Object.keys(tableRows)
				for (let key of keys) {
					var totalSeconds = this.state.elapsed
					var minutes = Math.floor(totalSeconds / 60)
					var seconds = totalSeconds % 60
					//var displayTime = zeroPad(minutes,2) +':' + zeroPad(seconds,2) + ' minutes'
					var displayTime = zeroPad(minutes,2) +'m' + zeroPad(seconds,2) + 's'
					tableRowNodes.push(
						<tr key={key}>
							<td>{key}</td>
							<td>{displayTime}</td>
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

	ReactDOM.render((
	  <Router>
	    <Route path="/" component={MainButtonsComponent}></Route>
	    <Route path="/level1" component={TableComponent}></Route>
	  </Router>
	), document.getElementById('main'))
})