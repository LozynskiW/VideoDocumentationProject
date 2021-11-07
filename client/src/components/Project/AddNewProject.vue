<template>

  <q-page>
    <q-parallax style="width: 1600px; height: 1000px">

      <template v-slot:media>
        <img src="https://www.capstan.be/wp-content/uploads/2020/12/201223_documentation-scaled.jpg" alt="No img">
      </template>

      <template v-slot:content>
        <div class="row bg-primary" v-if="user" style="width: 100%; padding-bottom: 30px">
          <div class="col-12">
            <q-item class="bg-blue-9">
              <q-item-section avatar>
                <q-avatar size="100px">
                  <img :src="`${this.user.avatar}`" alt="no image">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label style="font-size: xx-large">{{this.user.firstName+" "+this.user.lastName}}</q-item-label>
                <q-item-label caption class="text-yellow-5">
                  {{this.user.email}}
                </q-item-label>
              </q-item-section>
            </q-item>
        </div>

        </div>

        <div class="row bg-primary" v-if="user" style="width: 100%; padding: 30px">

          <div class="col-3 q-pa-md">

            <q-item>
              <q-avatar class="q-pa-md row no-wrap items-center justify-around" size="300px" font-size="52px" color="transparent" rounded>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Noun_Project_projects_icon_1327109_cc.svg/1024px-Noun_Project_projects_icon_1327109_cc.svg.png" alt="no image">
              </q-avatar>
            </q-item>

          </div>

          <div class="col-5" style="padding-left: 20px; padding-right: 20px">

            <div class="row" style="padding: 30px; width: 100%">
              <q-input
                  outlined
                  standout="bg-blue text-white"
                  v-model="projectName"
                  label="Project name"
                  label-color="white"
                  input-style="color: white"
                  color="white"
                  lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                  style="width: 100%"
              >
              </q-input>

            </div>

            <q-separator></q-separator>

            <div class="column q-pa-md justify-around">

              <div class="row items-center content-center justify-center" style="padding: 5%">

                <q-card class="bg-primary">
                  <q-card-section>
                    <h4>Accessibility</h4>
                  </q-card-section>
                  <q-card-section>
                    <q-btn-toggle
                        v-model="this.isPublic"
                        no-caps
                        rounded
                        unelevated
                        toggle-color="secondary"
                        color="primary"
                        text-color="white"
                        :options="[
                        {label: 'Protected', value: false},
                        {label: 'Public', value: true},
                      ]"
                    />
                  </q-card-section>
                </q-card>
              </div>

              <div class="row">
                <q-btn class="bg-positive" @click="this.addNewProject()" style="width: 100%; padding: 20px">
                  Save project
                </q-btn>

              </div>
            </div>
          </div>
          <div class="col" style="max-width: 100%; max-height: 100%">
            <q-input
                outlined
                standout="bg-blue text-white"
                v-model="projectDesc"
                placeholder="Type here..."
                label="Project description"
                label-color="white"
                input-style="color: white"
                type="textarea"
                lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                style="padding: 20px">
            </q-input>
          </div>

        </div>
      </template>

    </q-parallax>
  </q-page>

</template>

<script>
import userService from "@/services/UserService";
import projectService from "@/services/ProjectService";

export default {
  name: "AddNewProject",
  data() {
    return {
      user: null,
      isPublic: false,
      projectDesc: "",
      projectName: ""

    }
  },
  async mounted() {
    this.user = await userService.getUserData();

  },
  methods: {
    async addNewProject() {
      await projectService.saveNewProject(this.projectName, this.projectDesc, this.isPublic)
      this.$router.push("/user/projects/owned")
    }
  }
}
</script>

<style scoped>

</style>