const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/sneakerList`, {useNewUrlParser: true});


  let sneakerSchema = mongoose.Schema({
    Brand: String,
    Name: String,
    Color: String,
    Size: Number,
    PID: String,
    Retail: Number
  });

  let Sneaker = mongoose.model('Sneaker', sneakerSchema)

const getInventory = (callback) => {
  Sneaker.find({}, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
}

const addSneaker = (data, callback) => {
  let newShoe = new Sneaker({
    Brand: data.brand,
    Name: data.name,
    Color: data.color,
    Size: data.size,
    PID: data.pid,
    Retail: data.retail
  });

  newShoe.save((err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
};

const updateSneaker = (data, callback) => {

  Sneaker.update({ _id : data._id }, {$set: {"Size": data.size}},(err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('Successful update', results)
      callback(null, results);
    }
  })
};

const deleteSneaker = (data, callback) => {
  Sneaker.remove({ _id : data }, callback)
};

module.exports.Sneaker = Sneaker;
module.exports.getInventory = getInventory;
module.exports.addSneaker = addSneaker;
module.exports.updateSneaker = updateSneaker;
module.exports.deleteSneaker = deleteSneaker;
module.exports.mongoose = mongoose;


