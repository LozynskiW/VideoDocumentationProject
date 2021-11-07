<template>

  <div class="row fit wrap justify-start items-start content-start" style="width: 80%; padding-left: 5%">

    <div class="column col-10 justify-start">

      <div class="row-6">

        <q-list v-for="document in documentList" v-bind:key="document._id">

          <document v-bind:documentId="document" :user-access-level="userAccessLevel"></document>

        </q-list>

      </div>

      <div class="row-1" v-if="userAccessLevel==='owner'">

        <q-expansion-item
            expand-separator
            icon="add_box"
            label="Add new document"
        >
          <q-item>
            <q-form style="width: 90%">
              <q-input
                  filled
                  v-model="name"
                  input-style="color:white"
                  label-color="white"
                  label="Name/title"
                  lazy-rules="true"
                  :rules="[ val => val && val.length > 3 || 'Must be at least 4 characters long']"
              />
              <q-input
                  filled
                  v-model="url"
                  type="url"
                  input-style="color:white"
                  label-color="white"
                  label="URL to file"
                  lazy-rules="true"
                  :rules="[ val => val && isValidURL(val) || 'Must be url']"
              />
            </q-form>

            <q-item-section clicable @click="addNewDocument(this.name, this.url)" style="padding-left: 20px; width: 10%">
              <q-btn  round flat size="md" class="bg-light-blue-10" style="width: 20%">
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
    },

    isValidURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }
  }
}
</script>

<style scoped>

</style>