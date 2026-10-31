const getLoginPage = async (req, res) => {
res.render("login", {
  errorMessage: null,
  errors: {},
  formData: {},
});
};

export default getLoginPage;
