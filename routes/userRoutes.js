const express = require('express');
const { getUsers, createUser, loginUser, getUserById, updateUser, changeUserStatus, deleteUser } = require('../controllers/userController');

// console.log({ getUsers, createUser, loginUser, getUserById, updateUser, changeUserStatus, deleteUser }); // Agrega esto
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();



router.post('/users', createUser); // Verifica que 'createUser' esté definido
router.post('/login', loginUser); // Verifica que 'loginUser' esté definido
router.get('/users', getUsers); // Verifica que 'getUsers' esté definido

router.use(authMiddleware); // Protege rutas a partir de aquí
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.patch('/users/:id', changeUserStatus);
router.delete('/users/:id', deleteUser);

module.exports = router;