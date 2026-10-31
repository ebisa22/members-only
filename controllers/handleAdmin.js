import db from "../db/query.js";

const handleAdmin = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const correctPasscode = process.env.ADMIN_PASSWORD === req.body.passcode;

  if (!correctPasscode) {
    return res.redirect("/messages");
  }

  try {
    await db.upgradeToAdmin(req.user.user_id);
    res.redirect("/messages");
  } catch (err) {
    next(err);
  }
};

export default handleAdmin;
