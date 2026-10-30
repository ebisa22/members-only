import pool from "./pool.js";

const getUserByUsername=async(username)=>{
    const SQL=`
    SELECT * FROM users
    WHERE username=$1
    ` 
    try{
       const {rows}=await pool.query(SQL,[username]);
       const user=rows[0];
       return user;
    }catch(err){
        console.error(err);
        throw err;
    }
}
const getUserById=async(id)=>{
    const SQL=`
    SELECT * FROM users
    WHERE user_id=$1
    ` 
    try{
       const {rows}=await pool.query(SQL,[id]);
       const user=rows[0];
       return user;
    }catch(err){
        console.error(err);
        throw err;
    }
}


export default {
    getUserByUsername,
    getUserById
}