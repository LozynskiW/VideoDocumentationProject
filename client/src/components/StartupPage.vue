<template>
  <div class="q-pa-md q-gutter-md">
    <div class="row justify-between">

      <q-img
          src="https://media.wired.com/photos/5a723fcbf838923d23e1b4ff/16:9/w_2400,h_1350,c_limit/archives-488979131-%5BConverted%5D.jpg"
          img-class="background-img"
      >
        <div class="absolute-full text-subtitle2 flex flex-center" style="font-size: 100px">
          Video Documentation Archive
        </div>
      </q-img>

    </div>


    <div>
      <div class="row">
        <div class="col">
          <q-card class="my-card bg-primary text-white">
            <q-card-section>
              <div class="text-h4 text-center">Create project</div>
            </q-card-section>

            <q-card-section class="text-center">
               <i class="material-icons" style="font-size: 300px">create_new_folder</i>
            </q-card-section>

          </q-card>
        </div>
        <div class="col">
          <q-card class="my-card bg-primary text-white">
            <q-card-section>
              <div class="text-h4 text-center">Add documentation</div>
            </q-card-section>

            <q-card-section class="text-center">
              <i class="material-icons" style="font-size: 300px">content_copy</i>
            </q-card-section>

          </q-card>
        </div>
        <div class="col">
          <q-card class="my-card bg-primary text-white">
            <q-card-section>
              <div class="text-h4 text-center">Upload videos and documents</div>
            </q-card-section>

            <q-card-section class="text-center">
              <i class="material-icons" style="font-size: 300px">cloud_upload</i>
            </q-card-section>

          </q-card>
        </div>

      </div>

      <div class="row">

        <div class="col">
          <q-card class="my-card bg-positive text-white">
            <q-card-section>
              <div class="text-h4 text-center">Share project documentation with other users</div>
            </q-card-section>

            <q-card-section class="text-center">
              <i class="material-icons" style="font-size: 300px">share</i>
            </q-card-section>

          </q-card>
        </div>

        <div class="col">
          <q-card class="my-card bg-positive text-white">
            <q-card-section>
              <div class="text-h4 text-center">Get feedback from business partners</div>
            </q-card-section>

            <q-card-section class="text-center">
              <i class="material-icons" style="font-size: 300px">forum</i>
            </q-card-section>

          </q-card>
        </div>

        <div class="col">
          <q-card class="my-card bg-positive text-white">
            <q-card-section>
              <div class="text-h4 text-center">Store projects with documentation</div>
            </q-card-section>

            <q-card-section class="text-center">
              <i class="material-icons" style="font-size: 300px">list</i>
            </q-card-section>

          </q-card>
        </div>

      </div>

    </div>
  </div>
</template>

<style lang="sass">
  .background-img
    filter: blur(5px)
</style>

<script>
import userService from "@/services/UserService";
export default {
  name: 'StartupPage',
  data () {
    return {
      message: "",
      user: undefined
    }
  },
  mounted() {

    if (this.$route.query.m) {
      this.message = this.$route.query.m
      alert(this.$route.query.m)
    }

    this.user = this.getUserData()

  },
  methods: {
    getUserData() {
      return userService.getUserData();
    }
  }

}
</script>
