const express = require("express");

function routes(Book) {
  const bookRouter = express.Router();
  bookRouter
    .route("/books")
    .post((req, res) => {
      const book = new Book(req.body);
      console.log(book);
      book.save();
      return res.status(201).send(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });

  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.statusCode(404);
    });
  });

  bookRouter
    .route("/books/:bookId")
    .put((req, res) => {
        const {book} = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        book.save((err)=>{
            if(err){
                return res.send(err);
            }
            return res.json(book);
        })
    })
    .patch((req, res) => {
        const {book} = req;
        if(book._id){
            delete req.book._id;
        }
        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            book[key] = value;
        });
        book.save((err)=>{
            if(err){
                return res.send(err);
            }
            return res.json(book);
        })
    })
    .get((req, res) => res.json(req.book))
    .delete((req, res) => {
        req.book.remove((err)=>{
            if(err){
                return res.send(err);
            }
            return res.sendStatus(204);
        })
    });
  return bookRouter;
}

module.exports = routes;
