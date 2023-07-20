import express from "express";
import {engine} from "express-handlebars"
import { __dirname } from "./utils.js";
import path from "path";
import {Server} from "socket.io";

import { productsRouter } from "./routes/product.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { log } from "console";

const port = 8080;
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
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter);

//creación del servidor de websocket
const socketServer = new Server(httpServer);

//canal de comunicación
socketServer.on("conection", (socketConnected)=>{
    socketConnected.on("messageKey", (data)=>{
        console.log(data);
    })
});