<template>
  <div class="q-pa-md items-start justify-center text-subtitle1" style="float: top; padding-top: 20px">
    <div class="column" v-if="users">
      <div class="row-3">
        <q-list v-for="user in users" v-bind:key="user._id">
                <q-item clickable class="bg-grey-8 text-white text-subtitle1" style="margin-bottom: 5px; padding-right: 10px"
                        @click="addUserToProject(user._id)">
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="`${user.avatar}`" alt="no image">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section class="text-subtitle1">
                    <q-item-label lines="1">{{user.firstName+" "+user.lastName}}</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold text-white">{{user.email}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

        </q-list>
      </div>

    </div>

  </div>
</template>

<script>
import userService from "@/services/UserService";
export default {
  name: "UserSearchList",
  components: {},
  props: {
    users: Array
  },
  methods: {
    async addUserToProject(userId) {

      let projectId = this.$route.params.projectId

      await userService.addUserToProject(userId, projectId)

    }
  }
}
</script>

<style scoped>

</style>