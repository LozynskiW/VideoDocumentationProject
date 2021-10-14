<template>

  <q-page>
    <q-parallax style="width: 1600px; height: 1000px">

      <template v-slot:media>
        <img src="https://www.capstan.be/wp-content/uploads/2020/12/201223_documentation-scaled.jpg" alt="No img">
      </template>

      <template v-slot:content>
        <div class="row bg-blue-grey-3" v-if="user" style="width: 100%; padding: 30px">

          <div class="col-3 q-pa-md">
            <q-card dark bordered class="bg-grey-9">

              <q-item-label class="text-yellow-5" style="padding: 10px; position: absolute; bottom: 1px;right: 0">
                OWNER
              </q-item-label>

              <q-card-section horizontal style="padding: 20px">
                <q-avatar rounded>
                  <img :src="`${this.user.avatar}`" alt="no image">
                </q-avatar>
                <q-item>
                  {{this.user.firstName+" "+this.user.lastName}}
                  {{this.user.email}}
                </q-item>
              </q-card-section>

            </q-card>

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
                  v-model="projectName"
                  label="Project name"
                  label-color="white"
                  bg-color="teal"
                  color="white"
                  lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                  style="width: 100%"
              >
              </q-input>

            </div>

            <q-separator></q-separator>

            <div class="column q-pa-md justify-around">

              <div class="row">

                <q-item>
                  <q-item-section>
                    <q-radio v-model="isPublic" val="true"></q-radio>
                  </q-item-section>

                  <q-item-section avatar style="padding: 20px">
                    <q-icon name="share" />
                  </q-item-section>

                  <q-item-section>Public project</q-item-section>
                </q-item>

                <q-item>
                  <q-item>
                    <q-item-section>
                      <q-radio id="isNotPublicRadio" v-model="isPublic" val="false"></q-radio>
                    </q-item-section>

                    <q-item-section avatar style="padding: 20px">
                      <q-icon name="verified_user" />
                    </q-item-section>

                    <q-item-section>Protected project</q-item-section>
                  </q-item>
                </q-item>
                <q-btn class="bg-positive" @click="this.addNewProject()" style="width: 100%; padding: 20px">
                  Save project
                </q-btn>

              </div>
            </div>
          </div>
          <div class="col" style="max-width: 100%; max-height: 100%">
            <q-input
                filled
                standout="bg-teal-4 text-white"
                v-model="projectDesc"
                placeholder="Type here..."
                label="Project description"
                label-color="white"
                bg-color="teal"
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
    addNewProject() {
      projectService.saveNewProject(this.projectName, this.projectDesc, this.isPublic)
      this.$router.push("/user/projects/owned")
    }
  }
}
</script>

<style scoped>

</style>