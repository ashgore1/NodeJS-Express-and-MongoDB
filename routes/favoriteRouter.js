const express = require("express");
const bodyParser = require("body-parser");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require("./cors");

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .populate("user")
      .populate("campsite")
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorites);
      })
      .catch((err) => next(err));
  })
//   .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Favorite.findOne({ user: req.user._id })
//         .then((favorite) => {
//             if (favorite) {
//             req.body.forEach((campsiteId) => {
//                 if (!favorite.campsites.includes(campsiteId)) {
//                 favorite.campsites.push(campsiteId);
//                 }
//             });
//             favorite
//                 .save()
//                 .then((favorite) => {
//                 res.statusCode = 200;
//                 res.setHeader("Content-Type", "application/json");
//                 res.json(favorite);
//                 })
//                 .catch((err) => next(err));
//             } else {
//             Favorite.create({ user: req.user._id, campsites: req.body }).then(
//                 (favorite) => {
//                 favorite
//                     .save()
//                     .then((favorite) => {
//                     res.statusCode = 200;
//                     res.setHeader("Content-Type", "application/json");
//                     res.json(favorite);
//                     })
//                     .catch((err) => next(err));
//                 }
//             );
//             }
//         })
//       .catch((err) => next(err));
//   })
//   .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
//     res.statusCode = 403;
//     res.end(`PUT operation not supported on /favorites`);
//   })
  // .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  //   Favorite.findOne({user: req.user._id}).then((favorite) =>
  //   {
  //     if(favorite) {
  //       favorite.remove().then((res)=> {
  //       res.statusCode = 200;
  //       res.setHeader("Content-Type", "application/json");
  //       res.send("Deleted");
  //     })
  //     .catch((err) => next(err));
  //   }});

// favoriteRouter
//   .route("/:campsiteId")
//   .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
//   .get(cors.cors, (req, res, next) => {
//     res.statusCode = 403;
//     res.end(
//       `Get operation not supported on /favorites/${req.params.favoriteId}`
//     );
//   })
//   .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Favorite.findOne({ user: req.user._id })
//         .then((favorite) => {
//             if (favorite) {
//             req.body.forEach((campsiteId) => {
//                 if (favorite.campsites.includes(req.params.campsiteId))
//                 {res.send("exists");

//                     };
//                 if (!favorite.campsites.includes(campsiteId)) {
//                 favorite.campsites.push(req.params.campsiteId);
//                 }
//             });
//             favorite
//                 .save()
//                 .then((favorite) => {
//                 res.statusCode = 200;
//                 res.setHeader("Content-Type", "application/json");
//                 res.json(favorite);
//                 })
//                 .catch((err) => next(err));
//             } else {
//             Favorite.create({ user: req.user._id, campsites: req.body }).then(
//                 (favorite) => {
//                 favorite
//                     .save()
//                     .then((favorite) => {
//                     res.statusCode = 200;
//                     res.setHeader("Content-Type", "application/json");
//                     res.json(favorite);
//                     })
//                     .catch((err) => next(err));
//                 }
//             );
//             }
//         })
//       .catch((err) => next(err));
//   })
//   .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     res.statusCode = 403;
//     res.end(
//       `Put operation not supported on /favorites/${req.params.favoriteId}`
//     );
//   })
//   .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Favorite.findOne({user: req.user_id})
//     .then((favorite) => {
//         favorite.campsites = favorite.campsites.filter(
//             (item) => !item.equals(req.params.campsiteId)
//         );
//     favorite.save()
//       .then((favorite) => { 
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(favorite);
//       })
//       .catch((err) => next(err));
//   })
//   .catch((err) => next(err));
//   });

module.exports = favoriteRouter;