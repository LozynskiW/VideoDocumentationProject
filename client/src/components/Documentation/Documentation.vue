<template>
  <q-expansion-item style="width: 100%">
    <template v-slot:header>

      <q-item style="margin-bottom: 10px; width: 100%">

        <q-item-section avatar>
          <q-avatar>
            <q-icon name="art_track" class="text-amber" size="lg"></q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section style="min-width: 60%">
          {{documentation.name}}
        </q-item-section>
        <q-item-section>
          Documents: {{documentation.documents.length}}
        </q-item-section>
        <q-item-section>
          Comments: {{documentation.comments.length}}
        </q-item-section>
        <q-item-section v-if="userAccessLevel==='owner'">

          <q-btn flat
                 rounded
                 icon="delete"
                 size="md"
                 style="position: absolute;right:10px;top:10px; width: 10%"
                 @click="deleteDocumentation">
          </q-btn>

        </q-item-section>
      </q-item>
      <q-separator/>
    </template>

    <q-card class="bg-grey-9">
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <DocumentList :documentList="documentation.documents" :documentationId="documentation._id" :userAccessLevel="userAccessLevel"
                        style="margin-left: 10%; width: 100%">

          </DocumentList>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-6">
          <CommentList :comment-list="this.comments" :documentationId="this.documentation._id" :userAccessLevel="userAccessLevel"></CommentList>
        </q-card-section>
      </q-card-section>
    </q-card>

  </q-expansion-item>
</template>

<script>
import DocumentList from "@/components/Document/DocumentList";
import CommentList from "@/components/Comment/CommentList";
import documentationService from "@/services/DocumentationService";
import commentService from "@/services/CommentService";
export default {
  name: "Documentation",
  components: {DocumentList, CommentList},
  props: {
    documentation: Object,
    userAccessLevel: String
  },
  data() {
    return {
      comments: []
    }
  },
  methods: {
    async deleteDocumentation() {
      let projectId = this.$route.params.projectId
      await documentationService.deleteDocumentation(projectId, this.documentation._id)
      this.$router.go(0)
    }
  },
  async mounted() {
    this.comments = await commentService.getAllCommentsForDocumentation(this.documentation._id)
    this.comments = JSON.parse(JSON.stringify(this.comments)).data
    console.log("this.comments in Documentation")
    console.log(this.comments)
  }
}
</script>

<style scoped>

</style>