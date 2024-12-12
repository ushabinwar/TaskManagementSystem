const taskModel = require('../models/taskModel');


module.exports.createTask = async(req, res, next)=>{
    try {
        const { title, description, status, priority, dueDate } = req.body;
         console.log(req.user)
    
        // Validate required fields
        if (!title || !description || !status || !priority || !dueDate) {
          return res.status(400).json({ error: "All fields are required." });
        }
    
        // Create the task
        const newTask = new taskModel({
          title,
          description,
          status, // Defaults to "Pending" if not provided
          priority, // Defaults to "Medium" if not provided
          dueDate,
          assignedUserId: req.user.id, // Assign task to the logged-in user
        });
    
        const savedTask = await newTask.save();
    
        // Success response
        res.status(201).json({
          message: "Task created successfully!",
          task: savedTask,
        });
      } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.getAllTask = async (req, res, next)=>{
    try{
        const tasks = await taskModel.find({})

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found." });
        }

        res.status(200).json({
            message: "Tasks fetched successfully.",
            tasks,
        });
    }catch(error){
        res.status(500).json({error:error.message})
    } 
}

module.exports.getOneTask = async (req, res, next)=>{
    try{
        const { id } = req.params;
        const task = await taskModel.findById(id)

        if (!task) {
            return res.status(404).json({ message: "No task found." });
        }

        res.status(200).json({task});
    }catch(error){
        res.status(500).json({error:error.message})
    } 
}
module.exports.updateTask = async (req, res, next)=>{
    try {
        const { title, description, dueDate, priority, status } = req.body;
        // console.log(req.body)
        const task = await taskModel.findById(req.params.id);
        // console.log(task)
      
        if (!task) {
          return res.status(404).json({ error: 'Task not found.' });
        }
    
        // Check if the task belongs to the logged-in user
        if (task.assignedUserId.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: 'Unauthorized access.' });
        }
    
        // Update fields if provided in the request body
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
    
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


module.exports.deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Check if the task belongs to the logged-in user
    if (task.assignedUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized access.' });
    }

    // Use deleteOne() instead of remove()
    await task.deleteOne();

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
