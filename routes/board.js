const { req } = require('express');
const express = require('express');
const router = express.Router();

const db = require('../public/javascripts/db');
router.get('/', (req, res)=>{
    const sqlQuery = 'SELECT * FROM board';
    db.query(sqlQuery, (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.post('/create', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const sqlQuery = 'INSERT INTO board (title, description, created) VALUES (?, ?, ?)';

    db.query(sqlQuery, [title, description, date], (err, result)=>{
        if(err) throw err;
        res.send('ok');
    });
});

router.put('/update', (req, res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const sqlQuery = 'UPDATE board SET title=?, description=? WHERE id=?';

    db.query(sqlQuery, [title, description, id], (err, result)=> {
        if(err) throw err;
        res.send('ok');
    });
    
});

router.delete('/delete', (req, res)=>{
    const id = req.body.id;
    const sqlQuery = 'DELETE FROM board WHERE id=?';

    db.query(sqlQuery, [id], (err, result)=>{
        if(err) throw err;
        res.send('ok');
    });
});

module.exports = router;