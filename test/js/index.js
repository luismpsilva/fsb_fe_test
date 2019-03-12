import Broker from './Broker.js';
import Counter from './Counter/Counter.js';
import Selections from './Selections/Selections.js';
import io from 'socket.io-client';

class Index {
	constructor() {
		this.getData()
			.then(data => this.start(data))
			.catch(err => console.log(err));
	};
	start(data) {
		this.startSelections(data);
		this.ws_start();
	};
	getData() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/rest/selections',
				method: "GET",
			})
				.done(res => resolve(res.response))
				.fail(res => reject(res.responseJSON.error));
		});
	};
	startSelections(data) {
		new Selections('#selections', data);
		new Counter('#counter');
	};
	ws_start() {
		io().on('selections', data => Broker.trigger(`ws:${data.type}`, data));
	};
};

document.addEventListener("DOMContentLoaded", event => {
	new Index();
});