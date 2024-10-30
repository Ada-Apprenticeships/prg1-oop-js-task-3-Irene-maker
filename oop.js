PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

function validInteger (value) { // value can be a string or a number (integer)
  
  const numberValue = Number(value);
  return Number.isInteger(numberValue) && numberValue >= 0 && String(numberValue) === String(value);
 
}
 

function validatePriority(priority) {
  const validPriority = Object.values(PRIORITY); // Only valid values
  const numPriority = parseInt(priority, 10);

  // Return validated priority, default to LOW if invalid
  return validPriority.includes(numPriority) ? numPriority : PRIORITY["LOW"];
}


function todaysDate () {
  const now = new Date();

  // Extract date components
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = now.getFullYear();

  // Extract time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Format the date and time
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


class Task  {
    // Private fields
    _added;
    _title;
    _priority;
  
    constructor(title, priority) {
      this._added = todaysDate(); // Automatically set the 'added' attribute
      this._title = title;
      this._priority = validatePriority(priority); // Use the validation function
    }
  
    // Getters for accessing private properties
    get added() {
      return this._added;
    }
  
    get title() {
      return this._title;
    }
  
    get priority() {
      return this._priority;
    }

    set priority(priority) {
      this._priority = validatePriority(priority);
    }
}





class ToDo extends Task {
  constructor() {
    super('ToDo List', 1);
    this.tasks = []; // Initialize an empty array for storing Task instances
  }

  // Method to add a Task to the tasks array and return the new total count of tasks
  add(task) {
    if (!(task instanceof Task)) {
      throw new Error("Argument must be an instance of Task.");
    }
    this.tasks.push(task);
    return this.tasks.length;
  }

  // Method to remove a Task by its title and return true if successful, false otherwise
  remove(title) {
    const index = this.tasks.findIndex((task) => task._title === title);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  // Method to list tasks, optionally filtered by priority
  list(priority = 0) {
    if (priority === 0) {
      // Return all tasks in the specified format
      return this.tasks.map((task) => [task._added, task._title, task._priority]);
    } else {
      // Return only tasks that match the given priority
      return this.tasks
        .filter((task) => task._priority === priority)
        .map((task) => [task._added, task._title, task._priority]);
    }
  }

  // Method to retrieve a specific Task by title, throws an error if not found
  task(title) {
    const task = this.tasks.find((task) => task._title === title);
    if (!task) {
      throw new Error(`Task '${title}' Not Found`);
    }
    return task;
  }
}



// taskList = new ToDo () // Creates an instance of ToDo named taskList
// taskList.add (Task( 'Get Cappuccino', PRIORITY [ 'HIGH' ]) )  
// taskList.add (Task( 'Complete Project Sprint', PRIORITY [ 'MEDIUM' ]) )  












// // Example usage:
// try {
//   // Create ToDo instance
//   const todo = new ToDo();

//   // Create and add Task instances
//   const task1 = new Task("Buy groceries", 3);
//   const task2 = new Task("Finish project", 7);
//   todo.add(task1);
//   todo.add(task2);

//   // List all tasks
//   console.log("All tasks:", todo.list());

//   // List tasks with priority 7
//   console.log("Tasks with priority 7:", todo.list(7));

//   // Access a specific task by title and modify its priority
//   const taskToModify = todo.task("Buy groceries");
//   taskToModify.priority = 5; // Modify directly via reference

//   // Remove a task by title
//   const removed = todo.remove("Finish project");
//   console.log("Task removed:", removed);

// } catch (error) {
//   console.error(error.message);
// }




// console.log(validInteger( '10' )) // returns True
// console.log(validInteger ( 10 )) // returns True 
// console.log(validInteger ( '-10' )) // returns False
// console.log(validInteger ( -10 )) // returns False
// console.log(validInteger ( 0 )) // returns False
// console.log(validInteger ( 10.0 )) // returns False
// console.log(validInteger ( -10.0 )) // returns False
// console.log(validatePriority ( 0 )) // returns 1
// console.log(validatePriority ( 1 )) // returns 1
// console.log(validatePriority ( 'A' )) // returns 1
// console.log(validatePriority ( '7' )) // returns 7
// console.log(validatePriority ( '10' )) // returns 1
// console.log(todaysDate())



// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}