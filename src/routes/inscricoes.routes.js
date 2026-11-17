const { Router } = require('express');
const controller = require('../controllers/inscricoes.controller');

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
