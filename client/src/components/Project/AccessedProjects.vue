<template>
  <ProjectList v-bind:projectList="accessedProjects" :key="accessedProjects"></ProjectList>
</template>

<script>
import ProjectList from "@/components/Project/ProjectList";
import projectService from "@/services/ProjectService";

export default {
  name: "AccessedProjects",
  components: {ProjectList},
  data () {
    return {
      accessedProjects: []
    }
  },
  async mounted() {

    this.accessedProjects = await projectService.getAccessedProjectsForUser()
    this.accessedProjects = JSON.parse(JSON.stringify(this.accessedProjects)).data

  }
}
</script>

<style scoped>

</style>