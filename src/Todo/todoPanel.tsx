import { useState } from 'react';
import TaskList from './taskList';

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  status: string;
}

const TodoPanel: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDueDate, setTaskDueDate] = useState<string>('');

  const addTask = () => {
    if (!taskName || !taskDueDate) {
      return;
    }
    const newTask: Task = {
      id: tasks.length + 1,
      name: taskName,
      description: taskDescription,
      dueDate: new Date(taskDueDate),
      status: 'outstanding',
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDescription('');
    setTaskDueDate('');
  };

  return (
    <div className='container mx-auto my-10 p-4 max-w-2xl'>
      <h1 className='text-2xl font-bold mb-4'>
        To Do
        <span className='text-gray-500 ml-2'>{tasks.length}</span>
      </h1>
      <div className='flex'>
        <div className='flex flex-col w-full'>
          <div className='flex mb-4 text-sm'>
            <input
              type="text"
              className='border p-3 mr-2 w-full border-solid border-gray-200 rounded-lg focus-visible:outline-0'
              value={taskName}
              placeholder='Task Name*'
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="date"
              className='border p-3 mr-2 overflow-visible border-solid border-gray-200 rounded-lg focus-visible:outline-0'
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />
          </div>
          <textarea
            rows={5}
            className='flex border p-3 mb-4 w-full text-sm border-solid border-gray-200 rounded-lg focus-visible:outline-0'
            value={taskDescription}
            placeholder='Description (optional)'
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <button
          className='flex h-fit w-fit text-white px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-800 duration-300 text-nowrap'
          onClick={addTask}
        >
          <svg className='flex mr-2 mt-1.5' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1.16666V12.8333M1.16666 6.99999H12.8333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className='flex select-none'>Add</span>
        </button>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  )
}

export default TodoPanel;
