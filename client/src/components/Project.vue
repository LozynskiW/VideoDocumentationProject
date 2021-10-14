<template>
  <div class="q-pa-md bg-primary">

    <div class="row">
      <ProjectShowcase v-bind:project="project.data" :userAccessLevel="userAccessLevel" :user="user"></ProjectShowcase>
    </div>

    <div class="row" v-if="project.data">
      <DocumentationList v-bind:documentation-list="project.data.documentation" :userAccessLevel="userAccessLevel"></DocumentationList>
    </div>

  </div>
</template>

<script>
import ProjectShowcase from "@/components/ProjectShowcase";
import projectService from "@/services/ProjectService";
import DocumentationList from "@/components/Documentation/DocumentationList";
import userService from "@/services/UserService";

export default {
  name: "Project",
  components: {DocumentationList, ProjectShowcase},
  data () {
    return {
      project: {},
      userAccessLevel: null
    }
  },
  props: {
    user: Object
  },
  async mounted() {
    let id = this.$route.params.projectId
    this.project = await projectService.getProjectById(id)
    this.project = JSON.parse(JSON.stringify(this.project))

    this.userAccessLevel = await userService.getUserAccessLevel(id);
    this.userAccessLevel = JSON.parse(JSON.stringify(this.userAccessLevel));
  }
}
</script>

<style scoped>

</style>