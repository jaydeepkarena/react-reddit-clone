import { sentLoginRequest, loginSuccessfull, loginError } from '../actions';

fetch('http://localhost:5000/auth/login', {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'application/json' },
  body: { email: 'jaydeep7karena7@gmail.com', password: '12345' }
}).then(d => console.log('d =>', d));

export default userLogin;
