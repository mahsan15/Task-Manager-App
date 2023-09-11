import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import  categories  from '../categories'; 
import { Task } from './Task';// Adjust the import path as needed



const schema = z.object({
  title: z.string().min(3).max(50),
  dueDate: z.string(),
  category: z.enum(categories), // Assuming categories is an array of valid options
});

type TaskFormData = z.infer<typeof schema>;

interface TaskFormProps {
  onSubmit: (newTask: Omit<Task, 'id'>) => void; 
  categories: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
  });
 
  const { errors } = formState;

  const onSubmitHandler: SubmitHandler<TaskFormData> = (data: TaskFormData) => {
    console.log('Form Data:', data, register); // Add this line
    onSubmit(data);
    reset();
  };


  return (
    <form>
      <div>
        <label>Title
        <input id="title" type="text" {...register('title')} />
        </label>
        
        {errors.title && typeof errors.title.message === 'string' && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>
      <div>
        <label>Due Date
        <input id="duedate" type="date" {...register('dueDate')} />
        </label>
        {errors.dueDate && typeof errors.dueDate.message === 'string' && (
          <span className="error-message">{errors.dueDate.message}</span>
        )}
      </div>
      <div>
        <label>Category
        <select id="category" {...register('category')}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        </label>
        
        {errors.category && typeof errors.category.message === 'string' && (
          <span className="error-message">{errors.category.message}</span>
        )}
      </div>
      <button onClick={handleSubmit(onSubmitHandler)} type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;