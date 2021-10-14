<template>
  <q-expansion-item>
    <template v-slot:header>
      <q-item clickable class="bg-light-blue-10" style="margin-bottom: 10px; padding-right: 20px; width: 100%">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="attachment"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          {{documentation.name}}
        </q-item-section>
        <q-item-section>
          Number of documents: {{documentation.documents.length}}
        </q-item-section>
        <q-item-section>
          Number of comments: {{documentation.comments.length}}
        </q-item-section>
        <q-item-section v-if="userAccessLevel==='owner'">
          <q-btn class="bg-negative" style="width: 10%; float: right" @click="deleteDocumentation">
            <q-icon name="delete"></q-icon>
          </q-btn>
        </q-item-section>
      </q-item>
    </template>

    <DocumentList :documentList="documentation.documents" :documentationId="documentation._id" :userAccessLevel="userAccessLevel"></DocumentList>

    <q-item style="padding-left: 10%; padding-right: 10%">
      <CommentList :comment-list="this.comments" :documentationId="this.documentation._id" :userAccessLevel="userAccessLevel"></CommentList>
    </q-item>

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