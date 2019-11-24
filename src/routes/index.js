'use strict'
const { Router } = require('express');
const router = Router();
// const app = express();

router.get('/', (req, res) => {
    res.send('Funcionandoi');
});

module.exports = router;