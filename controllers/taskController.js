const { User, Task } = require('../models');


// Obtener todas las tareas
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    try {
        const { name } = req.body;
        const task = await Task.create({ name, userId: req.user.id });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!task) return res.status(404).send('Tarea no encontrada');
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
    try {
        const { name } = req.body;
        const [updated] = await Task.update({ name }, { where: { id: req.params.id, userId: req.user.id } });
        if (!updated) return res.status(404).send('Tarea no encontrada');
        res.send('Tarea actualizada');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cambiar el estado de una tarea
exports.changeTaskStatus = async (req, res) => {
    try {
        const { done } = req.body;
        const [updated] = await Task.update({ done }, { where: { id: req.params.id, userId: req.user.id } });
        if (!updated) return res.status(404).send('Tarea no encontrada');
        res.send('Estado actualizado');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
        if (!deleted) return res.status(404).send('Tarea no encontrada');
        res.send('Tarea eliminada');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserTasks = async (req, res) => {
    try {
        const userId = req.params.id;

        const tasks = await Task.findAll({
            where: { userId },
            attributes: ['name', 'done'],
        });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas para este usuario' });
        }

        const user = await User.findOne({
            where: { id: userId },
            attributes: ['username'],
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const response = {
            username: user.username,
            tasks: tasks.map(task => ({
                name: task.name,
                done: task.done,
            })),
        };

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
