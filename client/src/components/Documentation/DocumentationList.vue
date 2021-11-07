<template>
  <q-card flat bordered class="bg-grey-9" style="left: 10%; width: 80%">
    <q-card-section>
      <h3>
        Documentation
      </h3>
      <q-separator dark />
    </q-card-section>

    <q-card-section>

      <q-list v-for="documentation in documentationList" v-bind:key="documentation._id">

        <documentation v-bind:documentation="documentation" :userAccessLevel="userAccessLevel"></documentation>
        <q-separator dark/>
      </q-list>

    </q-card-section>

    <div class="row-2" v-if="userAccessLevel==='owner'">

      <q-expansion-item
          expand-separator
          icon="add_box"
          label="Add new Documentation"
      >
        <q-item>
          <q-form style="width: 80%">
            <q-input
                filled
                v-model="name"
                placeholder="Type"
                label-color="white"
                input-style="color: white"
                color="white"
                label="Name of documentation"
            />
          </q-form>
          <q-item-section clicable @click="addNewDocumentation(this.name)" style="padding-left: 20px; width: 10%">
            <q-btn class="bg-primary" flat round size="lg" style="width: 20%">
              <q-icon avatar name="send"></q-icon>
            </q-btn>
          </q-item-section>
        </q-item>

      </q-expansion-item>

    </div>

  </q-card>
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