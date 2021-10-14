<template>

  <div class="q-pa-md">

      <q-card class="my-card" style="max-width: 400px">

        <q-card-section class="bg-primary text-white q-pa-md row no-wrap items-center justify-around">
          <q-avatar size="200px" font-size="120px" color="brown-4" text-color="white" icon="verified_user" />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form
              @submit="onSubmit"
              @reset="onReset"
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
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>

      </q-card>

  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      password: "",
      email: ""
    }
  },
}

</script>

<style scoped>

</style>