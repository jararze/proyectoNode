const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Función para iniciar sesión
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).send('Usuario no encontrado');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).send('Contraseña incorrecta');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear usuario
exports.createUser = async (req, res) => {
    console.log('dasdas:', req.body);
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Iniciar sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).send('Usuario no encontrado');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).send('Contraseña incorrecta');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['username', 'status'] // Solo incluye estos campos
        });
        if (!user) return res.status(404).send('Usuario no encontrado');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [updated] = await User.update(
            { username, password: hashedPassword },
            { where: { id: req.params.id } }
        );
        if (!updated) return res.status(404).send('Usuario no encontrado');
        res.send('Usuario actualizado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cambiar estado del usuario
exports.changeUserStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Verificar si el usuario existe
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Actualizar el estado del usuario
        await user.update({ status });

        // Devolver el usuario actualizado
        res.json(user);
    } catch (err) {
        console.error('Error al actualizar el estado:', err);
        res.status(500).json({ error: err.message });
    }
};


// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).send('Usuario no encontrado');
        res.send('Usuario eliminado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
