import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import {databaseConnect} from './services/knexConfig.js';
import {connectToRedis} from './services/redis.js'

import { passport } from './services/passport-config.js'

await databaseConnect();
await connectToRedis();

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: '*'
}));

import { initializeRoutes } from './services/expressRoutes.js';
initializeRoutes(app);

const server = http.createServer(app);

import dotenv from 'dotenv';
dotenv.config();
const appPort = process.env.APP_PORT;


server.listen(appPort, () => {
  console.log(`Example app listening on port ${appPort}`)
})
