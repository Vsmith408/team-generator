const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const OUTPUT_DIR = path.resolve(__dirname, 'output')
const outputPath = path.join(OUTPUT_DIR, 'team.html')

const render = require('./lib/htmlRenderer')

let team = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function employeePosition() {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'What is the position of team member would you like to add?',
        name: 'name',
        choices: ['Manager', 'Engineer', 'Intern', 'None'],
      },
    ])
    .then((val) => {
      if (val.name === 'Manager') {
        managerPos()
      } else if (val.name === 'Engineer') {
        engineerPos()
      } else if (val.name === 'Intern') {
        internPos()
      } else if (val.name === 'None') {
        console.log(team)
        fs.writeFile(outputPath, render(team), function (err) {
          if (err) {
            return console.log(err)
          }
          console.log('Team list created!')
        })
      }
    })
}

function managerPos() {
  return inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the managers's name?",
        name: 'name',
      },
      {
        type: 'input',
        message: "What is the managers's ID?",
        name: 'id',
      },
      {
        type: 'input',
        message: "What is the manager's email?",
        name: 'email',
      },
      {
        type: 'input',
        message: "What is the manager's office number",
        name: 'number',
      },
    ])
    .then(function (response) {
      team.push(
        new Manager(response.name, response.id, response.email, response.number)
      )
      employeePosition()
    })
}

function engineerPos() {
  return inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the engineer's name?",
        name: 'name',
      },
      {
        type: 'input',
        message: "What is the engineer's ID?",
        name: 'id',
      },
      {
        type: 'input',
        message: "What is the engineer's email?",
        name: 'email',
      },
      {
        type: 'input',
        message: "What is the engineer's Github username?",
        name: 'Github',
      },
    ])
    .then(function (response) {
      team.push(
        new Engineer(
          response.name,
          response.id,
          response.email,
          response.Github
        )
      )
      employeePosition()
    })
}

function internPos() {
  return inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the intern's name?",
        name: 'name',
      },
      {
        type: 'input',
        message: "What is the intern's ID?",
        name: 'id',
      },
      {
        type: 'input',
        message: "What is the intern's email?",
        name: 'email',
      },
      {
        type: 'input',
        message: "What is the intern's school?",
        name: 'school',
      },
    ])
    .then(function (response) {
      team.push(
        new Intern(response.name, response.id, response.email, response.school)
      )
      employeePosition()
    })
}

employeePosition()

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
// for the provided `render` function to work! ```
