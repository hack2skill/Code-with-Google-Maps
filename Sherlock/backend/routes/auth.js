const router = require("express").Router();
const passport = require("passport");

router.get("/google/login/success", (req, res) => {
	if (req.user) {
        console.log(req.user);
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/google/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/google/callback",
	passport.authenticate("google", {
		successRedirect: "login/success",
		failureRedirect: "login/failed",
	})
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500).json({ error: true, message: "Logout failed" });
        } else {
            req.session.destroy((sessionErr) => {
                if (sessionErr) {
                    res.status(500).json({ error: true, message: "Session destruction failed" });
                } else {
                    res.status(200).json({ message: "Logout successful" });
                }
            });
        }
    });
});


module.exports = router;