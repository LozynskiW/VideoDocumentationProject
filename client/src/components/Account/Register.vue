<template>

  <div class="q-pa-md no-wrap items-center justify-around">

    <q-card style="max-width: 400px">
      <q-card-section class="bg-teal text-white q-pa-md row no-wrap items-center justify-around">
        <q-avatar size="200px" font-size="120px" color="teal" text-color="white" icon="person_add" />
      </q-card-section>

      <q-card-section>
        <q-form
            class="q-gutter-md"
            action="/api/register"
            method="POST"
        >
          <q-input
              filled
              name="firstName"
              v-model="firstName"
              placeholder="Your name"
              label="Your name *"
              hint="your first name"
              lazy-rules="true"
              :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
          />

          <q-input
              filled
              name="lastName"
              v-model="lastName"
              placeholder="Your last name"
              label="Your last name *"
              hint="Surname"
              lazy-rules="true"
              :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
          />

          <q-input
              filled
              name="password"
              v-model="password"
              placeholder="Min 8 characters"
              label="Password *"
              hint="The longer the better, min 8 characters"
              lazy-rules="true"
              :rules="[ val => val && val.length >= 8 || 'Not less than 8 characters']"
          />

          <q-input
              filled
              type="email"
              name="email"
              v-model="email"
              placeholder="Email bound to your account"
              label="Email *"
              lazy-rules="true"
              :rules="[ val => val && val.length > 0 || 'Pool can not be blank',
              val => val.includes('@') || 'Must be email']"
          />

          <div>
            <q-btn label="Register" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>

    </q-card>

  </div>
</template>

<script>
export default {
  name: "Register",
  data () {
    return {
      firstName: "",
      lastName: "",
      password: "",
      email: ""
    }
  },
}

</script>

<style scoped>
</style>