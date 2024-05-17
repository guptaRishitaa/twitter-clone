import { api } from "../../config/api";
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_FAILURE, UPDATE_PAYMENT_SUCCESS } from "./ActionType";

export const makePaymentAction=(plan)=>async(dispatch)=>{
    try {
        const {data} = await api.post(`api/plan/subscribe/${plan}`);

        if(data.paymentLink){
            window.location.href=data.paymentLink;
        }
        dispatch({type:CREATE_PAYMENT_SUCCESS, payload:data})
        console.log("data ", data)
    } catch (error) {
        console.log("catch error ", error)
        dispatch({type:CREATE_PAYMENT_FAILURE, payload:error.message})
        
    }
}


export const verifiedAccountAction=(paymentLinkId)=>async(dispatch)=>{
    try {
        const {data} = await api.get(`/api/plan/${paymentLinkId}`);
  console.log("verified account ",data)
  dispatch({type:UPDATE_PAYMENT_SUCCESS, payload:data})
        
      } catch (error) {
        console.log("catch error ",error)
        dispatch({type:UPDATE_PAYMENT_FAILURE, payload:error})
      }
  }