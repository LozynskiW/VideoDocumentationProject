<template>
  <div class="fit wrap justify-start items-start content-start" style="width: 100%">

    <q-item class="bg-grey-9 text-white" style="margin-bottom: 10px; padding-right: 20px; width: 100%">

      <q-item-section avatar>
        <q-avatar>
          <q-icon name="group_add"/>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-form class = "text-white">
          <q-input
              filled
              label-color="white"
              color="white"
              v-model="name"
              placeholder="Type"
              label="Find person"
              @update:model-value="findUsers(this.name)"
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
import UserSearchList from "@/components/User/UserSearchList";

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

        this.users = this.users.data.filter(u => {
          let usersWithAccessIdArray = this.usersWithAccess.map(uwa => uwa._id)
          if (usersWithAccessIdArray.filter(id => id === u._id).length === 0) {
            return u
          }
        })

        console.log("change")

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