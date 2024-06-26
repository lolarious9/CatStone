import Home from "./views/HomePage.vue"
import CreateLoan from "./views/CreateLoan.vue"
import RecordViewing from "./views/RecordViewing.vue"
import PaymentEntry from "./views/PaymentEntry.vue"
import CreateBorrower from "./views/CreateBorrower.vue"
export default{
    "HomePage":{ 
        sfc: Home,
        title:"Home Page"
    },
   "CreateLoan":{
        sfc:CreateLoan,
        title:"Create Loan"  
    },
    "RecordViewing":{
        sfc:RecordViewing,
        title:"Record Viewing"
    },
    "PaymentEntry":{
        sfc:PaymentEntry,
        title:"Payment Entry"  
    },
     "CreateBorrower":{
        sfc:CreateBorrower,
        title:"Create Borrower"  
    }
}