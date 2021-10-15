<template>
  <div class="row bg-primary fit wrap justify-start items-start content-start">

    <div class="column col-10 justify-start">

      <div class="row-1">

        <q-item clickable class="bg-light-blue-10" style="margin-bottom: 10px">
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="dehaze"></q-icon>
            </q-avatar>
          </q-item-section>
          <q-item-section>Documentation for the project</q-item-section>
          <q-item-section>Number of documentation: {{documentationList.length}}</q-item-section>
        </q-item>

        <q-separator></q-separator>
      </div>

      <div class="row-6">

        <q-list v-for="documentation in documentationList" v-bind:key="documentation._id">

          <documentation v-bind:documentation="documentation" :userAccessLevel="userAccessLevel"></documentation>

        </q-list>

      </div>

      <div class="row-1" v-if="userAccessLevel==='owner'">

        <q-expansion-item
            expand-separator
            icon="add_box"
            label="Add new Documentation"
        >
          <q-item>
            <q-form style="width: 50%">
              <q-input
                  filled
                  v-model="name"
                  placeholder="Type"
                  label="Name of documentation"
              />
            </q-form>
            <q-item-section clicable @click="addNewDocumentation(this.name)" style="padding-left: 20px; width: 10%">
              <q-btn class="bg-light-blue-10" style="width: 20%">
                <q-icon avatar name="send"></q-icon>
              </q-btn>
            </q-item-section>
          </q-item>

        </q-expansion-item>

      </div>

    </div>

  </div>
</template>

<script>
import documentationService from "@/services/DocumentationService";
import Documentation from "@/components/Documentation/Documentation";
export default {
  name: "DocumentationList",
  components: {Documentation},
  props: {
    documentationList: Array,
    userAccessLevel: String
  },
  data(){
    return{
      name: ""
    }
  },
  methods: {
    async addNewDocumentation(name) {
      let projectId = this.$route.params.projectId
      await documentationService.addNewDocumentation(projectId, name)
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>