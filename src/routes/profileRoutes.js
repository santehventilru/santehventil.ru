const Router = require('express');
const router = new Router();
const profileController = require('../controllers/profileController');
const isAuthenticated = require('../middlewares/authmiddleware');
const isAdmin = require('..//middlewares/adminmiddleware')

    


// router.get('/user', isAdmin, isAuthenticated,  profileController.getAllProfiles);
// router.get('/user/my', isAuthenticated, profileController.getProfileByIRender);

// router.get('/user/:name:last_name', isAuthenticated, isAdmin, profileController.getProfileByName);



// //
// //router.put(`user/update/profile`, isAuthenticated, profileController.putProfileInfo)
// router.post('/user/password_old', isAuthenticated, profileController.сonfrimOldPas)


//-----------
router.get('/api/auth/chek/user', isAuthenticated , (req, res) => {
    res.status(200).json({ status: "ok", role: "user" })
})
router.get('/api/auth/chek/admin', isAuthenticated ,isAdmin,  (req, res) => {
    res.status(200).json({ status: "ok", role: "admin" })
})

router.post('/api/login', profileController.login);
router.post('/api/logout', isAuthenticated, profileController.logout);
router.post('/api/reg', profileController.register);
router.get('/api/user', isAuthenticated, profileController.getProfileById);
router.put('/api/user/:login', isAuthenticated, profileController.updateProfile);
router.post('/api/change_password', isAuthenticated, profileController.changePassword)
router.delete('/api/user/:login', isAuthenticated, profileController.deleteProfile);
router.get('/api/alluser', isAuthenticated, isAdmin,  profileController.allUser)
router.delete('/api/user/:id', isAuthenticated, isAdmin, profileController.deleteUserById);
router.put('/api/user/password/:id', isAuthenticated, profileController.changeUserPasswordById);


module.exports = router;