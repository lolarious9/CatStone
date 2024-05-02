import Home from "./views/HomePage.vue"
import CreateLoan from "./views/CreateLoan.vue"
import PaymentEntry from "./views/PaymentEntry.vue"
export default{
    "HomePage":{ 
        sfc: Home,
        title:"HomePage"
       
    },
   "CreateLoan":{
        sfc:CreateLoan,
        title:"CreateLoan"  
    }, 
    "PaymentEntry":{
        sfc:PaymentEntry,
        title:"PaymentEntry"  
    }
}