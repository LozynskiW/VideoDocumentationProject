<template>
  <div v-if="this.comment">
    <q-card dark bordered class="text-white bg-grey-9" style="padding: 20px">
      <q-card-section>
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
          <q-item-section>
            {{comment.content}}
            <div v-if="mode==='edit'">

              <q-form class="bg-orange-14" style="width: 50%">
                <q-input
                    filled
                    v-model="editedContent"
                    placeholder="Type"
                    label="Edit your comment"
                />
              </q-form>
              <q-btn class="bg-primary" style="width: 100px" @click="editComment(comment._id)">
                <q-icon name="edit"></q-icon>
                <q-item-label>Save changes</q-item-label>
              </q-btn>
            </div>
          </q-item-section>
          <q-item-section style="position: absolute;right:0;top:0">
            <q-btn class="bg-primary" @click="toogleEditComment">
              <q-item>
                <q-item-section>
                  <q-icon name="edit"></q-icon>
                </q-item-section>
                <q-item-section>
                  Edit
                </q-item-section>
              </q-item>
            </q-btn>
            <q-btn class="bg-negative" @click="deleteCommentById(comment._id)">
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
      </q-card-section>

      <q-separator dark inset></q-separator>
      <q-item-label caption class="text-grey-5" style="padding-top: 10px; padding-left: 30px">{{comment.date}}</q-item-label>

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
  },
  data() {
    return {
      mode: "show",
      editedContent: ""
    }
  },
  methods: {

    async deleteCommentById(commentId) {
      await commentService.deleteComment(this.documentationId ,commentId)
      this.$router.go(0)
    },

    async toogleEditComment() {
      this.mode = "edit"
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