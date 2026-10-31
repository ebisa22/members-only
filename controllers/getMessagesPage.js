import db from "../db/query.js";

const getMessagesPage = async (req, res) => {
  const user = req.isAuthenticated() ? req.user : null;

  let role = "visitor";

  if (user) {
    if (user.is_admin) {
      role = "admin";
    } else if (user.is_member) {
      role = "member";
    } else {
      role = "registered";
    }
  }

  const messages =
    role === "visitor"
      ? await db.getMessagesForVisitors()
      : await db.getMessagesForRegisteredUsers();

  res.render("messages", {
    role,
    messages,
    currentUser: user,
    membershipError: null,
    adminError: null,
  });
};

export default getMessagesPage;
