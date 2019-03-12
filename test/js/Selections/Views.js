import _ from 'underscore';
import { CollectionView } from 'backbone.marionette';
import { View } from 'backbone.marionette';

const SelectionView = View.extend({
    className: 'selection-children',
    template: _.template(
        `
        <b><%=name%></b>
        <div class="selection-price">
            <div class="price"><%=price%></div>
        </div>
    `),
    ui: {
        btn: '.price'
    },
    events: {
        "click @ui.btn": "priceClicked",
    },
    modelEvents: {
        'change': 'render'
    },
    onRender() {

        const { selected, active } = this.model.attributes;

        if (!active) {
            this.model.set('selected', false, { silent: true });
            this.ui.btn.removeClass('selected');
            return this.ui.btn.addClass('disabled');
        }

        this.toggleStyle(selected, this.ui.btn, 'selected');

    },
    priceClicked() {

        const { id, selected, active } = this.model.attributes;

        if (!active)
            return;

        this.model.set('selected', !selected);
        this.trigger('selection:clicked', id);
        
    },
    toggleStyle(condition, el, cls) {
        condition
            ? el.addClass(cls)
            : el.removeClass(cls);
    }
});

const SelectionsView = CollectionView.extend({
    template: _.template(
        `
    <div class="selection-parent"></div>
    `),
    childViewContainer: '.selection-parent',
    childViewEventPrefix: 'children:update',
    childView: SelectionView
});

export { SelectionsView, SelectionView };