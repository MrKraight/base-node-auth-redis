import knex from 'knex';
import knexConnectionData from '../knexfile.js';
let knexConnection = null;

async function databaseConnect(){
  knexConnection = knex(knexConnectionData); 
  try {
    await knexConnection.raw('SELECT 1'); // This will check the connection.
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

function knexQuery(query){
  return knexConnection(query);
}

export {databaseConnect, knexQuery};