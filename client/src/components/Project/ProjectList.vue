<template>
  <div class="q-pa-md bg-light-blue-8">
    <q-list bordered separator v-if="projectList.length > 0">

      <div v-for="p in projectList" v-bind:key="p._id">

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
    <q-item v-else>
      No projects
    </q-item>

  </div>
</template>

<script>

export default {
  name: "ProjectList",
  data () {
    return {}
  },
  props: {
    projectList: Array,
    user: Object
  }
}
</script>

<style scoped>

</style>