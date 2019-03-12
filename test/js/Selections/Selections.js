import { SelectionsView } from './Views';
import Broker from '../Broker.js';

class Selections {
    constructor(selector, data) {

        const { eventName, selections } = data;

        selections.forEach(selection => {
            selection.selected = false;
        });

        this.selections_view = new SelectionsView({
            collection: new Backbone.Collection(selections),
            eventName: eventName
        });

        $(selector).html(this.selections_view.render().el);

        this.selections_view.on('children:update:selection:clicked', id => Broker.trigger('selection:clicked', id));
        Broker.getRadio().on('ws:state-change', data => this.wsUpdateSelectionState(data));
        Broker.getRadio().on('ws:price-change', data => this.wsUpdatePriceChange(data));

    };
    wsUpdatePriceChange(data) {
        data.selections.forEach(selection => {

            const { id, price } = selection;
            const model = this.selections_view.collection.findWhere({ id: id });

            if (!model)
                return;

            const model_price = model.attributes.price;

            if (price === model_price)
                return;

            model.set('price', price);
        });

    };
    wsUpdateSelectionState(data) {
        data.selections.forEach(selection => {

            const { id, active } = selection;
            const model = this.selections_view.collection.findWhere({ id: id });

            if (!model)
                return;

            const model_active = model.attributes.active;

            if (active === model_active)
                return;

            model.set('active', active);
        });
    }
}

export default Selections;