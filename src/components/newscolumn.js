import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './newscolumn.css'
import { getNews, getSymbols } from '../actions';
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
			const collected_news = [];
	        		// DAILY CALL LIMIT REACHED, ACTIVATE BELOW




		// if(this.state.typed_symbol.length !== 0) {
		// 	// console.log('typed_symbol is ZERO MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
		// 	const typed_symbol = this.state.term;
	// 		var https = require("https");
	// 		var username = "21856d45863b11db5677abfaa5e51d8d";
	// 		var password = "38e3ff3446b9e4e6138148c03d639de4";
	// 		var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
	// 		var request = https.request({
	//     		method: "GET",
	//     		host: "api.intrinio.com",
	//     		path: "/news/?ticker=" + this.state.typed_symbol,
	//     		headers: {
	//         		"Authorization": auth
	//     		}
	// 		}, function(response) {
	//     		var json = "";
	//     		response.on('data', function (chunk) {
	//         		json += chunk;
	//     		});
	//     		response.on('end', function() {
	//         		new_news.push(JSON.parse(json));
	//         		this.setState({ news: new_news[0]['data'] });
	//     		}.bind(this));
	// 		}.bind(this));
	// 		request.end();
	// 	} else {
	// 		const symbols = this.props.getSymbols().then((response) => {
	// 			// console.log('1');
	// 			// console.log('symbols @___@', response.payload.data);
	// 			response.payload.data.forEach((item) => {
	// 				// console.log('2');
	// 				var https = require("https");
	// 				var username = "21856d45863b11db5677abfaa5e51d8d";
	// 				var password = "38e3ff3446b9e4e6138148c03d639de4";
	// 				var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
	// 				var request = https.request({
	// 	    			method: "GET",
	// 	    			host: "api.intrinio.com",
	// 	    			path: "/news/?ticker=" + item,
	// 	    			headers: {
	// 	        			"Authorization": auth
	// 	    			}
	// 				}, function(response) {
	// 					// console.log('3');
	// 	    			var json = "";
	// 	    			response.on('data', function (chunk) {
	// 	        			json += chunk;
	// 	        			// console.log('json, ', json);
	// 	    			}.bind(this));
	// 		    		response.on('end', function() {
	// 		        		new_news.push(JSON.parse(json));
	// 		        		// console.log('new_news ', new_news);
	// 		        		new_news.forEach((item) => {
	// 		        			// console.log('item @.@', item['data']);
	// 			        			if(item) {
	// 			        				collected_news.push(item.data);
	// 			        				console.log('collected_news length', collected_news.length);
	// 			        				console.log('collected_news ', collected_news);
	// 			        			} else {
	// 			        				console.log('no data TRIGGERED');
	// 			        				console.log('item? ', item);
	// 			        			};
	// 		        		});
	// 		        		this.setState({ news: new_news });
	// 		        		// console.log('new_news', new_news);
	// 						// console.log('4');
	// 		    		}.bind(this));
	// 				}.bind(this));
	// 				request.end();

	// 			});
	// 		});
	// 	}
	// 	const { getNews, getSymbols } = this.props;
	// 	// console.log('5');



	        		// DAILY CALL LIMIT REACHED, ACTIVATE ABOVE


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
		// console.log('this');
		if(this.state.typed_symbol.length !== 0) {
			return (
				<div className="newscolumn_center_bottom">
					<div className="newscolumn_center_bottom_content_importent">
						<h1>Showing news stories for Stock List</h1>

	 					<h2>{renderNews(this.state.news)}</h2>
					</div>
				</div>
			);
		} else {
			return (
				<div className="newscolumn_center_bottom">
					<div className="newscolumn_center_bottom_content_importent">
						<h1>Showing news stories from Stock List</h1>
	 					<h2>{renderNews(this.state.news)}</h2>
					</div>
				</div>
			);
		}
	}
}

function renderNews(bigger_array) {
	// console.log('array renderNews here data');
	// console.log(bigger_array);
	let date_count = 0;
	let date_array = [];
	let new_date_boolean = false;
	let slice_the_month = 0;
	if (!bigger_array.length) {
		console.log('TRIGGERED');
	} else {
		console.log('READY');
		return _.map(bigger_array, newer_array => {
			// console.log('newer_array ', newer_array);
			return _.map(newer_array, item => {
				console.log('item READY ', item);
				if(!item.length) {
					console.log('TRIGGERED SECOND LAYER');
				} else {
					console.log('READY SECOND LAYER');					
					return _.map(item, x => {
						let month = "";
						const better_date = [];
						console.log('x ', x);
						const date = x.publication_date.slice(0, 10);
						// console.log('date', date);
						const cut_date = x.publication_date.slice(0, 8);
						// console.log('cut_date', cut_date);
						const temp_date = x.publication_date.slice(8, 10);
						// console.log('temp_date', temp_date);
						const temp_date_two = temp_date - 1;
						// console.log('temp_date_two', temp_date_two);
						const accurate_date = cut_date.toString() + temp_date_two;
						console.log('accurate_date', accurate_date);
						const slice_the_day = accurate_date.slice(8, 10);
						const slice_the_day_with_comma = slice_the_day + ', ';
						const slice_the_month_unparsed = accurate_date.slice(5, 7);
						console.log('slice_the_day', slice_the_day);
						const slice_the_year = accurate_date.slice(0, 4);
						console.log('slice_the_month!!!!!!!!!!!', slice_the_month_unparsed);
						const slice_the_month = slice_the_month_unparsed;
						if(slice_the_month === '1') {
							const month = 'January ';
						} else if(slice_the_month === '2') {
							const month = 'February ';
						} else if(slice_the_month === '3') {
							const month = 'March ';
						} else if(slice_the_month === '4') {
							const month = 'April ';
						} else if(slice_the_month === '5') {
							const month = 'May ';
						} else if(slice_the_month === '6') {
							const month = 'June ';
						} else if(slice_the_month === '7') {
							const month = 'July ';
						} else if(slice_the_month === '8') {
							const month = 'August ';
						} else if(slice_the_month === '9') {
							const month = 'September' ;
						} else if(slice_the_month === '10') {
							const month = 'October ';
						} else if(slice_the_month === '11') {
							const month = 'November ';
						} else if(slice_the_month === '12') {
							const month = 'December ';
						};
						console.log('month', month);
						better_date.push(month + slice_the_day_with_comma + slice_the_year);
						console.log('better_date', better_date);

						// console.log('forEach item here', item)
						if(date_array.includes(accurate_date)) {
							// console.log('1');
							new_date_boolean = false;
						} else if(date_array.includes(accurate_date) === false) {
							// console.log('3');
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
							// console.log('date_count old ', date_count);
							date_count += 1;
							// console.log('date_count new ', date_count);
							// console.log('date_array old ', date_array);
							// console.log('date_array new ', date_array);
							return (
									<div key={x.id}>
										<div id="news">

											<p id="publication_date">Published: {better_date} Stock: {x.ticker}
												<form id="link" target="_blank" action={x.url}>
							    					<input type="submit" value="News Story Link" />
												</form>
											</p>
											<p id="newsrendertitle">{x.title}</p>
											<p>{x.summary}</p>
										</div>
									</div>
								);	
						} else if(new_date_boolean === false && date_count < 10) {
							// console.log('5');
							// console.log('date_count old ', date_count);
							date_count += 1;
							// console.log('date_count new ', date_count);
							return (
									<div key={x.id}>
										<div id="news">
											<p id="publication_date">Published: {better_date} Stock: {x.ticker}
												<form id="link" target="_blank" action={x.url}>
							    					<input type="submit" value="News Story Link" />
												</form>
											</p>
											<p id="newsrendertitle">{x.title}</p>
											<p>{x.summary}</p>
										</div>
									</div>
								);	
						}
					});
				}
			});
		});
	}
}

const mapStateToProps = (state) => {
	const { getNews, getSymbols } = state;
	return { getNews, getSymbols };
}

export default connect(mapStateToProps, { getNews, getSymbols })(NewsColumn);
			

			// componentWillMount
	

							// <form id="searcher" onSubmit={this.onSubmit.bind(this)}>
							// 	<input
							// 		placeholder="Search News By Symbol"
							// 		value={this.state.term}
							// 		onChange={this.onInputChange.bind(this)}
							// 		/>
							// 	<div id="form_to_delete_button">
							// 		<div id="get_news">
							// 			<button className="btn btn-success" type="submit">Get News</button>
							// 		</div>
							// 	</div>
							// </form>




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

	    // renderNews

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