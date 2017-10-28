import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './newscolumn.css'
import { getNews } from '../actions';
import axios from 'axios';

class NewsColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {  news: [],
						sample_symbol: 'AAPL',
						typed_symbol: '',
						term: '' }
		// this.apiCall = this.apiCall.bind(this);
	}
	componentWillMount() {
		// console.log('componentWillMount news');
			const all_news = "";
			const new_news = [];
		if(this.state.typed_symbol.length !== 0) {
			const typed_symbol = this.state.term;
			var https = require("https");
			var username = "21856d45863b11db5677abfaa5e51d8d";
			var password = "38e3ff3446b9e4e6138148c03d639de4";
			var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
			var request = https.request({
	    		method: "GET",
	    		host: "api.intrinio.com",
	    		// CONTINUE WITH THIS DYNAMIC!!!
	    		path: "/news/?ticker=" + this.state.typed_symbol,
	    		headers: {
	        		"Authorization": auth
	    		}
			}, function(response) {
	    		var json = "";
	    		response.on('data', function (chunk) {
	        		json += chunk;
	    		});
	    		response.on('end', function() {
	        		// console.log('company news', company.data);
	        		new_news.push(JSON.parse(json));
	        		console.log('new_news', new_news[0]['data']);
	        		this.setState({ news: new_news[0]['data'] });
	        		// final_parsed_news.push(new_news[0]['data']);
	        		// new_news.forEach((item) => {
	        		// 	parsed_news.push(item);
	        		// 	console.log('parsed_news below news');
	        		// 	console.log(parsed_news[0]);
	        		// 	final_parsed_news.push(parsed_news[0]['data']);
	        		// 	console.log('this.final_parsed_news');
	        		// 	console.log(final_parsed_news);
	        		// 	let count = 0
	        		// 	final_parsed_news.forEach((item) => {
	        		// 		item.forEach((x) => {
	        		// 			if(count < 10) {
	        		// 			// console.log('final_parsed_news item here', x);
	        		// 			frustration_does_not_exist.push(x);
	        		// 			console.log('frustration_does_not_exist', frustration_does_not_exist);
	        		// 			count += 1;
	        		// 			};
	        		// 		});
	        		// 	});
	        		// });
	        		// console.log('json below');
	        		// console.log(json);
	    		}.bind(this));
			}.bind(this));
			request.end();
		} else {
			//ACTIVATE BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// this.props.getNews().then((response) => {
				// console.log('response', response);
			// });
			console.log('this.state.sample_symbol', this.state.sample_symbol);
			var https = require("https");
			var username = "21856d45863b11db5677abfaa5e51d8d";
			var password = "38e3ff3446b9e4e6138148c03d639de4";
			var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
			var request = https.request({
	    		method: "GET",
	    		host: "api.intrinio.com",
	    		// CONTINUE WITH THIS DYNAMIC!!!
	    		path: "/news/?ticker=" + this.state.sample_symbol,
	    		headers: {
	        		"Authorization": auth
	    		}
			}, function(response) {
	    		var json = "";
	    		response.on('data', function (chunk) {
	        		json += chunk;
	    		});
	    		response.on('end', function() {
	        		// console.log('company news', company.data);
	        		new_news.push(JSON.parse(json));
	        		console.log('new_news', new_news[0]['data']);
	        		this.setState({ news: new_news[0]['data'] });
	        		// final_parsed_news.push(new_news[0]['data']);
	        		// new_news.forEach((item) => {
	        		// 	parsed_news.push(item);
	        		// 	console.log('parsed_news below news');
	        		// 	console.log(parsed_news[0]);
	        		// 	final_parsed_news.push(parsed_news[0]['data']);
	        		// 	console.log('this.final_parsed_news');
	        		// 	console.log(final_parsed_news);
	        		// 	let count = 0
	        		// 	final_parsed_news.forEach((item) => {
	        		// 		item.forEach((x) => {
	        		// 			if(count < 10) {
	        		// 			// console.log('final_parsed_news item here', x);
	        		// 			frustration_does_not_exist.push(x);
	        		// 			console.log('frustration_does_not_exist', frustration_does_not_exist);
	        		// 			count += 1;
	        		// 			};
	        		// 		});
	        		// 	});
	        		// });
	        		// console.log('json below');
	        		// console.log(json);
	    		}.bind(this));
			}.bind(this));
			request.end();
			
		}
		const { getNews } = this.props;
			
	}

	apiCall() {

	}

	onInputChange(event) {
		// console.log(event.target.value);
		this.setState({ term: event.target.value });
	}

	onSubmit(event) {
		this.setState({ typed_symbol: event.target.value });
	}


	render() {
		console.log('this');
		if(this.state.typed_symbol.length !== 0) {
			return (
				<div className="newscolumn_center_bottom">
					<div className="newscolumn_center_bottom_content_importent">
						<h1>Showing news for {this.state.typed_symbol}</h1>
							<form onSubmit={this.onSubmit.bind(this)}>
								<input
									placeholder="Search News By Symbol"
									value={this.state.term}
									onChange={this.onInputChange.bind(this)}
									/>
								<div id="form_to_delete_button">
									<button className="btn btn-success" type="submit">Get News</button>
								</div>
							</form>
	 					<h2>{renderNews(this.state.news)}</h2>
					</div>
				</div>
			);
		} else {
			return (
				<div className="newscolumn_center_bottom">
					<div className="newscolumn_center_bottom_content_importent">
						<h1>Showing news for {this.state.sample_symbol}</h1>
							<form id="searcher" onSubmit={this.onSubmit.bind(this)}>
								<input
									placeholder="Search News By Symbol"
									value={this.state.term}
									onChange={this.onInputChange.bind(this)}
									/>
								<div id="form_to_delete_button">
									<div id="get_news">
										<button className="btn btn-success" type="submit">Get News</button>
									</div>
								</div>
							</form>
	 					<h2>{renderNews(this.state.news)}</h2>
					</div>
				</div>
			);
		}
	}
}

function renderNews(array) {
	console.log('array renderNews here data');
	console.log(array);
	let date_count = 0;
	let date_array = [];
	let new_date_boolean = false;
	return _.map(array, item => {
		const date = item.publication_date.slice(0, 10);
		// console.log('date', date);
		const cut_date = item.publication_date.slice(0, 8);
		// console.log('cut_date', cut_date);
		const temp_date = item.publication_date.slice(8, 10);
		// console.log('temp_date', temp_date);
		const temp_date_two = temp_date - 1;
		// console.log('temp_date_two', temp_date_two);
		const accurate_date = cut_date.toString() + temp_date_two;
		// console.log('accurate_date', accurate_date);
		// console.log('forEach item here', item)
		if(date_array.includes(accurate_date)) {
			console.log('1');
			new_date_boolean = false;
		} else if(date_array.includes(accurate_date) === false) {
			console.log('3');
			new_date_boolean = true;
			// date_array.push(accurate_date);
			date_array.push(accurate_date);
			date_count = 0;
		} 
		// else if(date_array.includes(accurate_date) && date_count ) {
		// 	console.log('2');
		// 	new_date_boolean = false;
		// }


		if(new_date_boolean === true && date_count === 0) {
			console.log('4');
			console.log('date_count old ', date_count);
			date_count += 1;
			console.log('date_count new ', date_count);
			console.log('date_array old ', date_array);
			console.log('date_array new ', date_array);
			return (
					<div key={item.id}>
						<div id="news">
							<p id="publication_date">Published: {accurate_date}
								<form id="link" target="_blank" action={item.url}>
			    					<input type="submit" value="News Story Link" />
								</form>
							</p>
							<p id="newsrendertitle">{item.title}</p>
							<p>{item.summary}</p>
						</div>
					</div>
				);	
		} else if(new_date_boolean === false && date_count < 10) {
			console.log('5');
			console.log('date_count old ', date_count);
			date_count += 1;
			console.log('date_count new ', date_count);
			return (
					<div key={item.id}>
						<div id="news">
							<p id="publication_date">Published: {accurate_date}
								<form id="link" target="_blank" action={item.url}>
			    					<input type="submit" value="News Story Link" />
								</form>
							</p>
							<p id="newsrendertitle">{item.title}</p>
							<p>{item.summary}</p>
						</div>
					</div>
				);	
		}








		// if(date_array.includes(accurate_date) && date_count === 10) {
		// 	console.log('5');
		// 	date_count = 0;
		// 	console.log('date_array, ', date_array);
		// 	return (
		// 			<div key={item.id}>
		// 				<div id="news">
		// 					<p id="publication_date">Published: {accurate_date}
		// 						<form id="link" target="_blank" action={item.url}>
		// 	    					<input type="submit" value="News Story Link" />
		// 						</form>
		// 					</p>
		// 					<p id="newsrendertitle">{item.title}</p>
		// 					<p>{item.summary}</p>
		// 				</div>
		// 			</div>
		// 		);
		// } else if(date_array.includes(accurate_date) === false && new_date_boolean === false) {
		// 		// new_date_boolean = false;
		// 		console.log('1');
		// 		console.log('date_count before', date_count);
		// 		date_count += 1;
		// 		console.log('date_count after', date_count);
		// 		if(date_count !== 10) {
		// 			console.log('2');
		// 			return (
		// 				<div key={item.id}>
		// 					<div id="news">
		// 						<p id="publication_date">Published: {accurate_date}
		// 							<form id="link" target="_blank" action={item.url}>
		// 	    						<input type="submit" value="News Story Link" />
		// 							</form>
		// 						</p>
		// 						<p id="newsrendertitle">{item.title}</p>
		// 						<p>{item.summary}</p>
		// 					</div>
		// 				</div>
		// 			);
		// 		} else {
		// 			console.log('3');


		// 		}
		// 	}if (date_count !== 10 && new_date_boolean === true && date_count !== 0) {
		// 		console.log('new_date_boolean', new_date_boolean);
		// 		console.log('6');			
		// 	} else {
		// 		// new_date_boolean = true;
		// 		console.log('4');
		// 		console.log('date_count before', date_count);
		// 		date_count += 1;
		// 		date_array.push(accurate_date);
		// 		console.log('date_count after', date_count);
		// 		return (
		// 			<div key={item.id}>
		// 				<div id="news">
		// 					<p id="publication_date">Published: {accurate_date}
		// 						<form id="link" target="_blank" action={item.url}>
		//     						<input type="submit" value="News Story Link" />
		// 						</form>
		// 					</p>
		// 					<p id="newsrendertitle">{item.title}</p>
		// 					<p>{item.summary}</p>
		// 				</div>
		// 			</div>
		// 		);			
		// 	} 
			
		// }

	});
}

const mapStateToProps = (state) => {
	const { getNews } = state;
	return { getNews };
}

export default connect(mapStateToProps, { getNews })(NewsColumn);