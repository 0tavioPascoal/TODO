import React, { useState } from 'react';

//css
import styles from './interfaces/App.module.css'

//components
import Header from './components/header/Header';
import Footer from './components/foooter/Footer';
import TaskForm from './components/form/TaskForm';
import TaskList from './components/list/TaskList';
import Modal from './components/modal/Modal';

//interface
import { ITask } from './interfaces/Task';


function App() {
  const [taskList, setTAskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask =(id: number) => {
    setTAskList(
      taskList.filter(task =>{
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display : boolean)=>{
    const modal = document.querySelector('#modal')
      if(display){
        modal!.classList.remove('hide')
      } else{
        modal!.classList.add('hide')
      }
  }

    const editTask = (task: ITask): void=>{
      hideOrShowModal(true)
      setTaskToUpdate(task)

    }

    const updateTask = (id: number, title: string, difficulty: number)=>{

      const updateTask: ITask = {id, title, difficulty}

      const updatedItens = taskList.map((task)=>{
        return task.id === updateTask.id ? updateTask : task
      })

      setTAskList(updatedItens)

      hideOrShowModal(false)
    }

  return (
    <div>
      <Modal children={<TaskForm
       btnText='editar tarefa'
        taskList={taskList}
        task={taskToUpdate}
        handleUpdate={updateTask}
        />}/>
      <Header/>
        <main className={styles.main}>
          <div>
            <h2> O que você vai fazer?</h2>
            <TaskForm 
            btnText='Criar Tarefa'
             taskList={taskList}
             setTaskList={setTAskList}
             />
          </div>

          <div>
            <h2>Suas Tarefas</h2>
            <TaskList 
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
            />

          </div>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
