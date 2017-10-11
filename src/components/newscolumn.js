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
	}
	componentWillMount() {
		console.log('componentWillMount news');
		const { getNews } = this.props;
		const all_news = [];
		//ACTIVATE BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// this.props.getNews();
		// this.apiCall();
	}

	apiCall() {
		const new_news = [];
		const more_news = [];
		var https = require("https");

		var username = "21856d45863b11db5677abfaa5e51d8d";
		var password = "38e3ff3446b9e4e6138148c03d639de4";
		var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

		var request = https.request({
    		method: "GET",
    		host: "api.intrinio.com",
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
        		var company = JSON.parse(json);
        		console.log('company news', company);
        		new_news.push(company['data']);
        		new_news.forEach((item) => {
        			more_news.push(item);
        			console.log('more_news below news');
        			console.log(more_news);
        		})
        		// console.log('json below');
        		// console.log(json);
    		});

		});
		request.end();
		console.log('more_news below @_@ news');
		console.log(more_news);
		// new_news.forEach((item) => {
		// 	console.log('item below');
		// 	console.log(item);
		// });


	}

	render() {
		return (
			<div className="newscolumn_center_bottom">
				<div className="newscolumn_center_bottom_content">
					<h1>NEWS COLUMN!!! </h1>
					<h2>{}</h2>
				</div>
			</div>
		);
	}
}

const renderNews = (array) => {
	return _.map(array, item => {
		return (
			<div key={item.id}>
				<div className="newscolumn_center_bottom">
					<div className="newscolumn_center_bottom_content">
						<div id="news">
							<p>{item.title}</p>
							<p>{item.summary}</p>
							<p>{item.url}</p>
						</div>
					</div>
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