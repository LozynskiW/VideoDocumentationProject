<template>
  <div v-if="project" class="row bg-primary fit wrap justify-start items-start content-start" style="height: 350px; width: 100%">

    <div class="col-3 q-pa-md">
      <q-card dark bordered class="bg-grey-9">

        <q-item-label class="text-yellow-5" style="padding: 10px; position: absolute; bottom: 1px;right: 0">
          OWNER
        </q-item-label>

        <q-card-section horizontal style="padding: 20px">
          <q-avatar rounded>
            <img :src="`${project.owner.avatar}`" alt="no image">
          </q-avatar>
          <q-item>
            {{project.owner.firstName+" "+project.owner.lastName}}
            {{project.owner.email}}
          </q-item>
        </q-card-section>

      </q-card>
      <q-item>
          <q-avatar class="q-pa-md row no-wrap items-center justify-around" size="300px" font-size="52px" color="transparent" rounded>
            <img :src="`${project.avatar}`" alt="no image">
          </q-avatar>
      </q-item>
    </div>

    <div class="col-5" style="padding-left: 20px; padding-right: 20px">

      <div class="row">

        <div v-if="editMode===false">
          <h4>{{this.project.name}}</h4>
        </div>

        <div v-else>
          <h4>
            <q-input
                outlined
                v-model="projectName"
                standout="bg-secondary text-white"
                label="Project name"
                label-color="white"
                bg-color="primary"
                color="white"
                lazy-rules="true"
                :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                style="font-size: xx-large; font-palette: light;width: 170%"
            >
            </q-input>
          </h4>
        </div>

        <q-btn v-if="editMode===false && this.userAccessLevel==='owner'" class="bg-primary no-wrap items-center justify-around" @click="toggleEditProject" style="margin-right: 50px; position: absolute; right: 0">
          <q-item>
            <q-item-section>
              <q-icon name="edit"></q-icon>
            </q-item-section>
            <q-item-section>
              Edit
            </q-item-section>
          </q-item>
        </q-btn>

        <div v-if="this.userAccessLevel==='access'">
          <div v-if="this.project.usersThatAccepted.map(u=>u._id).includes(this.userId)">

            <q-btn class="bg-light-green-4 no-wrap items-center justify-around" @click="unacceptProject" style="margin-right: 50px; position: absolute; right: 0">
              <q-item>
                <q-item-section>
                  <q-icon name="done"></q-icon>
                </q-item-section>
                <q-item-section>
                  Project accepted, click to unaccept
                </q-item-section>
              </q-item>
            </q-btn>

          </div>
          <div v-else>
            <q-btn class="bg-secondary items-center justify-around" @click="acceptProject" style="margin-right: 50px; position: absolute; right: 0">
              <q-item>
                <q-item-section>
                  <q-icon name="done"></q-icon>
                </q-item-section>
                <q-item-section>
                  Accept project
                </q-item-section>
              </q-item>
            </q-btn>
          </div>
        </div>

        <div v-if="editMode===true && this.userAccessLevel==='owner'">

            <q-btn class="bg-secondary no-wrap items-center justify-around" @click="editProject" style="margin-right: 50px; position: absolute; right: 0; width: 10%">
              <q-item>
                <q-item-section>
                  <q-icon name="send"></q-icon>
                </q-item-section>
                <q-item-section>
                  Save
                </q-item-section>
              </q-item>
            </q-btn>

            <q-btn class="bg-warning no-wrap items-center justify-around" @click="uneditProject" style="margin-right: 50px; position: absolute; right: 0; top:135px; width: 10%">
              <q-item>
                <q-item-section>
                  <q-icon name="close"></q-icon>
                </q-item-section>
                <q-item-section>
                  Cancel
                </q-item-section>
              </q-item>
            </q-btn>

        </div>

      </div>
      <div class="row">

        <div v-if="editMode===false">
          <p>{{this.project.description}}</p>
        </div>

        <div v-else>
          <q-input
              outlined
              standout="bg-secondary text-white"
              v-model="projectDesc"
              placeholder="Type here..."
              label="Project description"
              label-color="white"
              bg-color="primary"
              type="textarea"
              lazy-rules="true"
              style="font-size: x-large; width: 250%"
              :rules="[ val => val && val.length > 0 || 'Pool can not be blank']">
          </q-input>
        </div>

      </div>

      <q-separator></q-separator>

      <div class="column q-pa-md justify-around">

        <div class="row">

          <div v-if="this.editMode === false">

            <div v-if="this.project.isPublic === true">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="share" />
                </q-item-section>

                <q-item-section>Public project</q-item-section>
              </q-item>

            </div>

            <div v-else>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="verified_user" />
                </q-item-section>

                <q-item-section>Protected project</q-item-section>
              </q-item>
            </div>

          </div>

          <div v-else>
            <q-btn-toggle
                v-model="isPublic"
                no-caps
                rounded
                unelevated
                toggle-color="secondary"
                color="primary"
                text-color="white"
                :options="[
                  {label: 'Protected', value: this.project.isPublic},
                  {label: 'Public', value: !this.project.isPublic},
                ]"
            />
          </div>

        </div>

        <div class="row">

          <div v-if="project.usersWithAccess">
            <q-item clickable @click="setMenuToUserWithAccessList">
              <q-item-section avatar>
                <q-icon name="person_add" />
              </q-item-section>

              <q-item-section>Project accessed by: {{this.project.usersWithAccess.length}} users</q-item-section>
            </q-item>
          </div>

          <div v-else>
            <q-item clickable @click="this.setMenuToUserWithAccessList">
              <q-item-section avatar>
                <q-icon name="signal_wifi_4_bar_lock" />
              </q-item-section>

              <q-item-section v-if="userAccessLevel==='owner'">No one has access to project, click to grant</q-item-section>
              <q-item-section v-else>No one has access to project</q-item-section>
            </q-item>
          </div>

        </div>

        <div class="row">

          <div v-if="project.usersThatAccepted">
            <q-item clickable @click="this.setMenuToUserThatAccepted">
              <q-item-section avatar>
                <q-icon name="smoking_rooms" />
              </q-item-section>

              <q-item-section>Project accepted by: {{this.project.usersThatAccepted.length}} users, click to check who</q-item-section>
            </q-item>
          </div>

          <div v-else-if="project.usersThatAccepted.length === project.usersWithAccess.length">
            <q-item clickable @click="this.setMenuToUserThatAccepted">
              <q-item-section avatar>
                <q-icon name="check" />
              </q-item-section>

              <q-item-section>Project accepted</q-item-section>
            </q-item>
          </div>

          <div v-else>
            <q-item clickable @click="this.setMenuToUserWithAccessList">
              <q-item-section avatar>
                <q-icon name="verified_user" />
              </q-item-section>

              <q-item-section>No one has accepted project</q-item-section>
            </q-item>
          </div>

        </div>

      </div>
    </div>

    <div class="column-3" style="padding: 20px">

      <div class="row" style="padding-top: 62px">
        <div v-if="menuMode === 'userList'">
          <UserList v-bind:users="this.project.usersWithAccess" :key="this.project.usersWithAccess" :userAccessLevel="userAccessLevel"></UserList>
        </div>

        <div v-if="menuMode === 'acceptedList'">
          <UserList v-bind:users="this.project.usersThatAccepted" :key="this.project.usersThatAccepted"></UserList>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import UserList from "@/components/UserList";
import projectService from "@/services/ProjectService";
import userService from "@/services/UserService";
export default {
  name: "ProjectShowcase",
  components: {UserList},
  props: {
    project: Object,
    userAccessLevel: String,
  },
  data () {
    return {
      menuMode: "start",
      editMode: false,
      projectDesc: "",
      projectName: "",
      isPublic: false,
      val1: "",
      val2: "",
      userId: null
    }
  },
  mounted() {
    this.userId = sessionStorage.getItem('userId')
  },
  methods: {
    setMenuToUserWithAccessList() {
      this.menuMode = "userList"
    },
    setMenuToUserThatAccepted() {
      this.menuMode = "acceptedList"
    },
    toggleEditProject() {
      this.editMode = true
      this.projectName = this.project.name
      this.projectDesc = this.project.description
      this.setLabels()
    },
    uneditProject() {
      this.editMode = false
    },
    async editProject() {
      let projectId = this.$route.params.projectId
      await projectService.editProject(projectId, this.projectName, this.projectDesc, this.isPublic)
      this.editMode = false
      this.$router.go(0)
    },

    setLabels() {
      if (this.project) {
        if (this.project.isPublic === false) {
          this.val1 = false
          this.val2 = true
        } else {
          this.val1 = true
          this.val2 = false
        }
      }
    },

    async acceptProject() {
      let projectId = this.$route.params.projectId
      await userService.acceptProject(projectId, this.userId)
      this.$router.go(0)
    },

    async unacceptProject() {
      let projectId = this.$route.params.projectId
      await userService.unacceptProject(projectId, this.userId)
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>