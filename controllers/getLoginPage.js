const getLoginPage = async (req, res) => {
  res.render("login", {
    errors: {},
    formData: {},
    securityQuestions,
  });
};

export default getLoginPage;
