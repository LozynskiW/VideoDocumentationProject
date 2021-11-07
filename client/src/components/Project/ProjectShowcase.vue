<template>
  <div v-if="project" class="row bg-grey-9" style="max-height: 400px; width: 100%; padding-bottom: 5%; margin-bottom: 5%">

    <div class="col-9">
    <q-card class="bg-primary" flat bordered style="min-height: 300px; min-width: 70%; max-width: 80%; left: 10%">

      <q-item class="bg-blue-9">
        <q-item-section avatar>
          <q-avatar size="100px">
            <img :src="`${project.owner.avatar}`" alt="no image">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label style="font-size: xx-large">{{project.owner.firstName+" "+project.owner.lastName}}</q-item-label>
          <q-item-label caption class="text-yellow-5">
            {{project.owner.email}}
          </q-item-label>
        </q-item-section>

        <div v-if="this.userAccessLevel==='owner'">
          <q-btn flat
                 rounded
                 icon="edit"
                 size="md"
                 style="position: absolute;right:10px;top:10px; width: 10%"
                 @click="toggleEditProject"
          />
        </div>

        <div v-else>
          <q-btn flat
                 round
                 icon="check"
                 size="md"
                 color="white"
                 label="Accept"
                 style="position: absolute;right:10px;top:10px; width: 10%"
                 @click="acceptProject"
                 v-if="!this.project.usersThatAccepted.map(e => e._id).includes(this.userId)"
          />

          <q-btn flat
                 round
                 icon="check"
                 size="md"
                 color="positive"
                 label="Accepted"
                 style="position: absolute;right:10px;top:10px; width: 10%"
                 @click="unacceptProject"
                 v-else
          ><q-tooltip class="bg-secondary">Click to cancel</q-tooltip></q-btn>
        </div>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section style="min-width: 50%">

          <q-item v-if="this.editMode === false">

            <q-item-section>
              <q-item-label style="font-size: large" class="text-yellow-5">{{project.name}}</q-item-label>
              <q-item-label class="text-white" caption>
                {{project.description}}
              </q-item-label>
            </q-item-section>

          </q-item>

          <q-item v-else>

            <q-item-section>
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

              <q-input
                  outlined
                  standout="bg-blue text-white"
                  type="textarea"
                  v-model="projectDesc"
                  label="Project description"
                  label-color="white"
                  input-style="color: white"
                  color="white"
                  lazy-rules="true"
                  :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                  style="width: 100%"
              >
              </q-input>

            </q-item-section>

          </q-item>

        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-6 justify-around">

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
              </div>

            </div>

            <div class="row">

              <div v-if="this.project.isPublic === false">
                <div v-if="project.usersWithAccess">
                  <q-item clickable @click="setMenuToUserWithAccessList">
                    <q-item-section avatar>
                      <q-icon name="person_add" />
                    </q-item-section>

                    <q-item-section>Project accessed by: {{this.project.usersWithAccess.length}} users, click to grant access</q-item-section>
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
            </div>

            <div class="row">

              <div v-if="this.project.isPublic === false">
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

              <div v-else>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="smoking_rooms" />
                  </q-item-section>

                  <q-item-section>Project accepted by: {{this.project.usersThatAccepted.length}} users</q-item-section>
                </q-item>
              </div>
            </div>

          <div class="row" v-if="editMode===true">
            <q-btn flat
                   rounded
                   icon="edit"
                   size="md"
                   label="Save changes"
                   @click="editProject"
            />
            <q-btn flat
                   rounded
                   icon="block"
                   size="md"
                   label="Cancel"
                   @click="uneditProject"
            />
          </div>

        </q-card-section>
      </q-card-section>
    </q-card>
    </div>

    <div class="col-3" style="padding: 20px" v-if="project.isPublic===false">

      <div class="row">
        <div v-if="menuMode === 'userList'">
          <UserList v-bind:users="this.project.usersWithAccess"
                    :key="this.project.usersWithAccess"
                    :userAccessLevel="userAccessLevel"
                    :tableHead="access">

          </UserList>
        </div>

        <div v-if="menuMode === 'acceptedList'">
          <UserList v-bind:users="this.project.usersThatAccepted"
                    :key="this.project.usersThatAccepted"
                    :tableHead="accept"
          ></UserList>
        </div>

        <div v-if="menuMode === 'start'">
          <UserList></UserList>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import UserList from "@/components/User/UserList";
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
      userId: null,
      access: "Accessed by",
      accept: "Accepted by"
    }
  },
  mounted() {
    this.userId = sessionStorage.getItem('userId')
    this.projectName = this.project.name
    this.projectDesc = this.project.description
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
      this.isPublic = this.project.isPublic
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