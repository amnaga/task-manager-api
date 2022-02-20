// var MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
const id = new ObjectID()
console.log(id)
var url = process.env.DB_CONNECT_URL;

MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(DB_NAME);
  dbo.collection('users').findOne({age:33},(error, user) => {
      if(error){
          return console.log("Unable to fetch")
      }
      console.log(user)
  })
  dbo.collection('users').find({age:33}).toArray((error, user) => {
    if(error){
        return console.log("Unable to fetch")
    }
    console.log(user)
  })

  const updatePromises = dbo.collection('users').updateOne({_id: new ObjectID("6194d63c3a4e153848474a2f")},{
    $set:{
      name:"Kiran Deep",
      age:40
    }
  })
  updatePromises.then((result) => {
    console.log("Data updated!")
  }).catch((error) => {
    console.log(error)
  })
  dbo.collection('users').updateMany({
    age: 33
  },{
    $set:{
      age:30
    }
  }).then((result) => {
    console.log("Successfully updated many records!")
  }).catch((error) => {
    console.log(error)
  })
  
  dbo.collection("users").deleteOne({_id: new ObjectID("6194d4a1e796be370dca5b3f")}).then((result) => {
    console.log("Record Deleted successfully!")
  }).catch((error) => {
    console.log(error)
  })
//   dbo.collection('tasks').insertMany([
//       {
//         description:"New description",
//         age:33
//       },
//       {
//         description:"New description",
//         age:38
//       },
//     ],(error,result)=>{
//       if(error){
//           return console.log('unable to insert data')
//       }
//       console.log(result.ops)
//   })
});
