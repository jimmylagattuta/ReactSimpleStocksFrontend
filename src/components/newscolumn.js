import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './newscolumn.css'
import { getNews } from '../actions';
import axios from 'axios';

class NewsColumn extends Component {
	constructor(props) {
		super(props);

		this.state = { news: [] }
		// this.apiCall = this.apiCall.bind(this);
	}
	componentWillMount() {
		// console.log('componentWillMount news');
		const { getNews } = this.props;
		//ACTIVATE BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// this.props.getNews().then((response) => {
			// console.log('response', response);
		// });
		const all_news = "";
		const new_news = [];
		var https = require("https");
		var username = "21856d45863b11db5677abfaa5e51d8d";
		var password = "38e3ff3446b9e4e6138148c03d639de4";
		var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
		var request = https.request({
    		method: "GET",
    		host: "api.intrinio.com",
    		// CONTINUE WITH THIS DYNAMIC!!!
    		path: "/news/?ticker=AAPL",
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

	render() {
		return (
			<div className="newscolumn_center_bottom">
				<div className="newscolumn_center_bottom_content">
					<h1>NEWS COLUMN!!! </h1>
					<h2>{renderNews(this.state.news)}</h2>
				</div>
			</div>
		);
	}
}

function renderNews(array) {
	console.log('array renderNews here data');
	console.log(array);
	return _.map(array, item => {
		console.log('forEach item here', item);
		return (
			<div key={item.id}>
				<div id="news">
					<p>{item.title}</p>
					<p>{item.summary}</p>
					<form target="_blank" action={item.url}>
    					<input type="submit" value="News Story Link" />
					</form>
				</div>
			</div>
		);
	});
}

const mapStateToProps = (state) => {
	const { getNews } = state;
	return { getNews };
}

export default connect(mapStateToProps, { getNews })(NewsColumn);