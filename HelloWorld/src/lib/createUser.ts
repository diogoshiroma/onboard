import axios from 'axios'

export function createUser(token: string, name : string, email: string, password : string, role: string) {
   return axios.post('https://tq-template-server-sample.herokuapp.com/users', 
      {
        "name" : name,
        "email" : email,
        "password" : password,
        "role" : role,
      },
      {
         headers : {
            "Content-type" : 'application/json',
            "Authorization" : token
         }
      }
   )
}
export default createUser;