<template>
  <div class="fit wrap justify-start items-start content-start">

    <q-item class="bg-grey-8 text-white" style="margin-bottom: 10px; padding-right: 20px">

      <q-item-section avatar>
        <q-avatar>
          <q-icon name="group_add"/>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-form>
          <q-input
              filled
              v-model="name"
              placeholder="Type"
              label="Grant access to project for new user"
              @click="findUsers(this.name)"
          />
        </q-form>

      </q-item-section>

    </q-item>
    <q-item v-if="users !== []">
        <UserSearchList v-bind:users="users" :key="users"></UserSearchList>

    </q-item>
    <q-item v-else>
      <q-item-section>No one was found</q-item-section>
    </q-item>

  </div>
</template>

<script>
import userService from "@/services/UserService";
import UserSearchList from "@/components/UserSearchList";

export default {
  name: "UserSearch",
  components: {UserSearchList},
  props: {
    usersWithAccess: Array
  },
  mounted() {
    console.log("this.users in UserSearch")
    console.log(this.usersWithAccess)
  },
  data(){
    return{
      name: "",
      users: []
    }
  },
  methods: {
    async findUsers(nameOrEmail) {

      if (nameOrEmail && nameOrEmail.length > 0) {

        this.users = await userService.getUsersByEmailOrName(nameOrEmail)
        this.users = JSON.parse(JSON.stringify(this.users))
        console.log("this.users before map")
        console.log(this.users.data)

        console.log("this.usersWithAccess before map")
        console.log(this.usersWithAccess)

        this.users = this.users.data.filter(u => {
          let usersWithAccessIdArray = this.usersWithAccess.map(uwa => uwa._id)
          if (usersWithAccessIdArray.filter(id => id === u._id).length === 0) {
            return u
          }
        })

        console.log("this.users after map")
        console.log(this.users)

      }
      //this.makeUserList()

    },
    async addUserToProject(userId) {

      let projectId = this.$route.params.projectId
      await userService.addUserToProject(userId, projectId)

    },
    makeUserList() {
      let userListPlaceHolder = document.getElementById("userSearchList")
      userListPlaceHolder.innerHTML = ""

      let list = document.createElement('ul')

      document.getElementById("userSearchList").appendChild(list)

      this.users.data.forEach(u => {
        let li = document.createElement('li')
        //let section = document.createElement('q-item-section')
        //let item = document.createElement("q-item")
        li.innerHTML = u.firstName+" "+u.lastName
        li.onclick = "addUserToProject({{u._id}})"
        //li.appendChild(section)
        list.appendChild(li)
      })
    }
  }

}
</script>

<style scoped>

</style>