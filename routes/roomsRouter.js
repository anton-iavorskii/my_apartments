const express = require('express');
const router = express.Router();
const User = require('../models/user');
const fetch = require('node-fetch');






router.get('/:id', async (req, res) => {
/*   const user = await User.findOne({ _id: req.params.id });
  res.render( 'rooms' , { user }) */

  res.render( 'rooms' , { id: req.params.id  })
})


// добавление данных квартиры
router.post('/add', async (req, res) => {
    const { roomsInFlat, sity, street, houseNumber, flatNumder, studioNumder, okrug, _id } = req.body;

    const user = await User.findOne({ "_id": _id });
    const roomsArr = user.rooms;
    roomsArr.push({roomsInFlat, sity, street, houseNumber, flatNumder, studioNumder, okrug})

    await User.update({ "_id": _id }, {
        rooms: roomsArr
    });
     
     /*  res.render('profile', {name, surname, email, _id})  */
      res.redirect('/user/' + req.body._id) 
  
    })


    //карточка квартиры
  /*   router.get('/info/:id', async (req, res) => {
      const data = await fetch('https://taras.media/test_elbrus/'); // в массиве индекс 0 - это студии, индекс 1 - 1кк и.д
      const result = await data.json();
      const studiaCAO = result.result[0].ЦАО[0];
    
        const user = await User.findOne({ "rooms._id": req.params.id });
        const roomArr = user.rooms;
        
        roomArr.forEach(element => {
          if(element._id == req.params.id) {
            res.render( 'roomCard' , { user, room: element, allOkrug: allOkrug })
          } else {
            
          }
        });
      }) */

      router.get('/info/:id', async (req, res) => {
        const data = await fetch('https://taras.media/test_elbrus/'); // в массиве индекс 0 - это студии, индекс 1 - 1кк и.д
        const result = await data.json();
        // из объекта использовано 4 округа из 10 (добавить оставшиеся по аналогии)
        const studiaCAO = result.result[0].ЦАО[0];
        const CAO_1 = result.result[0].ЦАО[1];
        const CAO_2 = result.result[0].ЦАО[2];
        const CAO_3 = result.result[0].ЦАО[3];
        
        const studiaZAO = result.result[1].ЗАО[0];
        const ZAO_1 = result.result[1].ЗАО[1];
        const ZAO_2 = result.result[1].ЗАО[2];
        const ZAO_3 = result.result[1].ЗАО[3];

        const studiaUZAO = result.result[2].ЮЗАО[0];
        const UZAO_1 = result.result[2].ЮЗАО[1];
        const UZAO_2 = result.result[2].ЮЗАО[2];
        const UZAO_3 = result.result[2].ЮЗАО[3];

        const studiaSAO = result.result[3].САО[0];
        const SAO_1 = result.result[3].САО[1];
        const SAO_2 = result.result[3].САО[2];
        const SAO_3 = result.result[3].САО[3];
       
          const user = await User.findOne({ "rooms._id": req.params.id });
          const roomArr = user.rooms;
          
          roomArr.forEach(element => {
            if(element._id == req.params.id) {

              if(element.okrug == 'ЦАО' && element.roomsInFlat == 0) {
                res.render( 'roomCard' , { user, room: element, dataFetch: studiaCAO })
              } 
              if(element.okrug == 'ЦАО' && element.roomsInFlat == 1) {
                res.render( 'roomCard' , { user, room: element, dataFetch: CAO_1 })
              }
              if(element.okrug == 'ЦАО' && element.roomsInFlat == 2) {
                res.render( 'roomCard' , { user, room: element, dataFetch: CAO_2 })
              }
              if(element.okrug == 'ЦАО' && element.roomsInFlat == 3) {
                res.render( 'roomCard' , { user, room: element, dataFetch: CAO_3 })
              }

              if(element.okrug == 'ЗАО' && element.roomsInFlat == 0) {
                res.render( 'roomCard' , { user, room: element, dataFetch: studiaZAO })
              }
              if(element.okrug == 'ЗАО' && element.roomsInFlat == 1) {
                res.render( 'roomCard' , { user, room: element, dataFetch: ZAO_1 })
              }
              if(element.okrug == 'ЗАО' && element.roomsInFlat == 2) {
                res.render( 'roomCard' , { user, room: element, dataFetch: ZAO_2 })
              }
              if(element.okrug == 'ЗАО' && element.roomsInFlat == 3) {
                res.render( 'roomCard' , { user, room: element, dataFetch: ZAO_3 })
              }

              if(element.okrug == 'ЮЗАО' && element.roomsInFlat == 0) {
                res.render( 'roomCard' , { user, room: element, dataFetch: studiaUZAO })
              }
              if(element.okrug == 'ЮЗАО' && element.roomsInFlat == 1) {
                res.render( 'roomCard' , { user, room: element, dataFetch: UZAO_1 })
              }
              if(element.okrug == 'ЮЗАО' && element.roomsInFlat == 2) {
                res.render( 'roomCard' , { user, room: element, dataFetch: UZAO_2 })
              }
              if(element.okrug == 'ЮЗАО' && element.roomsInFlat == 3) {
                res.render( 'roomCard' , { user, room: element, dataFetch: UZAO_3 })
              }

              if(element.okrug == 'САО' && element.roomsInFlat == 0) {
                res.render( 'roomCard' , { user, room: element, dataFetch: studiaSAO })
              }
              if(element.okrug == 'САО' && element.roomsInFlat == 1) {
                res.render( 'roomCard' , { user, room: element, dataFetch: SAO_1 })
              }
              if(element.okrug == 'САО' && element.roomsInFlat == 2) {
                res.render( 'roomCard' , { user, room: element, dataFetch: SAO_2 })
              }
              if(element.okrug == 'САО' && element.roomsInFlat == 3) {
                res.render( 'roomCard' , { user, room: element, dataFetch: SAO_3 })
              }

               /* res.render( 'roomCard' , { user, room: element, adataFetch: CAO_1 })  */
            } else {
              
            }
          });
        }) 


module.exports = router;