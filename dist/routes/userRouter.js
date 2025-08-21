"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_1 = require("../middleware/userValidation");
const handleValidation_1 = require("../middleware/handleValidation");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
exports.default = router
    .post('/register', (0, userValidation_1.userRegisterValidation)(), handleValidation_1.validate, UserController_1.registerUser)
    .post('/login', UserController_1.loginUser);
