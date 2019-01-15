import axios from 'axios'

export function getUserById(token: string, userId: number) {

   return axios.get('https://tq-template-server-sample.herokuapp.com/users/' + userId, 
      {
         headers : {
            "Content-type" : 'application/json',
            "Authorization" : token
         }
      }
   )
}
export default getUserById;