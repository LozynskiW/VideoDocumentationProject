<template>

  <div class="q-pa-md">

      <q-card class="my-card" style="max-width: 400px">

        <q-card-section class="bg-teal text-white q-pa-md row no-wrap items-center justify-around">
          <q-avatar size="200px" font-size="120px" color="teal" text-color="white" icon="verified_user" />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form
              class="q-gutter-md"
              action="/api/login"
              method="POST"

          >
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

            <div>
              <q-btn label="Login" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>

      </q-card>

  </div>
</template>

<script>
import userService from "@/services/UserService";

export default {
  name: "Login",
  data () {
    return {
      password: "",
      email: ""
    }
  },

  methods: {
    async login() {
      let user = null
      try {
        user = userService.login(this.email, this.password)
      }
      catch (err) {
        console.log(err)
      }
      //user = userService.getUserData()
      if (user !== null) {
        console.log(user)
        user = JSON.parse(JSON.stringify(user))
        sessionStorage.setItem('userId', user._id);
      }
    }
  }
}

</script>

<style scoped>

</style>