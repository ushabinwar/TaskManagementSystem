import React, { useEffect, useState } from "react";
import API from "../../api";
import { Link } from 'react-router-dom'

const Tasklist = () => {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  const fetchTask = async()=>{
    try{
      const {data} = await API.get('/task/alltasks')
      // console.log(data)
      const validTasks = Array.isArray(data.tasks) ? data.tasks.filter(task => task && task._id) : []

      setTasks(validTasks)
      // console.log(validTasks)
      if(validTasks.length === 0){
        setError('No tasks found or invalid data.');
      }
    }catch(err){
      setError(err.response?.data?.error || 'Error fetching tasks');
      console.log(err)
    }
  }
  useEffect(() => {
    fetchTask()
  }, [])
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Task List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Task Card Container */}
      <div className="grid gap-4">
        {/* Task Card */}
        {tasks.length > 0 ? (
          
          tasks.map((task)=>{
            return(
              
          <div key={task._id} className="p-4 border rounded-lg  hover:shadow-md transition bg-gray-50">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">
              <strong>Due:</strong> {task.dueDate}
            </p>
            <p className="text-sm text-gray-600">
             <strong>Status:</strong> {task.status}
            </p>
            <p className="text-sm text-gray-600 mb-3">
             <strong>Priority:</strong>{" "}
            <span className={ `${
      task.priority === "Low"
        ? "text-green-500"
        : task.priority === "Medium"
        ? "text-yellow-500"
        : task.priority === "High"
        ? "text-red-500"
        : "text-gray-300" // Default color for undefined priorities
    }`}
            >
              {task.priority}
            </span>
            </p>
            
            <Link to={`/task/${task._id}`} className=" text-md  text-white bg-blue-500 px-4 rounded-md py-1 hover:shadow-md transition">
              View Details
            </Link>
         </div>
            )
          })
          
        ):(
          <p>No task available</p>
        )}
        

        {/* Task Card
        <div className="p-4 border rounded-lg hover:shadow-md transition bg-gray-50">
          <h3 className="text-xl font-semibold">Fix Backend Bugs</h3>
          <p className="text-sm text-gray-600">
            <strong>Due:</strong> 2024-12-15
          </p>
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> Pending
          </p>
          <p className="text-sm text-gray-600">
            <strong>Priority:</strong>{" "}
            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
              Medium
            </span>
          </p>
          
        </div> */}

        {/* Task Card */}
        {/* <div className="p-4 border rounded-lg hover:shadow-md transition bg-gray-50">
          <h3 className="text-xl font-semibold">Prepare Presentation</h3>
          <p className="text-sm text-gray-600">
            <strong>Due:</strong> 2024-12-20
          </p>
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> Completed
          </p>
          <p className="text-sm text-gray-600">
            <strong>Priority:</strong>{" "}
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
              Low
            </span>
          </p>
          <button className="mt-2 text-blue-500 hover:underline">
            View Details
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Tasklist;
