<template>
  <v-form v-model="valid" @keypress.enter="submitForm">
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstname"
            :counter="10"
            :rules="nameRules"
            label="First name"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="lastname"
            :counter="10"
            :rules="nameRules"
            label="Last name"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col cols="12" md="12">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn color="primary" @click="submitForm">Submit</v-btn>
          <!-- Wrapping status pop up in div class so I can add some padding -->
          <div class="submission-status" v-show="submissionStatus !== null">
            <v-alert :type="submissionStatus ? 'success' : 'error'">
              {{ submissionStatus ? 'Form submitted successfully! 🎉' : 'Form submission failed. Please ensure all fields are filled.' }}
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style>
  /* Adding some padding so pop up isn't so close to Submit button */
  .submission-status {
  margin-top: 10px;
  }
</style>

<script>
export default{
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
    }),

    // Submit form function
    methods: {
    submitForm() {
      if (this.valid) {
        // Setting a timer to disappear after x amount of time
        this.submissionStatus = true;

        setTimeout(() => {
          this.submissionStatus = null;
        }, 3000);
      } else {
        this.submissionStatus = false;
      }
    }
  }
}
</script>