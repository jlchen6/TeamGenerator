//code to define and export the Manager class.  It inherits properties and methods from the Employee class
var Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNo) {

        // call super constructor to assign the values of name, id, and email
        super(name, id, email);

        // The Manager class has the additional "office number" property
        this.officeNo = officeNo;

        // Override the getRole() function to instead return "Manager"
        this.getRole = function () {
            return "Manager";
        }

    }

}

module.exports = Manager;