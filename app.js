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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
        console.log(team, uniqueID);
    })
}

function addEmployee(){
    inquirer.prompt({
        type: "list",
        message: `What kind of employee would you like to add to the team?`,
        choices: ["Engineer", "Intern", "Manager"],
        name: "type"
    }).then(function (response) {
        type = response.type;
        switch(type){
            case "Engineer":
                return createEngineer();
            case "Intern":
                return createIntern();
            case "Manager":
                return createManager();
        }
    }).then(function(){
        console.log(team);
        return inquirer.prompt({
            type: "list",
            message: "Do you want to add another employee?: ",
            choices: ["Yes", "No"],
            name: "continue"
        })
    }).then(function(answer) {
        let confirm = answer.continue;
        if(confirm === "Yes"){
            addEmployee();
        }
        else if(confirm === "No") {
            console.log("Ending. Write to file here.")
        }
    });
}

addEmployee();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
