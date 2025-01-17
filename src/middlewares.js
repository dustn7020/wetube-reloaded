import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";

  res.locals.loggedIn = Boolean(req.session.loggedIn);

  res.locals.loggedInUser = req.session.user;

  next();
};

export const protectorMiddelware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Login first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "upfile/avatar",
  limits: {
    fileSize: 300000,
  },
});

export const videoUpload = multer({
  dest: "upfile/video",
  limits: {
    fileSize: 5000000,
  },
});
