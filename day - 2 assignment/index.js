const fs = require('fs');
const path = require('path');
const readline = require('readline');

// File path to store tasks
const filePath = path.join(__dirname, 'tasks.txt');

// Set up readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display options
const displayMenu = () => {
    console.log("\nTask Manager");
    console.log("1. Add a new task");
    console.log("2. View list of tasks");
    console.log("3. Mark a task as complete");
    console.log("4. Remove a task");
    console.log("5. Exit");
    rl.question("\nChoose an option: ", handleMenuSelection);
};

// Function to handle menu selection
const handleMenuSelection = (option) => {
    switch (option) {
        case '1':
            addTask();
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            markTaskAsComplete();
            break;
        case '4':
            removeTask();
            break;
        case '5':
            rl.close();
            break;
        default:
            console.log("Invalid option, please choose again.");
            displayMenu();
            break;
    }
};

// Function to add a new task
const addTask = () => {
    rl.question("Enter the new task: ", (task) => {
        if (task) {
            fs.appendFile(filePath, task + '\n', (err) => {
                if (err) throw err;
                console.log("Task added successfully!");
                displayMenu();
            });
        } else {
            console.log("Task cannot be empty.");
            displayMenu();
        }
    });
};

// Function to view all tasks
const viewTasks = () => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.split('\n').filter(task => task.trim());
        if (tasks.length === 0) {
            console.log("No tasks found.");
        } else {
            console.log("\nTasks:");
            tasks.forEach((task, index) => {
                console.log(`${index + 1}. ${task}`);
            });
        }
        displayMenu();
    });
};

// Function to mark a task as complete
const markTaskAsComplete = () => {
    viewTasks();
    rl.question("\nEnter the task number to mark as complete: ", (num) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            let tasks = data.split('\n').filter(task => task.trim());
            if (num > 0 && num <= tasks.length) {
                tasks[num - 1] += " (completed)";
                fs.writeFile(filePath, tasks.join('\n'), (err) => {
                    if (err) throw err;
                    console.log("Task marked as complete!");
                });
            } else {
                console.log("Invalid task number.");
            }
            displayMenu();
        });
    });
};

// Function to remove a task
const removeTask = () => {
    viewTasks();
    rl.question("\nEnter the task number to remove: ", (num) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            let tasks = data.split('\n').filter(task => task.trim());
            if (num > 0 && num <= tasks.length) {
                tasks.splice(num - 1, 1);
                fs.writeFile(filePath, tasks.join('\n'), (err) => {
                    if (err) throw err;
                    console.log("Task removed successfully!");
                });
            } else {
                console.log("Invalid task number.");
            }
            displayMenu();
        });
    });
};

// Start the task manager
displayMenu();
