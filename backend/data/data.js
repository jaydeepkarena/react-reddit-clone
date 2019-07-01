const uuid = require('uuid/v4');
const id1 = uuid();
const id2 = uuid();
const users= {
  [id1]: {
    name: 'jaydeep karena',
    username:'jaydeep-karena',
    email: 'jaydeep7karena7@gmail.com',
    password:'123456',
    avatar:'',
    dateofjoin: new Date(),
    veryfied: true,
    active: true,
    id: id1
  },
  [id2]: {
    name: 'parul karena',
    username:'parul-karena',
    email: 'paruljay7@gmail.com',
    password:'123456',
    avatar:'',
    dateofjoin: new Date(),
    veryfied: false,
    active: false,
    id: id2
  },
}

module.exports = users;
