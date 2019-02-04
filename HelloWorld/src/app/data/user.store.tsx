import { observable, action, computed } from "mobx";
import { retrieveItem } from '../core/storage/asyncStorage';
import { Service } from 'typedi'

@Service()
class UserStore {

    token : string = ""
    @observable data = []

    constructor(){
        retrieveItem('token').then((token) => {this.token = token})
    }

    @action
    updateUsers() {
        const token = this.token;
        const url = `https://tq-template-server-sample.herokuapp.com/users?pagination={"page": 1, "window": 10}`;
        
        fetch(url,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
        }})
        .then(res => res.json())
        .then(res => this.data = res.data)
        .catch(error => console.log(error));
    }
}

export default UserStore;