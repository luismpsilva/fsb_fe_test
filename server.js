
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use('/', express.static('dist', { maxAge: 3600000 }));

io.on('connection', socket => {
    startPriceChange(socket);
    startSelectionInactivity(socket);
});

const randomPrice = () => Math.floor(Math.random() * 9) + 1;
const ramdonBoolean = () => Math.random() >= 0.5;

const startPriceChange = socket => {
    setInterval(() => {
        let data = {
            timestamp: new Date().getTime(),
            type: 'price-change',
            selections: [
                {
                    id: 1,
                    price: randomPrice(),
                },
                {
                    id: 2,
                    price: randomPrice(),
                },
                {
                    id: 3,
                    price: randomPrice(),
                },
                {
                    id: 4,
                    price: randomPrice(),
                },
                {
                    id: 5,
                    price: randomPrice(),
                },
            ],
        }
        socket.emit('selections', data);
    }, 1000);
};

const startSelectionInactivity = socket => {
    setInterval(() => {
        let data = {
            timestamp: new Date().getTime(),
            type: 'state-change',
            selections: [
                {
                    id: 1,
                    active: ramdonBoolean()
                },
                {
                    id: 2,
                    active: ramdonBoolean()
                },
                {
                    id: 3,
                    active: ramdonBoolean()
                },
                {
                    id: 4,
                    active: ramdonBoolean()
                },
                {
                    id: 5,
                    active: ramdonBoolean()
                }
            ],
        }
        socket.emit('selections', data);
    }, 5000);
};

app.route('/rest/selections')
    .get((req, res) => {
        // return res.status(401).json({error:'auth failed'});
        res.status(200).json(
            {
                status: 'ok',
                timestamp: new Date().getTime(),
                response: {
                    eventName: 'those horses',
                    selections: [
                        {
                            id: 1,
                            name: 'Horse 1',
                            price: randomPrice(),
                            active: ramdonBoolean()
                        },
                        {
                            id: 2,
                            name: 'Horse 2',
                            price: randomPrice(),
                            active: ramdonBoolean()
                        },
                        {
                            id: 3,
                            name: 'Horse 3',
                            price: randomPrice(),
                            active: ramdonBoolean()
                        },
                        {
                            id: 4,
                            name: 'Horse 4',
                            price: randomPrice(),
                            active: ramdonBoolean()
                        },
                        {
                            id: 5,
                            name: 'Horse 5',
                            price: randomPrice(),
                            active: ramdonBoolean()
                        },
                    ]
                }
            })
    });


http.listen(port, () => {
    console.log(`FSB TEST IS NOW RUNNING ON \n http://localhost:${port}`);
});


