import API from "./webapi.services.js"
import { INQUILINOS_URL } from "./urls.js"

export const getInquilinos = async () => {
    try{
      return await API.get(`${INQUILINOS_URL}/api/Inquilinos/all`).then( 
        response => {
            console.log(response.data)
          return response.data;
        },
        error =>{
          console.log('Server responded with status code:', error.response.status);
          console.log('Response data:', error.response.data);
          return  null;
        }
      );
    }catch(error){
      console.log(error);
      return null;
    }
}