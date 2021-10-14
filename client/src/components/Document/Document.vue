<template>
  <div class="q-pa-md" v-if="documentDetails">

    <q-expansion-item>

      <template v-slot:header>
        <q-item class="text-white bg-grey-9" style="margin-bottom: 10px; padding-right: 20px; width: 100%">
          <q-item-section>
            <q-avatar icon="attachment" color="teal" text-color="white" />
            <q-item-label caption class="text-white">Document</q-item-label>
          </q-item-section>
          <q-item-section>
            {{documentDetails.name}}
          </q-item-section>
          <q-item-section>
            {{documentDetails.file}}
          </q-item-section>
          <q-item-section v-if="userAccessLevel==='owner'">
            <q-btn class="bg-negative" style="position: absolute;right:10px;top:10px; width: 10%" @click="deleteDocumentById(documentDetails._id)">
              <q-item>
                <q-item-section>
                  <q-icon name="delete"></q-icon>
                </q-item-section>
                <q-item-section>
                  Delete
                </q-item-section>
              </q-item>
            </q-btn>
          </q-item-section>
        </q-item>
      </template>

    </q-expansion-item>

  </div>
</template>

<script>
import documentService from "@/services/DocumentService";

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
    }
  },
  async mounted() {
    await this.getDocumentData()
  }
}
</script>

<style scoped>

</style>