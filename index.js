const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');


const app = new Koa();

app.use(cors());
app.use(bodyParser());

const PORT = process.env.PORT || '3000';

const server = app.listen(PORT, () =>
    console.log(`Server is listening ${PORT} `),
);
const io = require('socket.io')(server)

app.use(async (ctx) => (ctx.body = { msg: `welcome`}));

io.on('connection', (socket)=>{
    console.log(`\nA scoket has been connected ${socket.id}`)
    
    io.emit('congrats', {
        msg: 'succesfully connect'
    })

    socket.on('ok', (data)=>{
        console.log('Receive:',data);
    })
})
module.exports = {app,io};