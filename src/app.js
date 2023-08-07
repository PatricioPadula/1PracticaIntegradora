import express from "express";
import {engine} from "express-handlebars"
import { __dirname } from "./utils.js";
import path from "path";
import {Server} from "socket.io";
import { viewsRouter } from "./routes/views.routes.js";

const port = process.env.PORT || 8080;
const app = express();

//configuración de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));


const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

//routes
app.use(viewsRouter);

//creación del servidor de websocket
const io = new Server(httpServer);


let messages = [];
//canal de comunicación
io.on("connection", (socket)=>{
    console.log("nuevo cliente conectado");

    socket.on("authenticated", (msg)=>{
        socket.emit("messageHistory", messages);
        socket.broadcast.emit("newUser", msg);
    });

    socket.on("message", (data)=>{
        messages.push(data);

        io.emit("messageHistory", messages);
    })
});



