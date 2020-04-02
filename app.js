const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// team array, holds an array of objects that correspond to each team member. 
var team = [];
// Create a global counter that increases every time a member is created, ensuring unique employee IDs
var uniqueID = 0;


// Menu for creating an engineer. prompts user for engineer information
function createEngineer(){
    // Define questions to ask when creating an engineer
    var questions = [{
        message: "What is this Engineer's name?: ",
        name: "name"
    },
    {
        message: "What is this Engineer's email?: ",
        name: "email"
    },
    {
        message: "What is this Engineer's github username?: ",
        name: "github"
    }];

    // Call inquirer to ask questions
    return inquirer.prompt(questions).then(function({name, email, github}){
        // After done asking questions, create a new Engineer object and push it to the team array.
        team.push(new Engineer(name, uniqueID, email, github));
        // increment the uniqueID after creating a new employee
        uniqueID++;
    })
}

function createIntern(){
    // Define questions to ask when creating an Intern
    var questions = [{
        message: "What is this Intern's name?: ",
        name: "name"
    },
    {
        message: "What is this Intern's email?: ",
        name: "email"
    },
    {
        message: "What is this Intern's school?: ",
        name: "school"
    }];

    // Call inquirer to ask questions
    return inquirer.prompt(questions).then(function({name, email, school}){
        // After done asking questions, create a new Intern object and push it to the team array.
        team.push(new Intern(name, uniqueID, email, school));
        // increment the uniqueID after creating a new employee
        uniqueID++;
    })
}

function createManager(){
    // Define questions to ask when creating a Manager
    var questions = [{
        message: "What is this Manager's name?: ",
        name: "name"
    },
    {
        message: "What is this Manager's email?: ",
        name: "email"
    },
    {
        message: "What is this Manager's office number?: ",
        name: "officeNo"
    }];

    // Call inquirer to ask questions
    return inquirer.prompt(questions).then(function({name, email, officeNo}){
        // After done asking questions, create a new Manager object and push it to the team array.
        team.push(new Manager(name, uniqueID, email, officeNo));
        // increment the uniqueID after creating a new employee
        uniqueID++;
    })
}

// Function to ask the user what type of employee they'd like to add. Uses promise chaining to display questions specific to each employee type 
function addEmployee(){
    // First question, asks user what type of employee to add to the team
    inquirer.prompt({
        type: "list",
        message: `What kind of employee would you like to add to the team?`,
        choices: ["Engineer", "Intern", "Manager"],
        name: "type"
    })
    // Once the user makes a choice, redirects to a function with questions specific to that employee type
    .then(function (response) {
        // Grab the employee type from the inquirer response
        type = response.type;
        // Switch case based on what type the user chose from the list
        switch(type){
            case "Engineer":
                return createEngineer();
            case "Intern":
                return createIntern();
            case "Manager":
                return createManager();
        }
    })
    // After returning from the employee specific function, ask if the user wants to add another employee
    .then(function(){
        console.log(team);
        // promise chaining, return the result of the user choosing whether they want to enter another employee
        return inquirer.prompt({
            type: "list",
            message: "Do you want to add another employee?: ",
            choices: ["Yes", "No"],
            name: "continue"
        })
    })
    // If the user wants to enter another employee, return to the top of this function and loop through the questions again. Otherwise, return a call to the function that writes the team data to an html. 
    .then(function(answer) {
        // Grab the confirmation from the inquirer response
        let confirm = answer.continue;
        // If they do want to add another employee, call this function again and loop through the questions
        if(confirm === "Yes"){
            addEmployee();
        }
        // Otherwise, call the function to write the team data to the html file.
        else if(confirm === "No") {
            console.log("Ending. Write to file here.");
            htmlData = render(team);
            console.log(htmlData);
        }
    })
    // Error handling. Should catch errors from any of the promises in the chain.
    .catch(function(error){
        throw error;
    });
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// .then(function(html){
//     console.log("Finished writing the html file!: \n" + html);
// })


addEmployee();


