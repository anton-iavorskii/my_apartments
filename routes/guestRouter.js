const express = require('express');
const fileUpload = require('express-fileupload'); // для сохранения файлов
const router = express.Router();
const User = require('../models/user');



// на страницу с формой добавления гостя
router.get('/add/:id', async (req, res) => {
    res.render( 'addGuest' , { id: req.params.id  })
})


// добавление данных о госте в БД
router.post('/new', async (req, res) => {
    const fileFoto = req.files.fileFoto;
    const fileName = fileFoto.name;
    const photoPas = (fileName);
    console.log(photoPas);
    fileFoto.mv('./public/photoPas/' + fileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("uploaded");
      }
    }) 
    
    const {  
        surname,
        name,
        patronymic,
        birth,
        passportNumber,
        passportIssue,
        pfssportIssueDate,
        phone,
        dateIn,
        dateOut,
        payment,
        deposit,
        fixKommunalPay,
        specialConditions,
        photoDogovor,
        withGuest,
        withGuestPhone,
        _id_room } = req.body;

    const user = await User.findOne({ "rooms._id": _id_room });
    const roomArr = user.rooms;
         
    roomArr.forEach(async function (element) {
      if(element._id == _id_room) {
        const room = element;
        const guestsArr = room.guests;
        guestsArr.push({ 
            surname,
            name,
            patronymic,
            birth,
            passportNumber,
            passportIssue,
            pfssportIssueDate,
            phone,
            dateIn,
            dateOut,
            payment,
            deposit,
            fixKommunalPay,
            specialConditions,
            photoPassport: photoPas,
            photoDogovor,
            withGuest,
            withGuestPhone
        })
        await User.update({ "_id": user._id}, {
        rooms: roomArr
});
        
      } 
    });
        res.redirect('/rooms/info/' + req.body._id_room) 
  
    })

// получаем данные о госте из БД для редактирования
router.get('/chenge/:id', async (req, res) => { // приходит id room
    const user = await User.findOne({ "rooms._id": req.params.id });
    const roomArr = user.rooms;

    roomArr.forEach(async function (element) {
        if(element._id == req.params.id) {
          const room = element;
          const guests = room.guests[0];
          res.render( 'changeGuest' , { guests, id: req.params.id })
      };
})
})

//  редактирование данных гостя
router.post('/saveChange', async (req, res) => {
    const {  
        surname,
        name,
        patronymic,
        birth,
        passportNumber,
        passportIssue,
        pfssportIssueDate,
        phone,
        dateIn,
        dateOut,
        payment,
        deposit,
        fixKommunalPay,
        specialConditions,
        photoPassport,
        photoDogovor,
        withGuest,
        withGuestPhone, 
        _id_room } = req.body;

    const user = await User.findOne({ "rooms._id": _id_room });
    

    user.rooms.forEach(async function (element) {
      if(element._id == _id_room) {
        const room = element;
        let guestsArr = room.guests;

        guestsArr[0].surname = surname;
        guestsArr[0].name = name;
        guestsArr[0].patronymic = patronymic;
        guestsArr[0].birth = birth;
        guestsArr[0].passportNumber = passportNumber;
        guestsArr[0].passportIssue = passportIssue;
        guestsArr[0].pfssportIssueDate = pfssportIssueDate;
        guestsArr[0].phone = phone;
        guestsArr[0].dateIn = dateIn;
        guestsArr[0].dateOut = dateOut;
        guestsArr[0].payment = payment;
        guestsArr[0].birth = birth;
        guestsArr[0].deposit = deposit;
        guestsArr[0].fixKommunalPay = fixKommunalPay;
        guestsArr[0].specialConditions = specialConditions;
        guestsArr[0].photoPassport = photoPassport;
        guestsArr[0].photoDogovor = photoDogovor;
        guestsArr[0].withGuest = withGuest;
        guestsArr[0].withGuestPhone = withGuestPhone;

        await user.save()
        
      } 
    });
        res.redirect('/rooms/info/' + req.body._id_room) 
  
    })



module.exports = router;