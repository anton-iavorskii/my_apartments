const express = require('express');
const sha256 = require('sha256');
const router = express.Router();
const User = require('../models/user');


router.get('/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const room = user.rooms; // массив с объектами
  res.render( 'profile' , { user, room:room})
})


// добавление данных после регистрации
router.post('/infoSave', async (req, res) => {
  const { name, surname, email, _id } = req.body;
  await User.update({ "_id": _id }, {
    name, 
    surname, 
    email
  });
   
   /*  res.render('profile', {name, surname, email, _id})  */
    res.redirect('/user/' + req.body._id) 

  })





module.exports = router;