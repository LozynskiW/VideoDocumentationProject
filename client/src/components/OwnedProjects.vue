<template>
<div class="q-pa-md bg-light-blue-8">
  <q-list bordered separator>

    <div v-for="p in this.ownedProjects" :key="p._id">

      <q-item clickable v-ripple active-class="text-white" :to="`/project/${p._id}`">
        <q-item-section avatar>
          <q-avatar rounded>
            <img :src="`${p.avatar}`" alt="no image">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{p.name}}</q-item-section>
        <q-item-section>{{p.description}}</q-item-section>
      </q-item>

      <q-separator spaced inset />

    </div>

  </q-list>

</div>
</template>

<script>
import projectService from "@/services/ProjectService";

export default {
  name: "OwnedProjects",
  data () {
    return {
      ownedProjects: [],
      accessedProjects: []
    }
  },
  async mounted() {

    this.ownedProjects = await this.getProjectsForUser()
    this.ownedProjects = JSON.parse(JSON.stringify(this.ownedProjects)).data
  },
  methods: {
    async getProjectsForUser() {
      return await projectService.getOwnedProjectsForUser()
    }
  }

}
</script>

<style scoped>

</style>