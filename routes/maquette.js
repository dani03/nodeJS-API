import express from "express";
import MaquetteController from "../controllers/MaquetteController.js";
import middleware from "../middlewares/middleware.js";

const router = express.Router();

router.get('/user/maquettes', [middleware.is_authenticate], MaquetteController.listMaquettes);
router.post('/maquette/create', [middleware.is_authenticate, middleware.UserCanCreateMaquette, middleware.isBlocked], MaquetteController.storeMaquette);

router.post('/approval/maquette/:maquetteId', [middleware.is_authenticate, middleware.isManager], MaquetteController.approvalMaquette);
router.get('/maquette/:maquetteId', middleware.is_authenticate, MaquetteController.showMaquette);

router.get('/maquettes', [middleware.is_authenticate, middleware.notForArtist], MaquetteController.getMaquettes);
router.put('/update/maquette/:maquetteId', MaquetteController.updateMaquette);
router.delete('/delete/maquette/:maquetteId', middleware.is_authenticate, MaquetteController.deleteMaquette);

export default router;
