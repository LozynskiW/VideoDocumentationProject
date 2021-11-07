<template>
  <div v-if="documentDetails">

    <q-item class="text-white bg-grey-9" style="margin-bottom: 10px; width: 100%">

      <q-item-section>
        <q-avatar icon="attachment" color="teal" text-color="white" />
      </q-item-section>

      <q-item-section style="min-width: 70%; margin-bottom: 2%">
        <q-item-label class="text-white">{{documentDetails.name}}</q-item-label>

        <q-item-label caption lines="2" class="text-grey-4">
            {{documentDetails.file}}
        </q-item-label>

        <q-item-label caption lines="3" class="text-grey-4">
          <q-btn
              rounded
              flat
              size="1em"
              label="Open link in external tab"
              class="q-pa-md full-width dashboard-btns"
              @click="goTo(documentDetails.file)"
          />
        </q-item-label>

      </q-item-section>

      <q-item-section class="content-center" style="position: static;right:10px;top:10px; width: 10%" v-if="userAccessLevel==='owner'">
        <q-btn style="position: absolute;right:10px;top:10px; width: 10%" @click="deleteDocumentById(documentDetails._id)">
          <q-icon name="delete"></q-icon>
        </q-btn>
      </q-item-section>

    </q-item>

    <q-separator/>

  </div>
</template>

<script>
import documentService from "@/services/DocumentService";
const {openURL} = require('quasar')

export default {
  name: "Document",
  components: {},
  props: {
    documentId: String,
    userAccessLevel: String

  },
  data() {
    return {
      documentDetails: null
    }
  },
  methods: {
    async getDocumentData() {
      this.documentDetails = await documentService.getDocumentById(this.documentId)
      this.documentDetails = JSON.parse(JSON.stringify(this.documentDetails)).data
    },

    async deleteDocumentById(documentId) {
      await documentService.deleteDocument(this.documentDetails.documentation, documentId)
      console.log("Deleted document")
      this.$router.go(0)
    },

    goTo(link) {
      openURL(link)
    }
  },
  async mounted() {
    await this.getDocumentData()
  }
}
</script>

<style scoped>

</style>