var express = require('express');
var router = express.Router();
const homesCtrl = require('../controllers/homes');


/* GET users listing. */
router.get('/', homesCtrl.index)
router.get('/new', homesCtrl.new)
router.post('/', homesCtrl.create)
router.get('/:id', homesCtrl.show)
router.delete('/:id', homesCtrl.delete)
router.put('/:id', homesCtrl.update)
router.get('/:id/edit', homesCtrl.edit)
// router.post('/:id/realtor', homesCtrl.addToHome)


module.exports = router;
