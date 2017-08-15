var React = require("react");

var Search = React.createClass({

	getInitialState: function() {
		return { 
			term: "",
			startYear: "",
			endYear: ""
			}
	},

	handleChange: function(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
	},

	handleSubmit: function(event) {
		event.preventDefault();

		this.props.setTerm(this.state.term, this.state.startYear, this.state.endYear);
    	this.setState({ term: "" });
    	this.setState({ startYear: "" });
    	this.setState({ endYear: "" });
	},

	render:function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title"><i className= "fa fa-newspaper-o"></i>Query</h3>
				</div>
				<div className="panel-body">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<h4 className="">
								<strong>Topic</strong>
							</h4>
							<input
								value={this.state.term}
	                			type="text"
	                			className="form-control"
	                			id="term"
	                			onChange={this.handleChange}
	                			required>
	                		</input>
	                		<h4 className="">
								<strong>Start Year</strong>
							</h4>
							<input
								value={this.state.startYear}
	                			type="number"
	                			className="form-control"
	                			id="term"
	                			onChange={this.handleChange}
	                			required>
	                		</input>
	                		<h4 className="">
								<strong>End Year</strong>
							</h4>
							<input
								value={this.state.endYear}
	                			type="number"
	                			className="form-control"
	                			id="term"
	                			onChange={this.handleChange}
	                			required>
	                		</input>
	                		<br />
              				<button
                			className="btn btn-primary"
                			type="submit"
              				>
                			Submit
              				</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
});

module.exports = Search;