// console.log("connected")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require(`./lib/Intern`);
const inquirer = require(`inquirer`);
const path = require(`path`);
const fs = require(`fs`);

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer")

const devTeamArr = [];

function addEmployee(){
    inquirer
        .prompt([
            {
                type: `list`,
                message: `What position would you like to add?`,
                choices: [`Engineer`, `Intern`, `Co-Manager`, `Cancel`],
                name: `newRole`
            }
        ]).then(function(newEmployeeAdd){
            if (newEmployeeAdd.newRole === `Engineer`) {
                addEngineer();
            } else if (newEmployeeAdd.newRole === `Intern`) {
                addIntern();
            } else if (newEmployeeAdd.newRole === `Co-Manager`) {
                addCoManager();
            } else {
                confirmFileWrite();
            }
        })
}

function addEmployeeConfirm(){
    inquirer
        .prompt([
            {
                type: `confirm`,
                message: `Would you like to add an employee?`,
                name: `add`
            }
        ]).then(function(employeeCheck){
            if (!employeeCheck.add){
                confirmFileWrite();
            } else (
                addEmployee()
            )
        })
}

function confirmFileWrite(){
    inquirer
        .prompt([
            {
                type: `confirm`,
                message: `Are you sure you wish to cancel adding employees and proceed to creating your roster page?`,
                name: `doubleCheck`
            }
        ]).then(function(verify){
            if (verify.doubleCheck) {
                writeContactPage()
            } else {
                addEmployeeConfirm()
            }
        })
}

function addCoManager(){
    inquirer
        .prompt([
            {
                type: `input`,
                message: `What is the Co-Manager's name?`,
                name: `name`
            },
            {
                type: `input`, 
                type: `number`,
                message: `What is their id number?`,
                name: `id`
            },
            {
                type: `input`,
                message: `What is their email address?`,
                name: `email`
            },
            {
                type: `input`, 
                message: `What is their office number?`,
                name: `office`
            }
        ]).then(function(coManagerResponse){
            const coManName = coManagerResponse.name;
            const coManId = coManagerResponse.id;
            const coManEmail = coManagerResponse.email;
            const coManOffice = coManagerResponse.office;
            const coManager = new Manager(coManName, coManId, coManEmail, coManOffice);
            devTeamArr.push(coManager);
            addEmployeeConfirm()
        })
}

function addEngineer(){
    inquirer
        .prompt([
            {
                type: `input`,
                message: `What is the Engineer's name?`,
                name: `name`
            },
            {
                type: `input`, 
                type: `number`,
                message: `What is their id number?`,
                name: `id`
            },
            {
                type: `input`,
                message: `What is their email address?`,
                name: `email`
            },
            {
                type: `input`, 
                message: `What is their GitHub username?`,
                name: `github`
            }
        ]).then(function(engineerAdded){
            const engName = engineerAdded.name;
            const engId = engineerAdded.id;
            const engEmail = engineerAdded.email;
            const engGithub = engineerAdded.github;
            const engineer = new Engineer (engName, engId, engEmail, engGithub);
            devTeamArr.push(engineer);
            addEmployeeConfirm()
        })
}

function addIntern(){
    inquirer
        .prompt([
            {
                type: `input`,
                message: `What is the Intern's name?`,
                name: `name`
            },
            {
                type: `input`, 
                type: `number`,
                message: `What is their id number?`,
                name: `id`
            },
            {
                type: `input`,
                message: `What is their email address?`,
                name: `email`
            },
            {
                type: `input`, 
                message: `What school do they attend?`,
                name: `school`
            }
        ]).then(function(internAdded){
            const intName = internAdded.name;
            const intId = internAdded.id;
            const intEmail = internAdded.email;
            const intSchool = internAdded.school;
            const intern = new Intern (intName, intId, intEmail, intSchool);
            devTeamArr.push(intern);
            addEmployeeConfirm()
        })
}

function writeContactPage(){
    // console.log("I WANNA WRITE THE DAMN HTML")
    // console.log(render(devTeamArr))
    fs.writeFile(outputPath, render(devTeamArr), function(error, data){
        if (error) {
            console.log(error)
        } else {
            console.log("Successfully wrote the html file to the output folder")
        }
    })
}

inquirer
    .prompt([
        {
            type: `confirm`,
            message: `Are you a manager?`,
            name: `manager`
        }
    ]).then(function(managerCheck){
        if (!managerCheck.manager) {
            console.log("This can only be filled out by a manager. Please contact the system administrator for help.")
        } else {
            inquirer
                .prompt([
                    {
                        type: `input`,
                        message: `What is your name, Manager?`,
                        name: `name`
                    },
                    {
                        type: `input`, 
                        type: `number`,
                        message: `What is your id number?`,
                        name: `id`
                    },
                    {
                        type: `input`,
                        message: `What is your email address?`,
                        name: `email`
                    },
                    {
                        type: `input`, 
                        message: `What is your office number?`,
                        name: `office`
                    }
                ]).then(function(managerResponse){
                    const manName = managerResponse.name;
                    const manId = managerResponse.id;
                    const manEmail = managerResponse.email;
                    const manOffice = managerResponse.office;
                    const manager = new Manager(manName, manId, manEmail, manOffice);
                    devTeamArr.push(manager);
                    addEmployeeConfirm()
                })
        }
    })


    /* Write code to use inquirer to gather information about the development team members,
    and to create objects for each team member (using the correct classes as blueprints!)
    After the user has input all employees desired, call the `render` function (required 
    above) and pass in an array containing all employee objects; the `render` function will
    generate and return a block of HTML including templated divs for each employee!
    After you have your html, you're now ready to create an HTML file using the HTML
    returned from the `render` function. Now write it to a file named `team.html` in the
    `output` folder. You can use the variable `outputPath` above target this location.
    Hint: you may need to check if the `output` folder exists and create it if it
    does not.
    
    HINT: each employee type (manager, engineer, or intern) has slightly different
    information; write your code to ask different questions via inquirer depending on
    employee type.
    
    HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
    and Intern classes should all extend from a class named Employee; see the directions
    for further information. Be sure to test out each class and verify it generates an 
    object with the correct structure and methods. This structure will be crucial in order
    for the provided `render` function to work!```*/