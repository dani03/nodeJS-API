import express from "express";
import ArtistController from "../controllers/ArtistController";
import middleware from "../middlewares/middleware";
const router = express.Router();

router.get('/artist/me', (req, res) => {

})
router.get('/artist/{:id}', (req, res) => {
    console.log('hello from artist')
})
router.post('/artist/store', [middleware.is_authenticate, middleware.isManager], ArtistController.storeArtist);


export default router;