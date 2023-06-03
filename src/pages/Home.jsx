import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem';
import { Context, server } from '../main';

const Home = () => {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false); 



  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  const updateHandlers=async(id)=>{
    try {
      await axios.put(`${server}/task/${id}`,{
        withCredentials:true,
      });
      toast.success("sucess")
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error("error")
    }
  }
  const deleteHandler=async(id)=>{
    try {
      await axios.delete(`${server}/task/${id}`,{
        withCredentials:true,
      });
      toast.success("sucess")
  ;
    } catch (error) {
      toast.error("error")
    }
  }


  const submitHandler=(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const data = axios.post(`${server}/task/new`,{
        title,
        description,
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        }
      });
      setTitle("");
      setDescription("");
      toast.success(data.message)
      setLoading(false);
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error(error.responce.data.message)
      setLoading(false);
    }
  }

  useEffect(() => {
    const data = axios.get(`${server}/task/all`,{
      withCredentials:true
    }).then(res=>{
     setTasks(res.data.tasks)
    }).catch(e=>{
      toast.error(e.responce.data.message)
    })
  }, [refresh])
  

  if (!isAuthenticated) return <Navigate to={"/login"}/>
  return (
    <>
    <div className="login">
    <section>
      <form onSubmit={submitHandler}>
      <input type="text" 
            placeholder='Title'
            required
            value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      <input type="text" 
            placeholder='Description'
            required
            value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button disabled={loading} type='submit'>Add Task</button>
      </form>
    </section>
  </div>
  <section className="todosContainer">
    {
      tasks.map((i)=>(
        <TodoItem title={i.title} description={i.description} isCompleted = {i.isCompleted} id = {i._id} updateHandlers={updateHandlers} deleteHandler={deleteHandler} key={i._id}/>
      ))
    }
  </section>
  </>
  )
}

export default Home