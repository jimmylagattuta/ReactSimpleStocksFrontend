import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchStock } from '../actions';
import './search_bar.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		
		this.state = { term: "",
					   search_boolean: false,
					   searched_stock: []};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}
	componentWillMount() {
		const { searchStock } = this.props;
		// this.props.fetchStocks();
		// this.props.searchStock();
		console.log('this.props below');
		console.log(this.props);
	}
	onInputChange(event) {
		console.log(event.target.value);
		this.setState({ term: event.target.value });
	}
	onFormSubmit(event) {
		event.preventDefault();
		this.props.searchStock(this.state.term);
		// this.setState({ searched_stock:  }); 
		this.setState({ term: '' });

	}

	render() {
		const { fetchStocks } = this.props;
		if(this.state.search_boolean === false) {
			return (
				<div className="searchbar_middle_top">
					<div className="searchbar_middle_top_content">
						<form onSubmit={this.onFormSubmit} className="input-group">
							<input 
								placeholder="Enter Stock Symbol"
								className="form-control"
								value={this.state.term}
								onChange={this.onInputChange}
							/>
							<span className="input-group-btn">
								<button type="submit" className="btn btn-secondary">Submit</button>
							</span>
						</form>
					</div>
				</div>
			);	
		} else if(this.state.search_boolean === true) {
			return (
				<div className="searchbar_middle_top">
					<div className="searchbar_middle_top_content">
						<form onSubmit={this.onFormSubmit} className="input-group">
							<input 
								placeholder="Enter Stock Symbol"
								className="form-control"
								value={this.state.term}
								onChange={this.onInputChange}
							/>
							<span className="input-group-btn">
								<button type="submit" className="btn btn-secondary">Submit</button>
							</span>
						</form>
						<h2>Search Boolean true!y</h2>
					</div>
				</div>
			);	
		}
	}
}

const mapStateToProps = (state) => {
	const { searchStock } = state;
	return { searchStock };
}

export default connect(mapStateToProps, { searchStock })(SearchBar);