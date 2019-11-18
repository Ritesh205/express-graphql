const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
require("dotenv").config();

/* Schema */

const schema = buildSchema(`
    type Query {
        emp(id: Int!): Employee
        emps(age: Int): [Employee]
    }

    type Employee {
        id: Int,
        name: String,
        age: Int,
        address: String,
        salary: Int
    }
`);

const empData = [
    {
        id: 1,
        name: 'Ritesh',
        age: 25,
        address: 'Chennai',
        salary: 50000
    },
    {
        id: 2,
        name: 'Piya',
        age: 24,
        address: 'Chennai',
        salary: 50000
    },
    {
        id: 3,
        name: 'Kshitij',
        age: 21,
        address: 'Mumbai',
        salary: 20000
    }
];

const getEmp =function(args) {
    const id = args.id;

    return empData.filter(emp => {
        return emp.id === id;
    })[0];
}

const getEmps = function(args) {
    const age = args.age;

    return empData.filter(emp => {
        return emp.age > age;
    });
}

const root = {
    emp: getEmp ,
    emps: getEmps
};

const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log(`Express-graphql now running on port ${process.env.PORT}`));