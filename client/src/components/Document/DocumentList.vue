<template>

  <div class="row bg-teal fit wrap justify-start items-start content-start" style="width: 100%; padding-left: 5%">

    <div class="column col-12 justify-start">

      <div class="row-6">

        <q-list v-for="document in documentList" v-bind:key="document._id">

          <document v-bind:documentId="document"></document>

        </q-list>

      </div>

      <div class="row-1" v-if="userAccessLevel==='owner'">

        <q-expansion-item
            expand-separator
            icon="add_box"
            label="Add new document"
        >
          <q-item>
            <q-form style="width: 50%">
              <q-input
                  filled
                  v-model="name"
                  placeholder="Type"
                  label="Name of documentation"
              />
              <q-input
                  filled
                  v-model="url"
                  placeholder="Type"
                  label="url with file to attach"
              />
            </q-form>

            <q-item-section clicable @click="addNewDocument(this.name, this.url)" style="padding-left: 20px; width: 10%">
              <q-btn class="bg-light-blue-10" style="width: 20%">
                <q-icon avatar name="attach_file"></q-icon>
              </q-btn>

            </q-item-section>
          </q-item>

        </q-expansion-item>

      </div>

    </div>

  </div>

</template>

<script>
import Document from "@/components/Document/Document";
import documentService from "@/services/DocumentService";
export default {
  name: "DocumentList",
  components: {Document},
  props: {
    documentList: Array,
    documentationId: String,
    userAccessLevel: String
  },
  data(){
    return{
      name: "",
      url: ""
    }
  },
  methods: {
    async addNewDocument(name, url) {
      await documentService.addNewDocument(this.documentationId, name, url)
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>