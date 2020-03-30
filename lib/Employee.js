// code to define and export the Employee class
class Employee {
    // Constructor takes in 3 parameters and assigns name, id, and email.
    constructor(name, id, email) {
        // Set the value of name, id, and email properties
        this.name = name;
        this.id = id;
        this.email = email;

        // Function to get the employee's name
        this.getName = function () {
            return this.name;
        };

        //    Function to get the employee's id
        this.getId = function () {
            return this.id;
        };

        //    Function to get the employee's email
        this.getEmail = function () {
            return this.email;
        };

        //    Function to get the employee's role. For base class, just returns "Employee"
        this.getRole = function () {
            return "Employee";
        };
    }

}

module.exports = Employee;