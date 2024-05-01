<template>
  <v-form
    v-if="ready"  
    v-model="valid"
    @keypress.enter="submitForm"
  >
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col
          cols="12"
          md="12"
        >
          <v-select
         
            v-model="name"
            item-title="name"
            :loading="!standby"
            :items="names"
          
            label="Name"
            hide-details
            return-object
            required
          />
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="loanAmount"
            :rules="loanAmountRules"
            label="Loan Amount"
            hide-details
            required
          />
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col
          cols="12"
          md="12"
        >
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            attach
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="loanDate"
                label="Loan Date"
                readonly
                v-bind="attrs"
                :value="loanDate ? formatDate(loanDate) : ''"
                class="center-popup"
                v-on="on"
                @click="menu = !menu"
              />
            </template>
            <v-date-picker
              v-model="loanDate"
              @input="onDateSelected"
            />
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12"
          class="text-center"
        >
          <v-btn
            color="primary"
            @click="submitForm"
          >
            Submit
          </v-btn>
          <!-- Wrapping status pop up in div class so I can add some padding -->
          <div
            v-show="submissionStatus !== null"
            class="submission-status"
          >
            <v-alert :type="submissionStatus ? 'success' : 'error'">
              {{ submissionStatus ? 'Loan has been approved!' : 'Loan submission failed. Please fill out all fields correctly.' }}
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props:{
    ready:Boolean,
    standby:Boolean,
    borrowers:{
      type:Array,
      default:()=>[]
    }

  },
  // Field Data
  data() {
    return {
      valid: false,
      submissionStatus: null,

      name: {},
      nameRules: [
        value => !!value || 'Name is required.',
        value => (value &&  value.length <= 45) || 'Name must be less than 25 characters.',
      ],

      // Should allow user to only type Loan Amount using a number then a decimal place number
      loanAmount: '',
      loanAmountRules: [
        value => !!value || 'Loan Amount is required.',
        value => /^\d+(\.\d{1,2})?$/.test(value) || 'Loan Amount must be a valid number (e.g., 100.00).',
      ],

      // Will set rules later
      loanDate: null,
      menu: false,
    };
  },
  computed:{
    names(){return this.borrowers.length > 0 ?  this.borrowers.map(e=>{return{
      name: (e.first_name+" "+ e.last_name),
      borrowerId: e.borrower_id
    }}):[{
      name:"Homer Simpson",
      borrower_id:null
    }]}},
 
  methods: {
    // Submit form function
    submitForm() {
      if (this.valid && this.name.borrower_id) {
        // Setting a timer to disappear after x amount of time
        window.dbDispatch.addLoan(this.name.borrower_id,this.loanAmount,this.loanDate).then(()=>{
           this.submissionStatus = true;

        setTimeout(() => {
          this.submissionStatus = null;
        }, 3000);
        })
        .catch((e)=>{
          console.error(e)
          this.submissionStatus = false;
        })
        
       
      } else {
        this.submissionStatus = false;
      }
    },

    formatDate(date) {
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },

  },
};
</script>

<style scoped>
.center-popup .v-text-field__slot {
  text-align: center;
}

.submission-status {
  margin-top: 10px;
}
</style>
