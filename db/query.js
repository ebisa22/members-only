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

const getMessagesForVisitors = async () => {
  const SQL = `
        SELECT message_id, title, text
        FROM messages
        ORDER BY timestamp DESC;
    `;

  try {
    const { rows } = await pool.query(SQL);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getMessagesForRegisteredUsers = async () => {
  const SQL = `
        SELECT
            messages.message_id,
            messages.title,
            messages.text,
            messages.timestamp,
            users.first_name,
            users.last_name,
            users.username
        FROM messages
        JOIN users
        ON messages.user_id = users.user_id
        ORDER BY messages.timestamp DESC;
    `;

  try {
    const { rows } = await pool.query(SQL);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const upgradeToMember=async (user_id)=>{
    const SQL=`
     UPDATE users
     SET is_member=true
     WHERE user_id=$1;
    `;
   try {
      await pool.query(SQL,[user_id]);
   } catch (err) {
     console.error(err);
     throw err;
   }
}

const upgradeToAdmin=async (user_id)=>{
    const SQL=`
     UPDATE users
     SET is_member=true,
         is_admin=true
     WHERE user_id=$1;
    `;
   try {
      await pool.query(SQL,[user_id]);
   } catch (err) {
     console.error(err);
     throw err;
   }
}

const createMessage=async (message)=>{
   const SQL = `
    INSERT INTO messages (title,text,user_id) VALUES 
    ($1,$2,$3)
    `;
   try {
     await pool.query(SQL, [
       message.title,
       message.text,
       message.user_id
     ]);
   } catch (err) {
     console.error(err);
     throw err;
   }
}

const deleteMessage=async (message_id)=>{
  const SQL = `
  DELETE FROM messages 
  WHERE message_id=$1;
  `;
  try{
    await pool.query(SQL,[message_id]);
  }catch(err){
    console.error(err);
    throw err;
  }
}

const resetPassword=async(user_id,new_password)=>{
  const SQL = `
     UPDATE users
     SET password=$1
     WHERE user_id=$2;
    `;
  try{
    await pool.query(SQL,[new_password,user_id]);
  }catch(err){
    console.error(err);
    throw err;
  }
}
export default {
    getUserByUsername,
    getUserById,
    createUser,
    getMessagesForVisitors,
    getMessagesForRegisteredUsers,
    upgradeToMember,
    upgradeToAdmin,
    createMessage,
    deleteMessage,
    resetPassword
}