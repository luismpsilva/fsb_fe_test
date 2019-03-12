import _ from 'underscore';
import { View } from 'backbone.marionette';


const CounterView = View.extend({
    className: 'counter-wrapper',
    template: _.template(
        `
            <div class="counter-label">
                Counter:
            </div>
            <div class="counter-number">
                <span><%=counter%></span>
            </div>
        `),
    modelEvents: {
        'change': 'render',
    },
    updateModel(counter){
        this.model.set('counter', counter);
    },
});

export { CounterView };