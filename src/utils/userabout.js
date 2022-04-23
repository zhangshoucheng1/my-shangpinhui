import { v4 as uuidv4 } from 'uuid';

export function getuserTempId(){
  let userTempId = localStorage.getItem('USERTEMPID_KEY')//如果有直接返回去使用
   if(!userTempId){
    userTempId = uuidv4();
    localStorage.setItem('USERTEMPID_KEY',userTempId)
   }
     return userTempId
}