const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
  email: String,
  password: String, 
  name: String,
  surname: String,
  rooms: [{
    sity: String,
    street: String,
    houseNumber: Number,
    flatNumder: Number,
    studioNumder:Number,
    roomsInFlat: Number,
    okrug: String,
    guests: [{
      surname: String,
      name: String,
      patronymic: String,
      birth: String,
      passportNumber: String,
      passportIssue: String,
      pfssportIssueDate: String,
      phone: Number,
      dateIn: String,
      dateOut: String,
      payment: Number,
      deposit: Number,
      fixKommunalPay: Number,
      specialConditions: String,
      photoPassport: String,
      photoDogovor: String,
      withGuest: String,
      withGuestPhone: String
    }]
  }],
  scrf_token: String
});

module.exports = mongoose.model('User', userSchema);