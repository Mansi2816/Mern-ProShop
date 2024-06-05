const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin:true,
    },
    {
        name: 'Mansi Soni',
        email: 'mansi@email.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin:true,
    },
    {
        name: 'Avesh Gaur',
        email: 'avesh@email.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin:true,
    }
]
module.exports = users