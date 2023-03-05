import Maquette from "../models/Maquette.js";
import mongodb from "mongodb";
import User from "../models/User.js";
import { response } from "express";

export const showMaquette = (req, res, next) => {
  // res.send(req.params.maquetteId);
  let maquetteId = req.params.maquetteId;
  Maquette.findById(maquetteId).then(maquette => {
    res.json(maquette)
  })

}

export const updateMaquette = (req, res, next) => {
  const title = req.body.title;
  const file_url = req.body.file_url;
  const maquetteId = req.params.maquetteId;
  //const maquette = new Maquette(req.body.title, req.body.file_url, new mongodb.ObjectId(req.params.maquetteId));

  Maquette.findById(maquetteId).then(maquette => {
    if (!maquette) {
      const error = new Error('impossible de trouvé la maquette');
      res.status(404).json({ message: error })
    }
    maquette.title = title;
    maquette.file_url = file_url;
    return maquette.save();
  }).then(result => {
    res.status(200).json({ message: "updated succefully", maquette: result })
  }).catch(err => {
    console.log(err);
  });
}

export const deleteMaquette = (req, res, next) => {
  Maquette.findById(req.params.maquetteId)
    .then(maquette => {
      if (!maquette) {
        const error = new Error('impossible de trouvé la maquette');
        res.status(404).json({ message: error })
      }
      //on va verifier ici si l'uitlisateur est bien celui qui a créer la maquette

      return Maquette.findByIdAndRemove(maquette.id)
    })
    .then(result => {
      res.status(200).json({ message: "maquette supprimée", maquette: result })
    }).catch(err => {
      console.log(err)
    });
}

export const getMaquettes = (req, res, next) => {
  Maquette.find({})
    .then(maquettes => {
      res.status(200).json({ data: maquettes });
    })
}

export const storeMaquette = (req, res, next) => {
  console.log("id =>", req.userId, "email =>", req.email, "role =>", req.role);
  let theUserCreator;
  const maquette = new Maquette({
    title: req.body.title,
    file_url: req.body.file_url,
    user: req.userId,

  });
  console.log(maquette.user)
  maquette.save().then(result => {
    return User.findById(req.userId);
  })
    .then(user => {
      //console.log('he=>', user);
      theUserCreator = user;
      user.maquettes.push(maquette)
      return user.save();
    })
    .then(resultat => {
      res.status(201).json({ message: "maquette ajouté avec success", maquette: maquette })

    })
    .catch(err => {
      console.log(err)
      res.status(422).json({ error: err })
    })

}
export const approvalMaquette = (req, res, next) => {

}
export const listMaquettes = (req, res, next) => {
  console.log('---------------------helo-----')
  return User.findById(req.userId)
    .then(user => {
      //rechercher toutes les maquettes d'un user
      return Maquette.find({_id : user.maquettes})
    }).then(results => {
      console.log(results)
      res.status(200).json([{ maquettes: results }]);
    }).catch(err => {
      throw err;
    })
}



export default {
  storeMaquette,
  approvalMaquette, updateMaquette,
  deleteMaquette, showMaquette, getMaquettes, listMaquettes
}




