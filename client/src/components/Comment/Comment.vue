<template>
  <div v-if="this.comment">
    <q-card dark bordered class="text-white bg-grey-9" style="padding: 20px">

      <q-item>
        <q-item-section avatar style="width: 10%">
          <q-avatar>
            <img id="userAvatar" :src="`${comment.user.avatar}`" alt="no image">
          </q-avatar>
        </q-item-section>
        <q-item-section top style="width: 10%">
          <q-item-label class="text-weight-medium">{{comment.user.firstName+" "+comment.user.lastName}}</q-item-label>
          <q-item-label caption class="text-grey-5">{{comment.user.email}}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator dark inset/>

      <q-card-section>
          <q-item-section>
            <div v-if="mode==='edit'">

              <q-form style="width: 100%; padding-bottom: 1%">
                <q-input
                    filled
                    v-model="editedContent"
                    placeholder="Type"
                    type="textarea"
                    label-color="white"
                    input-style="color: white"
                    color="white"
                    label="Edit your comment"
                />
              </q-form>
              <q-separator></q-separator>
              <q-btn flat rounded class="bg-teal" style="width: 100px" @click="editComment(comment._id)">
                <q-item-label>Save changes</q-item-label>
              </q-btn>
              <q-btn flat rounded style="width: 100px" @click="untoggleEditComment">
                <q-item-label>Cancel</q-item-label>
              </q-btn>
            </div>

            <div v-else>
              {{comment.content}}
            </div>
          </q-item-section>
      </q-card-section>

      <q-separator dark inset></q-separator>

      <q-item>

        <q-item-section>
          <q-item-label caption class="text-grey-5" style="padding-top: 10px; padding-left: 30px">{{this.commentDateTime}}</q-item-label>
        </q-item-section>

        <q-btn flat
               round
               icon="edit"
               size="md"
               @click="toggleEditComment">
        </q-btn>

        <q-btn flat
               round
               icon="delete"
               size="md"
               @click="deleteCommentById(comment._id)">

        </q-btn>

      </q-item>

    </q-card>
  </div>
</template>

<script>
import commentService from "@/services/CommentService";

export default {
  name: "Comment",
  props: {
    comment: Object,
    documentationId: String
  },
  mounted() {
    this.commentDateTime = this.comment.date.toLocaleString()
    this.commentDateTime = this.commentDateTime.split("T")[0]+" "+ this.commentDateTime.split("T")[1].split(".")[0]
    this.editedContent = this.comment.content
  },
  data() {
    return {
      mode: "show",
      editedContent: "",
      commentDateTime: "",
    }
  },
  methods: {

    async deleteCommentById(commentId) {
      await commentService.deleteComment(this.documentationId ,commentId)
      this.$router.go(0)
    },

    toggleEditComment() {
      this.mode = "edit"
    },

    untoggleEditComment() {
      this.mode = "show"
    },

    async editComment(commentId) {
      if (this.editedContent.length > 0){
        await commentService.updateComment(this.documentationId, commentId, this.editedContent)
        this.mode="show"
        this.$router.go(0)
      }
    }

  }
}
</script>

<style scoped>

</style>