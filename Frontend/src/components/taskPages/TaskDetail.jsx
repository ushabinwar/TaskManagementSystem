import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import API from '../../api'
import { toast } from "react-toastify";

const TaskDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
    priority: '',
  });
   
  const fetchTaskDetails = async ()=>{
    try{
        const {data}= await API.get(`/task/task/${id}`)
        // console.log(data)
        setTask(data.task)
        setFormData({
            title: data.task.title,
            description: data.task.description,
            dueDate: data.task.dueDate,
            status: data.task.status,
            priority: data.task.priority,
        });
        console.log(formData)
    }catch(err){
        console.error(err)
    }
  }

  useEffect(() => {
    fetchTaskDetails()
  }, [id])
//   console.log(task)
  
  if (!task) {
    return <div>Loading...</div>; // Show loading state until task data is available
  }

  const handleEditToggel = ()=>{
     setEdit(!edit)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  
  const handleUpdate = async (e)=>{
    e.preventDefault()
    try{
      const response = await API.post(`/task/update/${id}`, formData)
      console.log(response)
      
      setEdit(false)
      fetchTaskDetails()
      toast.success("Task Updated Successfully")
    }catch(err){
      console.error(err.response?.data?.error || 'Error updating task');
    }
    
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.get(`/task/delete/${id}`);
        toast.success('Task deleted successfully');
        navigate('/dashboard'); // Navigate to dashboard on success
      } catch (err) {
        console.error(err.response?.data?.error || 'Error deleting task');
      }
    }
  };
    
  return (
    <div className='h-screen  p-20'>
      {edit ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <h1 className='text-2xl font-bold text-center'>Update Task</h1>
          <div>
            <label className="block font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border p-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border p-1 rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full border p-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border p-1 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      ):(
        <div className="max-w-2xl  p-6 bg-white ">
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Task Details</h1>
          <div className="mb-4">
            <strong className="text-gray-700">Title:</strong>{" "}
            <span className="text-gray-900">{task.title}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Description:</strong>{" "}
            <p className="text-gray-900">{task.description}</p>
         </div>
         <div className="mb-4">
            <strong className="text-gray-700">Priority:</strong>{" "}
            <span className={`${
            task.priority === "Low"
            ? "text-green-500"
            : task.priority === "Medium"
            ? "text-yellow-500"
            : task.priority === "High"
            ? "text-red-500"
            : "text-gray-300" // Default color for undefined priorities
            }`}>{task.priority}</span> {/* Change class based on priority */}
         </div>
         <div className="mb-4">
           <strong className="text-gray-700">Due Date:</strong>{" "}
           <span className="text-gray-900">{task.dueDate}</span> {/* Format date appropriately */}
         </div>
         <div className="mb-4">
            <strong className="text-gray-700">Status:</strong>{" "}
            <span className="text-gray-900">{task.status}</span>
         </div>
         <div className="flex space-x-4 mt-6">
          <Link onClick={handleEditToggel}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:shadow-md">
              Edit Task
          </Link>
          <Link onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-md">
              Delete Task
          </Link>
         </div>
       </div>
      )}
        

    </div>
  )
}

export default TaskDetail