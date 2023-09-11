// TaskFilter.tsx

import React, { ChangeEvent } from 'react';
import categories from '../categories'; // Import your categories array

// Define the Props interface
interface TaskFilterProps {
  onSelectCategory: (category: string) => void;
  cat: string[]; 
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onSelectCategory }) => {
  // Handle the change event when a new category is selected
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    onSelectCategory(selectedCategory);
  };

  return (
    <div>
      <label htmlFor="categoryFilter">Filter by Category:</label>
      <select
        id="categoryFilter"
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
