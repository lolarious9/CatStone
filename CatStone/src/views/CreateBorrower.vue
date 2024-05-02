<template>
  <h1>Add a Borrower</h1>
  <v-form
    v-model="valid"
    @keypress.enter="submitForm"
  >
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="firstname"
            :counter="10"
            :rules="nameRules"
            label="First name"
            hide-details
            required
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="lastname"
            :counter="10"
            :rules="nameRules"
            label="Last name"
            hide-details
            required
          />
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            hide-details
            required
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="phone"
            v-mask="'(###) ###-####'"
            :rules="phoneRules"
            label="Phone"
            hide-details
            required
            @input="formatPhoneNumber"
          />
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="dob"
            :rules="dobRules"
            label="Date of Birth"
            hide-details
            required
            @input="restrictDOBInput"
          />
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="streetAddress"
            :rules="streetAddressRules"
            label="Street Address"
            hide-details
            required
          />
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
              {{ submissionStatus ? 'Form submitted successfully! 🎉' : 'Form submission failed. Please fill out all fields correctly.' }}
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import VueMaskPlugin from 'v-mask';

export default{
  plugins: [VueMaskPlugin],
  props:{
    ready:Boolean,
    standby:Boolean,
    borrowers:{
      type:Array,
      default:()=>[]
    }

  },
  // Field Data - First Name, Last Name, Email, etc.
  data: () => ({
      valid: false,
      submissionStatus: null,

      firstname: '',
      lastname: '',
      nameRules: [
        value => {
          if (value) return true

          return 'Name is required.'
        },
        value => {
          if (value?.length <= 25) return true

          return 'Name must be less than 25 characters.'
        },
      ],

      email: '',
      emailRules: [
        value => {
          if (value) return true

          return 'E-mail is requred.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ],

      phone: '',
      phoneRules: [
        value => {
          if (!value) return 'Phone number is required.';
          const formattedPhone = value.replace(/\D/g, '');
          if (formattedPhone.length !== 10) return 'Phone number must be 10 digits long.';

          return true;
        },
      ],

      dob: '',
      dobRules: [
        value => {
          const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
          if (value && value.match(dateFormat)) {
            return true;
          }
          return 'Date of Birth must be in the format mm/dd/yyyy';
        },
      ],

      streetAddress: '',
      streetAddressRules: [
        value => {
          if (!value) return 'Street address is required.';
          
          const regex = /^\d+\s[A-Za-z\s]+$/;
          if (!regex.test(value)) return 'Please enter a valid street address (e.g., 123 Main St).';
          return true;
        },
      ],
    }),

    methods: {
    // Submit form function
    submitForm() {
   
      if (this.valid ) {
        console.log(this.firstname)
        // Setting a timer to disappear after x amount of time
        window.dbDispatch.addBorrower({firstName:this.firstname,lastName:this.lastname,email:this.email,phone:this.phone.replace(/\D+/gi,""),address:this.streetAddress}).then(()=>{
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

    // Phone number function
    formatPhoneNumber() {
      // Remove all non-numeric characters from phone number
      let formattedPhone = this.phone.replace(/\D/g, '');

      // Check if the phone number length exceeds 10 characters
      if (formattedPhone.length > 10) {
        // If it exceeds 10 characters, trim it to 10 characters
        formattedPhone = formattedPhone.slice(0, 10);
      }

      // Formatting phone number as (XXX) XXX-XXXX
      this.phone = formattedPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },

      // Formats the DOB, restricts user to not input more characters than needed
      restrictDOBInput() {
      let cleanedInput = this.dob.replace(/\D/g, '');
      cleanedInput = cleanedInput.slice(0, 8);
      this.dob = cleanedInput.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    },
  },
}
</script>

<style>
  /* Adding some padding so pop up isn't so close to Submit button */
  .submission-status {
  margin-top: 10px;
  }
</style>