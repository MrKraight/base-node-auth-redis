import redis from 'redis';

import dotenv from 'dotenv';
dotenv.config();

const redisHost = process.env.REDIS_HOST;
const redisPassword = process.env.REDIS_PASSWORD;

let client = null;

async function connectToRedis() {
    try{
        console.log('trying to Connect to Redis server');
        // Create a Redis client
        client = redis.createClient({password: redisPassword, socket: {host: redisHost}});

        // Check if the connection to Redis was successful
        client.on('connect', async () => {
            console.log('Connected to Redis server');
        })

        client.on('error', (err) => {
            console.error(`Redis error: ${err}`);
        });

        await client.connect();
    } catch (error) {
        console.error("connectToRedis ",error);
    } 
}

async function getUserWithJWT(id){
    try {   
        let userWithJwt = await client.get(`user:${id}`);
        return JSON.parse(userWithJwt);
    } catch (error) {
        console.error("getUserJWT ",error);
        return false;
    } 
}

async function setUserWithJWT(id, userWithJwt){
    try {   
        let json = JSON.stringify(userWithJwt);
        await client.set(`user:${id}`, json);
        return true;
    } catch (error) {
        console.error("setUserJWT ",error);
        return false;
    } 
}

export {
    connectToRedis,
    getUserWithJWT,
    setUserWithJWT
}