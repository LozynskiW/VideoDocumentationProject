<template>
  <q-card class="bg-grey-9" style="min-height: 300px; min-width: 300px; max-width: 400px;position: absolute; z-index: 1">
    <q-card-section>
      <q-item class="bg-grey-9 rounded-borders text-white text-h4" style="margin-bottom: 10px; padding-right: 20px; width: 100%">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="account_box" size="xl"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>{{this.tableHead}}</q-item-section>
      </q-item>
      <q-separator horizontal/>
    </q-card-section>
    <div class="column">

      <div class="row">
      </div>

      <div class="row-6">

          <q-list v-for="user in users" v-bind:key="user._id" style="top:0">
            <q-expansion-item>
              <template v-slot:header>
                <q-item clickable style="margin-bottom: 10px; padding-right: 20px; width: 100%">
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="`${user.avatar}`" alt="no image">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section style="font-size: small">
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

  </q-card>
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
    tableHead: String
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