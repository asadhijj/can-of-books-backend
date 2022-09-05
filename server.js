'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = require('./Schema')

const server = express();
server.use(express.json());
server.use(cors());

//mongoose.connect('mongodb://localhost:27017/Books', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://asadsBD:001100@ac-jh4h4ir-shard-00-00.rketq1h.mongodb.net:27017,ac-jh4h4ir-shard-00-01.rketq1h.mongodb.net:27017,ac-jh4h4ir-shard-00-02.rketq1h.mongodb.net:27017/?ssl=true&replicaSet=atlas-aekloa-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const PORT = process.env.PORT || 3001;

const book = mongoose.model ('books', Schema)

async function seedData () {
  const firstBook  = new book ({
    title : "The Virtues of Happiness: A Theory of the Good Life ",
    description : "This book explains why it is bad to be bad and good to be good, and what happens to people's values as their practical rationality develops.",
    status : "Available"
  })

  const secondBook = new book ({
    title : "Beyond Good & Evil: Prelude to a Philosophy of the Future",
    description : "In nine parts the book is designed to give the reader a comprehensive idea of Nietzsche's thought and style:  they span The 'Prejudices of Philsophers', The Free Spirit, religion, morals, scholarship, 'Our Virtues' ,'Peoples and Fatherlands' and 'What Is Noble,' as well as epigrams and a concluding poem. ",
    status : "Available",
    })
    const thirdBook = new book ({
      title : "The Sailor Who Fell from Grace with the Sea", 
      description : "Thirteen-year-old Noboru is a member of a gang of highly philosophical teenage boys who reject the tenets of the adult world — to them, adult life is illusory, hypocritical, and sentimental. When Noboru’s widowed mother is romanced by Ryuji, a sailor, Noboru is thrilled. He idolizes this rugged man of the sea as a hero. But his admiration soon turns to hatred, as Ryuji forsakes life onboard the ship for marriage, rejecting everything Noboru holds sacred. Upset and appalled, he and his friends respond to this apparent betrayal with a terrible ferocity.",
      status : "Available",
    })

    await firstBook.save()
    await secondBook.save()
    await thirdBook.save()
}

//seedData();

server.get('/books', booksHandler)

function booksHandler(req,res){
  book.find({},(err,result) =>{
    if(err){
      console.log(err)
    }
    else 
    {
      res.status(200).json(result)
    }
  })
}
server.post('/books',addBookHandler);

async function addBookHandler(req,res) {
  console.log(req.body);

  const {title,description,status} = req.body; 
  await book.create({
      title : title,
      description : description,
      status : status
  });

  book.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          // console.log(result);
          res.status(200).json(result);
      }
  })
}

server.delete('/books/:id',deleteBookHandler);

function deleteBookHandler(req,res) {
  const bookId = req.params.id;
  book.deleteOne({_id:bookId},(err,result)=>{
      
      book.find({},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              // console.log(result);
              res.status(200).send(result);
          }
      })

  })
  
}


server.get('/test', (request, response) => {

  response.send('test request received')

})

server.get('*', errorHandler)

function errorHandler(req,res){
  res.status(404).send('404 PAGE NOT FOUND!') 
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
