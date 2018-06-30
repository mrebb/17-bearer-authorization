import { promises } from "fs";

'use strict';

export default {

  authenticate: (auth) => {
    if ( (!!auth.username && !!auth.password) ) {
      return Promise.resolve({
        generateToken: () => {return 'token!';},
      });
    }
    else {
      return Promise.resolve(null);
    }
  },

};
// export default class User{

//   constructor(data){
//     this.username = data.username;
//     this.password = data.password;
//   }
//   save(){
//     return new promises()
//   }
// }
