import Task from '../models/task.model.js';

class TaskController {
  static findAll = async (req, res) => {
    try {
			const tasks = await Task.find({ user: req.user.id }).populate("user");
			res.status(200).json(tasks);
		} catch (error) {
			console.log(error);
			res.status(500).send("Error getting tasks");
		}
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id).populate('user');

      if (!task) return res.status(404).json({ message: 'Task not found' });

      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error getting task');
    }
  };
  
  static create = async (req, res) => {
    try {
      const { title, description, status } = req.body;
      const newTask = new Task({
        title,
        description,
        status,
        user: req.user.id,
      });
      const taskSaved = await newTask.save();
      res.status(201).json(taskSaved);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error creating task');
    }
  };

  static update = async (req, res) => {
    const { id } = req.params;
    try {
      const taskUpdated = await Task.findByIdAndUpdate(id, req.body);

      if (!taskUpdated) return res.status(404).json({ message: 'Task not found' });
      
      res.status(200).json({taskUpdated});
    } catch (error) {
      console.log(error);
      res.status(500).send('Error updating task');
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      const taskDeleted = await Task.findByIdAndDelete(id);

      if (!taskDeleted) return res.status(404).json({ message: 'Task not found' });

      res.status(200).json('Task deleted');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error deleting task');
    }
  };
}

export default TaskController;