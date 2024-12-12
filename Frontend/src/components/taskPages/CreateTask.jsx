import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate()
  // State to store form input values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending", // default value
    priority: "Medium", // default value
  });
  const [error, setError] = useState('')

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can send the data to your backend API or handle it as needed
    try{
        const response = await API.post('/task/create', formData ,{
          
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        // console.log("Token:", localStorage.getItem('token'));
        console.log(response, "task created sucessfullu")
        toast.success("Task Created Successfully")
        navigate("/dashboard")
  
      }catch(err){
        console.log(err)
        // setError(err.response?.data?.error || 'Registration failed');
        // toast.error(err.response.data.message || 'Registration failed')
       
      }
      
  };

  return (
    <div className="p-1 min-h-screen w-full">
        <div className=" mx-auto mt-16   py-4 px-28 ">
      <h2 className="text-2xl font-semibold mb-2 text-center">Create New Task</h2>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
          />
        </div>

        {/* Due Date Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className=" bg-blue-600 text-white py-2 px-6 mt-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateTask;
