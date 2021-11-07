<template>
  <div>
    <div v-if="user" class="col-3 q-pa-md">
      <div class="row" style="min-height: 200px; max-height: 300px">

        <div v-if="editMode===true" style="position: absolute; right: 0; width: 15%; z-index: 1">

          <q-btn class="bg-secondary no-wrap items-center justify-around" @click="editUser">
            <q-item>
              <q-item-section>
                <q-icon name="send"></q-icon>
              </q-item-section>
              <q-item-section>
                Save
              </q-item-section>
            </q-item>
          </q-btn>

          <q-btn class="bg-warning no-wrap items-center justify-around" @click="uneditUser">
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

        <div v-else style="position: absolute; right: 0; width: 10%; z-index: 1">
          <q-btn class="bg-primary" @click="toggleEditUser">
            <q-item>
              <q-item-section>
                <q-icon name="edit"></q-icon>
              </q-item-section>
              <q-item-section>
                Edit
              </q-item-section>
            </q-item>
          </q-btn>
        </div>

        <q-img src="https://media.istockphoto.com/videos/low-poly-dark-background-video-id850926774?s=640x640" style="min-height: 200px; max-height: 300px">

          <div class="absolute-bottom bg-transparent">
            <q-item>
              <q-item-section side>
                <q-avatar size="200px" class="q-mb-sm">
                  <img id="userAvatar" :src="`${user.avatar}`" alt="no image">
                </q-avatar>
              </q-item-section>

              <q-item-section style="padding-left: 20px">
                <h2>{{user.firstName+" "+user.lastName}}</h2>
              </q-item-section>
            </q-item>

          </div>

        </q-img>
      </div>

      <div class="row" style="padding-top: 40px">
        <div class="col-4">

          <q-card dark bordered class="bg-grey-9">

            <q-card-section horizontal style="padding: 20px">
              <div v-if="editMode===false">
                <q-item>
                  <q-item-section side>
                    <h5>Name:</h5>
                  </q-item-section>
                  <q-item-section>
                    <h4>{{user.firstName}}</h4>
                  </q-item-section>
                </q-item>
              </div>

              <div v-else>
                <q-input
                    outlined
                    v-model="userName"
                    standout="bg-secondary text-white"
                    label-color="white"
                    bg-color="grey-9"
                    color="white"
                    lazy-rules="true"
                    :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                    style="font-size: xx-large; font-palette: light; width: 100%"
                >
                  <template v-slot:prepend>
                    <q-item>
                      <q-item-section side>
                        <h5>Name:</h5>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-input>
              </div>

            </q-card-section>

          </q-card>

          <q-card dark bordered class="bg-grey-9">

            <q-card-section horizontal style="padding: 20px">
              <div v-if="editMode===false">
                <q-item>
                  <q-item-section side>
                    <h5>Surname:</h5>
                  </q-item-section>
                  <q-item-section>
                    <h4>{{user.lastName}}</h4>
                  </q-item-section>
                </q-item>
              </div>

              <div v-else>
                <q-input
                    outlined
                    v-model="userSurname"
                    standout="bg-secondary text-white"
                    label-color="white"
                    bg-color="grey-9"
                    color="white"
                    lazy-rules="true"
                    :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                    style="font-size: xx-large; font-palette: light; width: 100%"
                >
                  <template v-slot:prepend>
                    <q-item>
                      <q-item-section side>
                        <h5>Surname:</h5>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-input>
              </div>

            </q-card-section>

          </q-card>

          <q-card dark bordered class="bg-grey-9">

            <q-card-section horizontal style="padding: 20px">
              <div v-if="editMode===false">
                <q-item>
                  <q-item-section side>
                    <h5>Email:</h5>
                  </q-item-section>
                  <q-item-section>
                    <h4>{{user.email}}</h4>
                  </q-item-section>
                </q-item>
              </div>

              <div v-else>
                <q-input
                    outlined
                    v-model="userEmail"
                    type="email"
                    standout="bg-secondary text-white"
                    label-color="white"
                    bg-color="grey-9"
                    color="white"
                    lazy-rules="true"
                    :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                    style="font-size: x-large; font-palette: light; width: 100%"
                >
                  <template v-slot:prepend>
                    <q-item>
                      <q-item-section side>
                        <h5>Email:</h5>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-input>
              </div>

            </q-card-section>

          </q-card>

          <q-card dark bordered class="bg-grey-9" v-if="editMode===true">

            <q-card-section horizontal style="padding: 20px">

                <q-input
                    outlined
                    v-model="userAvatar"
                    type="url"
                    standout="bg-secondary text-white"
                    label-color="white"
                    bg-color="grey-9"
                    color="white"
                    lazy-rules="true"
                    :rules="[ val => val && val.length > 0 || 'Pool can not be blank']"
                    style="font-size: medium; font-palette: light; width: 100%"
                >
                  <template v-slot:prepend>
                    <q-item>
                      <q-item-section side>
                        <h5>Avatar:</h5>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-input>

            </q-card-section>
          </q-card>

        </div>

        <div class="col-4" style="padding-left: 50px">
          <q-card dark bordered class="bg-amber">

            <q-card-section horizontal style="padding: 20px">
              <q-item clickable :to="'/user/projects/owned'" style="width: 100%">
                <q-item-section side>
                  <h5>Owned projects:</h5>
                </q-item-section>
                <q-item-section>
                  <h4>{{user.ownedProjects.length}}</h4>
                </q-item-section>
              </q-item>
            </q-card-section>

            <q-card-section horizontal style="padding: 20px">
              <q-item clickable :to="'/user/projects/accessed'" style="width: 100%">
                <q-item-section side>
                  <h5>Accessed projects:</h5>
                </q-item-section>
                <q-item-section>
                  <h4>{{user.accessedProjects.length}}</h4>
                </q-item-section>
              </q-item>
            </q-card-section>

          </q-card>
        </div>
      </div>

      <q-space color="negative"/>

      <div class="row">

        <div class="col-4"></div>
        <div class="col-4"></div>
        <div class="col-4">
          <q-expansion-item popup
                            expand-separator
                            icon="delete"
                            label="Delete Account"
                            class="bg-negative"
                            style="position:absolute; right: 40px; bottom: 25%; width: 10%">
            <q-separator></q-separator>
            <q-card class="bg-grey-9">
              <q-card-section>
                Are You sure?
              </q-card-section>
              <q-card-actions>
                <q-btn flat class="bg-negative"
                       @click = "deleteUser">
                  Delete Account
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-expansion-item>
        </div>

      </div>

    </div>

    <div v-else>
      No user data yet
    </div>

  </div>
</template>

<script>
import userService from "@/services/UserService";

export default {
  name: "UserPanel",
  data(){
    return{
      user: null,
      editMode: false,
      userName: "",
      userSurname: "",
      userEmail: "",
      userAvatar: ""
    }
  },
  async mounted() {

    this.user = await userService.getUserData();
    this.user = JSON.parse(JSON.stringify(this.user))


  },
  methods: {
    toggleEditUser() {
      this.editMode = true
      this.userName = this.user.firstName
      this.userSurname = this.user.lastName
      this.userEmail = this.user.email
      this.userAvatar = this.user.avatar
    },
    uneditUser() {
      this.editMode = false
    },

    async editUser() {
      await userService.updateUser(this.userName, this.userSurname, this.userEmail, this.userAvatar)
      this.$router.go(0)
    },

    async deleteUser(){
      userService.logout()
      userService.deleteUserById()
      this.$router.push("/")
      this.$router.go(0)
    }
  }

}
</script>

<style scoped>

</style>