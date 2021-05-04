import express from 'express';
import http from 'http';
import cors from 'cors';

import config from './config/index.js';
import routes from './routes/index.js';

const app = express();
app.server = http.createServer(app);

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Rotas da API
app.use('/types-weaknesses', routes);

//Iniciando a aplicação
app.server.listen(process.env.PORT || config.port);
console.log(`A aplicação está sendo executada na porta ${app.server.address().port}`);

export default app;