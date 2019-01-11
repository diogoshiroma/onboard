import axios from 'axios'

export function authentication(email : string, password : string) {

   return axios.post('https://tq-template-server-sample.herokuapp.com/authenticate', 
      {
         "email" : email,
         "password" : password,
         "rememberMe" : false
      },
      {
         headers : {
            "Content-type" : 'application/json'
         }
      }
   )
}
export default authentication;