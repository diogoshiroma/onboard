import axios from 'axios'

export function editUser(token: string, userId: number, name: string, email: string, role: string) {
   return axios.put('https://tq-template-server-sample.herokuapp.com/users/' + userId, 
      {
        "name" : name,
        "email" : email,
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
export default editUser;