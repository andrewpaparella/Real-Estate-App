var express = require('express');
var router = express.Router();
const realtorsCtrl = require('../controllers/realtors')

router.get('/realtors', realtorsCtrl.index)
router.get('/realtors/new', realtorsCtrl.new)
router.post('/realtors', realtorsCtrl.create)
router.get('/realtors/:id', realtorsCtrl.show)
router.get('/realtors/:id/edit', realtorsCtrl.edit)
router.delete('/realtors/:id', realtorsCtrl.delete)
router.put('/realtors/:id', realtorsCtrl.update)
router.get('/realtors/:id/comments/new', realtorsCtrl.new2)
router.get('/realtors/:id/comments', realtorsCtrl.show2)
router.post('/realtors/:id/comments', realtorsCtrl.create2)
router.delete('/realtors/:id/comments/:id2', realtorsCtrl.delete2)
module.exports = router