import { useEffect, useState } from "react";
import { format, isBefore } from 'date-fns';
import { Task } from "./todoPanel";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [overdueCount, setOverdueCount] = useState<number>(0);
  const [outstandingCount, setOutstandingCount] = useState<number>(0);
  const [completeCount, setCompleteCount] = useState<number>(0);

  useEffect(() => {
    let updated = false;
    const updatedTasks = tasks.map(task => {
      if (task.status !== 'complete' && isBefore(task.dueDate, new Date())) {
        if (task.status !== 'overdue') updated = true;
        return { ...task, status: 'overdue' };
      }
      return task;
    });
    if (updated) {
      setTasks(updatedTasks);
    }

    const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
    const outstandingTasks = tasks.filter(task => task.status === 'outstanding').length;
    const completeTasks = tasks.filter(task => task.status === 'complete').length;

    setOverdueCount(overdueTasks);
    setOutstandingCount(outstandingTasks);
    setCompleteCount(completeTasks);
  }, [tasks]);

  const updateTaskStatus = (id: number, status: Task['status']) => {
    const taskCopy = tasks.map(task => task.id === id ? { ...task, status } : task);
    setTasks(taskCopy);
  }

  return (
    <div>
      {['overdue', 'outstanding', 'complete'].map((status) => {
        return (
          <div key={status} className="mt-5">
            <h2 className="text-xl font-semibold mb-2 capitalize">
              {status}
              <span className="text-xl text-gray-500 ml-2">
                {
                  status == 'overdue' ? overdueCount
                  : ( status == 'outstanding' ? outstandingCount : completeCount )
                }
              </span>
            </h2>
            <div className="flex ml-3 text-gray-500 select-none">
              { (status == 'overdue' && !overdueCount) ? 'No task is overdue.' : '' }
              { (status == 'outstanding' && !outstandingCount) ? 'No task is outstanding.' : '' }
              { (status == 'complete' && !completeCount) ? 'No task is completed.' : '' }
            </div>
            {tasks.filter(task => task.status === status).map(task => (
              <div key={task.id} className="flex justify-between mb-2 p-2">
                <input
                  type="checkbox"
                  className="h-fit mr-2 mt-2 cursor-pointer"
                  checked={task.status === 'complete'}
                  onChange={() => updateTaskStatus(task.id, task.status === 'complete' ? 'outstanding' : 'complete')}
                />
                <div className="flex items-center w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex font-semibold">{task.name}</div>
                    <div className="flex text-gray-500">{task.description}</div>
                  </div>
                  <div
                    className={`${status == 'overdue' ? 'text-red-500' : 'text-gray-500'} text-nowrap`}
                  >
                    {format(task.dueDate, 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  )
}

export default TaskList;
