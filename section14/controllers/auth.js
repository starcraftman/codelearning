exports.getLogin = (req, res, next) => {
  let isLoggedIn = false;
  if (req.get("Cookie")) {
    isLoggedIn = req
      .get('Cookie')
      .split(';')[0]
      .trim()
      .split('=')[1] === 'true';
  }
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true')
  res.redirect('/')
};