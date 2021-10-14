<template>
  <ProjectList v-bind:projectList="publicProjects" :key="publicProjects"></ProjectList>
</template>

<script>
import ProjectList from "@/components/Project/ProjectList";
import projectService from "@/services/ProjectService";

export default {
  name: "AccessedProjects",
  components: {ProjectList},
  data () {
    return {
      publicProjects: [],
      user: Object
    }
  },
  async mounted() {
    console.log(this.user)
    this.publicProjects = await projectService.getPublicProjectsForUser()
    this.publicProjects = JSON.parse(JSON.stringify(this.publicProjects)).data

  }
}
</script>

<style scoped>

</style>