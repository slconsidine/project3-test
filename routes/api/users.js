const router = require("express").Router();
const userController = require("../../controllers/usersControllers");

router.route("/users")
  .post(userController.createUse);

module.exports = router;