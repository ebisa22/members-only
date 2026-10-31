import db from "../db/query.js";

const handleMembership = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const correctPasscode = process.env.MEMBER_PASSWORD === req.body.passcode;

  if (!correctPasscode) {
    return res.redirect("/messages");
  }

  try {
    await db.upgradeToMember(req.user.user_id);
    res.redirect("/messages");
  } catch (err) {
    next(err);
  }
};

export default handleMembership;
