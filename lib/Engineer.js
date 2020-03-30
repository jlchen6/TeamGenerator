//code to define and export the Engineer class.  It inherits properties and methods from the Employee class
var Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, github){

        // call super constructor to assign the values of name, id, and email
        super(name, id, email);

        // The Engineer class has the additional "github" property, along with a function to retrieve that value.
        this.github = github;

        this.getGithub = function(){
            return this.github;
        }

        // Override the getRole() function to instead return "Engineer"
        this.getRole = function(){
            return "Engineer";
        }

    }

}

module.exports = Engineer;