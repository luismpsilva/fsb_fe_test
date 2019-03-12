import { CounterView } from './View.js';
import Broker from '../Broker.js';

class Counter {
    constructor(selector) {

        this.map = new Map();
        this.counterView = new CounterView({
            model: new Backbone.Model({ counter: 0 })
        });

        $(selector).html(this.counterView.render().el);

        Broker.getRadio().on('selection:clicked', id => this.updateCounter(id));
        Broker.getRadio().on('ws:state-change', data => this.WSUpdateModel(data));

    };
    updateCounter(id) {
        this.map.has(id)
            ? this.map.delete(id)
            : this.map.set(id);
        this.counterView.updateModel(this.map.size)
    };
    WSUpdateModel(data) {
        data.selections.forEach(selection => {
            const { id, active } = selection;
            if (this.map.has(id) && !active) {
                this.map.delete(id);
            };
        });
        this.counterView.updateModel(this.map.size);
    };

};

export default Counter;