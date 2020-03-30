//code to define and export the Intern class.  It inherits properties and methods from the Employee class
var Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {

        // call super constructor to assign the values of name, id, and email
        super(name, id, email);

        // The Intern class has the additional "school" property, along with a function to retrieve that value.
        this.school = school;

        this.getSchool = function () {
            return this.school;
        }

        // Override the getRole() function to instead return "Intern"
        this.getRole = function () {
            return "Intern";
        }

    }

}

module.exports = Intern;