import Radio from 'backbone.radio';

class Broker {
    constructor() { 
        this.radio = Radio.channel('fsb_test');
    };
    trigger(channel, cb) {
        this.radio.trigger(channel, cb);
    };
    getRadio(){
        return this.radio;
    };
};

const singleton = new Broker();
export default singleton;
