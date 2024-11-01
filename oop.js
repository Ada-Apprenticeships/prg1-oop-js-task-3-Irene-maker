PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

function validInteger (value) { // value can be a string or a number (integer)
  
  const numberValue = Number(value);
  return Number.isInteger(numberValue) && numberValue >= 0 && String(numberValue) === String(value);
 
}
 

function validatePriority(priority) {
  const validPriority = Object.values(PRIORITY); // Only valid values
  const numPriority = parseInt(priority, 10);

  return validPriority.includes(numPriority) ? numPriority : PRIORITY["LOW"];
}


function todaysDate () {
  const now = new Date();
 
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


class Task  {
   
    #added;
    #title;
    #priority;
  
    constructor(title, priority) {
      this.#added = todaysDate();
      this.#title = title;
      this.#priority = validatePriority(priority); 
    }
  
    get added() {
      return this.#added;
    }
  
    get title() {
      return this.#title;
    }
  
    get priority() {
      return this.#priority;
    }

    set priority(priority) {
      this.#priority = validatePriority(priority);
    }
}


class ToDo extends Task {
  constructor() {
    super('ToDo List', 1);
    this.tasks = []; // empty array for storing Task instances
  }

  add(task) {
    if (!(task instanceof Task)) {
      throw new Error("Argument must be an instance of Task.");
    }
    this.tasks.push(task);
    return this.tasks.length;
  }

  remove(title) {
    const index = this.tasks.findIndex((task) => task.title === title);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  list(priority = 0) {
    if (priority === 0) {
      return this.tasks.map((task) => [task.added, task.title, task.priority]);
    } else {
      // Return only tasks that match the given priority
      return this.tasks
        .filter((task) => task.priority === priority)
        .map((task) => [task.added, task.title, task.priority]);
    }
  }

  task(title) {
    const task = this.tasks.find((task) => task.title === title);
    if (!task) {
      throw new Error(`Task '${title}' Not Found`);
    }
    return task;
  }
}


// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}