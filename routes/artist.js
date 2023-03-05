import express from "express";
import ArtistController from "../controllers/ArtistController.js";
import middleware from "../middlewares/middleware.js";
const router = express.Router();

router.get('/artist/me', (req, res) => {

})
router.get('/artist/{:id}', (req, res) => {
    console.log('hello from artist')
})
router.post('/artist/store',[], ArtistController.storeArtist);


export default router;