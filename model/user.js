import {knexQuery} from '../services/knexConfig.js';

async function getUserByLogin(login) {
  try{
    const user = await knexQuery('users').where('login', login).first();
    return user;
  }
  catch(err){
    console.log(err);
    return false;
  }
}

async function getUserById(id) {
  try{
    const user = await knexQuery('users').where('id', id).first();
    return user;
  }
  catch(err){
    console.log(err);
    return false;
  }
}

async function addUser(login, passwordHash) {
  try{
    const user = { login, passwordHash };
    let ids = await knexQuery('users').insert(user).returning('id');
    return ids[0];
  }
  catch(err){
    console.log(err);
    return false;
  }
}

let userQueries = {
  getUserByLogin,
  getUserById,
  addUser
}
export {userQueries}