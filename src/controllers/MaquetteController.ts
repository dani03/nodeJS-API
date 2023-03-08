import Maquette from "../models/Maquette";
import User from "../models/User";
import UserType from '../types/UserType';


export const showMaquette = (req: any, res: any, next: any) => {
  // res.send(req.params.maquetteId);
  let maquetteId = req.params.maquetteId;
  Maquette.findById(maquetteId).then((maquette) => {
    res.json(maquette)
  })
}

export const updateMaquette = (req: any, res: any, next: any) => {
  const title = req.body.title;
  const file_url = req.body.file_url;
  const maquetteId = req.params.maquetteId;
  //const maquette = new Maquette(req.body.title, req.body.file_url, new mongodb.ObjectId(req.params.maquetteId));

  Maquette.findById(maquetteId).then(maquette => {
    if (!maquette) {
      const error = new Error('impossible de trouvé la maquette');
      res.status(404).json({ message: error })
    } else {
      maquette.title = title;
      maquette.file_url = file_url;
      return maquette.save();
    }
  }).then(result => {
    res.status(200).json({ message: "updated succefully", maquette: result })
  }).catch(err => {
    console.log(err);
  });
}

export const deleteMaquette = (req: any, res: any, next: any) => {
  Maquette.findById(req.params.maquetteId)
    .then(maquette => {
      if (!maquette) {
        const error = new Error('impossible de trouvé la maquette');
        res.status(404).json({ message: error })
      } else {
        //on va verifier ici si l'uitlisateur est bien celui qui a créer la maquette

        return Maquette.findByIdAndRemove(maquette.id)
      }
    })
    .then(result => {
      res.status(200).json({ message: "maquette supprimée", maquette: result })
    }).catch(err => {
      console.log(err)
    });
}

export const getMaquettes = (req: any, res: any, next: any) => {
  Maquette.find({})
    .then(maquettes => {
      res.status(200).json({ data: maquettes });
    })
}

export const storeMaquette = (req: any, res: any, next: any) => {
  let theUserCreator: any;
  const maquette = new Maquette({
    title: req.body.title,
    file_url: req.body.file_url,
    user: req.userId,
    unaprovals: [],
    aprovals: [],
  });
  console.log(maquette.user)
  maquette.save().then(result => {
    return User.findById(req.userId);
  }).then((user) => {
    if (user) {
      theUserCreator = user;
      // user.maquettes.push(maquette)
      user.maquettes.push(maquette._id)
      return user.save();

    }
    res.status(404).json({ message: 'not found user' })
  })
    .then(resultat => {
      res.status(201).json({ message: "maquette ajouté avec success", maquette: maquette })

    })
    .catch(err => {
      console.log(err)
      res.status(422).json({ error: err })
    })

}
export const approvalMaquette = (req: any, res: any, next: any) => {
  //recuperation de la maquette
  console.log('ici')
  const userId = req.userId;
  const maquetteId = req.params.maquetteId;
  const choice = req.body.approuve;
  Maquette.findById(maquetteId).then(maquette => {
    if (maquette) {
      if (choice === 'true') {
        if (!maquette.aprovals.includes(userId) && !maquette.unaprovals.includes(userId)) {

          maquette.aprovals.push(userId);
          maquette.save().then(() => {
            res.status(200).json({ message: "merci pour votre approbation" })
          }).catch(err => {
            throw err;
          })
        }
        res.status(422).json({ message: "impossible deffectuer cette action sur cette maquette vous l'avez deja fait" })
      } else {
        if (!maquette.aprovals.includes(userId) && !maquette.unaprovals.includes(userId)) {

          maquette.unaprovals.push(userId);
          maquette.save().then(result => {
            res.status(200).json({ message: "merci pour votre déapprobation", result: result })
          }).catch(err => {
            throw err;
          })


        }
        res.status(422).json({ message: "impossible deffectuer cette action sur cette maquette vous l'avez deja fait" })
      }
    } else {
      res.status(404).json({ message: ' maquette not found' })
    }
  }).catch(err => {
    throw err;
  })

}
export const listMaquettes = (req: any, res: any, next: any) => {

  return User.findById(req.userId)
    .then((user) => {
      if (user) {
        //rechercher toutes les maquettes d'un user
        return Maquette.find({ _id: user.maquettes })
      }
      res.status(404).json({ message: 'not found user ' })
    }).then(results => {

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




