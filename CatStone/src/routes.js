import Home from "./views/HomePage.vue"
import CreateLoan from "./views/CreateLoan.vue"
import RecordViewing from "./views/RecordViewing.vue"
import PaymentEntry from "./views/PaymentEntry.vue"
import CreateBorrower from "./views/CreateBorrower.vue"
export default{
    "HomePage":{ 
        sfc: Home,
        title:"HomePage"
    },
   "CreateLoan":{
        sfc:CreateLoan,
        title:"CreateLoan"  
    },
    "RecordViewing":{
        sfc:RecordViewing,
        title:"RecordViewing"
    },
    "PaymentEntry":{
        sfc:PaymentEntry,
        title:"PaymentEntry"  
    },
     "CreateBorrower":{
        sfc:CreateBorrower,
        title:"Create Borrower"  
    }
}