module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
    console.log(req.session.returnTo);
    req.flash('error' , 'You must be signed in');
    return res.redirect('/login');
}

    next();
}
