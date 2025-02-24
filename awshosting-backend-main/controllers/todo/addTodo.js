const Todo = require("../../models/todo");  // Ensure correct path

const addTodo = async (req, res) => {
    try {
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({ success: false, error: "Task is required" });
        }

        // Sequelize's create() function
        const newTodo = await Todo.create({ text: task });

        res.status(200).json({
            success: true,
            data: newTodo
        });

    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ success: false, error: "Failed to add todo" });
    }
};

module.exports = addTodo;
