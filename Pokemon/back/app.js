import express from "express";
import router from "./routes/router.js";
import connection from "./connection/connection.js";
// import { Server, Socket } from "socket.io";
// import cors from "cors";

const app = express();
// app.use(cors());

// const http = require('http');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

await connection.sync({ force: false}).then(() => {
  app.listen(8080, () => {
    console.log(`🚀 ~ app.listen ~ listen: http://localhost:8080`)
  });
});

// const httpServer = require("http").createServer();

// const io = require("socket.io")(httpServer, {
//     cors: {
//         origin: "http://localhost:5173"
//       }
//   });



// io.on('connection', (socket) => {
//     console.log('Usuario conectado');

//     io.emit('messageOut', 'te mando un mensaje de conectado o lo que esta la bd');

//     socket.on('message', (message) => {
//         console.log('Mensaje recibido:', message);
//         // Reenviar el mensaje a todos los clientes conectados.
//         io.emit('messageOut', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('Usuario desconectado');
//     });
// });

// const port = process.env.PORT || 3000;

//  app.get('/', (req, res) =>{
//      res.send('Hola server!')
//  });



//  httpServer.listen(port, () => {
//      console.log(`Servidor escuchando en el puerto ${port}`);
//  });


