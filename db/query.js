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
const createUser=async (user)=>{
    const SQL = `
    INSERT INTO users (first_name,last_name,username,password,security_question,security_answer) VALUES 
    ($1,$2,$3,$4,$5,$6)
    `;
    try{
        await pool.query(SQL,[user.first_name,user.last_name,user.username,user.password,user.security_question,user.security_answer]);
    }catch(err){
        console.error(err);
        throw err;
    }
}


export default {
    getUserByUsername,
    getUserById,
    createUser
}