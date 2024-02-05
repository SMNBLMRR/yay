function organizeTasksIntoHierarchy(tasks:any) {
  const taskMap = new Map();

  // Create a map with task ID as key and task object as value
  tasks.forEach((task:any) => {
    task.subTasks = []; // Initialize an empty array for subtasks
    taskMap.set(task.id, task);
  });

  // Iterate over tasks to build the hierarchy
  tasks.forEach((task:any) => {
    const parentId = task.parentTaskId;
    
    if (parentId && taskMap.has(parentId)) {
      // If the task has a parent, add it to the parent's subTasks array
      taskMap.get(parentId).subTasks.push(task);
    }
  });

  // Find and return the root tasks (tasks without a parent)
  return tasks.filter((task:any) => !task.parentTaskId);
}