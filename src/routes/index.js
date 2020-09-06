const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Conexion exitosa',
        endpoints: [ 
            {
                name: 'Busqueda',
                ruta: '/search'
            }
        ]
    });
});

router.use('/search', require('./search'));

module.exports = router;