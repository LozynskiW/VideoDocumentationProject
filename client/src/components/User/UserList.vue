<template>
  <div class="items-start justify-center" style="float: top; padding-top: 40px">
    <div class="column">

      <div class="row-6">
        <q-item clickable class="bg-grey-9 rounded-borders text-white text-h4 shadow-2" style="margin-bottom: 10px; padding-right: 20px; width: 100%">
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="account_box" size="xl"></q-icon>
            </q-avatar>
          </q-item-section>
          <q-item-section>List of users</q-item-section>
        </q-item>
        <q-separator></q-separator>
      </div>

      <div class="row-6">

          <q-list v-for="user in users" v-bind:key="user._id">
            <q-expansion-item>
              <template v-slot:header>
                <q-item clickable class="bg-light-blue-10" style="margin-bottom: 10px; padding-right: 20px; width: 100%">
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="`${user.avatar}`" alt="no image">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    {{user.firstName+" "+user.lastName}}
                  </q-item-section>
                  <q-item-section style="font-size: small">
                    {{user.email}}
                  </q-item-section>
                </q-item>
              </template>

              <q-item>
                <q-btn color="negative" icon-right="do_not_disturb_on" @click="removeUserFromProject(user._id)">
                  Deny access
                </q-btn>
              </q-item>

            </q-expansion-item>

          </q-list>

      </div>

      <div class="row" v-if="userAccessLevel==='owner'">
        <div class="column-6">
          <UserSearch v-bind:usersWithAccess="users"></UserSearch>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import UserSearch from "@/components/User/UserSearch";
import userService from "@/services/UserService";
export default {
  name: "UserList",
  components: {UserSearch},
  props: {
    users: Array,
    userAccessLevel: String,
  },
  mounted() {
  },
  methods: {
    async removeUserFromProject(userId){
      let projectId = this.$route.params.projectId
      await userService.removeUserFromProject(userId, projectId)
    }
  }
}
</script>

<style scoped>

</style>