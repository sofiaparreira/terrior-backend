"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WineController_1 = require("../controllers/WineController");
const handleValidation_1 = require("../middleware/handleValidation");
const wineValidation_1 = require("../middleware/wineValidation");
const router = (0, express_1.Router)();
exports.default = router
    .get('/test', (req, res) => {
    res.status(200).send('API working');
})
    .post("/wine", (0, wineValidation_1.wineCreateValidation)(), handleValidation_1.validate, WineController_1.createWine)
    .get("/wine/:id", WineController_1.findWineById)
    .get("/wine", WineController_1.getAllWines)
    .delete("/wine/:id", WineController_1.deleteWine)
    .patch("/wine/:id", (0, wineValidation_1.wineCreateValidation)(), handleValidation_1.validate, WineController_1.updateWine);
