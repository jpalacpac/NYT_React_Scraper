var React = require("react");

// Here we include all of the sub-components
var Saved = require("./children/Saved");
var Search = require("./children/Search");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return {
    	searchTerm:"", 
    	startYear:"", 
    	endYear:""
    	results:[],
    	history: [],
    	};
  },


	// This function allows childrens to update the parent.
	setTerm: function(term){
		this.setState({
			searchTerm: term
		})
	},

	setStartYear: function(startYear){
		this.setState({
			startYear: startYear
		});
	},

	setEndYear: function(endYear){
		this.setState({
			endYear: endYear
		});
	},



	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(prevProps, prevState){

		
			helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear)
				.then(function(data){
					if (data != this.state.results)
					{

						this.setState({
							results: data
						})
					}
				}.bind(this))
				
			
	},

	// The moment the page renders get the History
	componentDidMount: function(){

		// Get the latest history.
		helpers.getHistory()
			.then(function(response){
				if (response != this.state.history){
					// console.log ("History", response.data);

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},

	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Scrubber</h2>
						<p className="text-center"><em>Search news articles and save some for later!</em></p>
					</div>

					<div className="col-md-6">
					
						<Search setTerm={this.setTerm} setStartYear={this.setStartYear} setEndYear={this.setEndYear}/>

					</div>

					<div className="col-md-6">
				
						<Results results={this.state.results} />

					</div>

				</div>

				<div className="row">

					<Saved history={this.state.history}/> 

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;
