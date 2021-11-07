<template>

  <div class="row fit wrap justify-start items-start content-start" style="width: 100%; padding-left: 10%">

    <div class="column col-12 justify-start">

      <div class="row-6" v-if="commentList.length > 0">
        <q-list v-for="comment in commentList" v-bind:key="comment._id">

          <comment v-bind:comment="comment" :documentation-id="documentationId"></comment>

          <q-separator></q-separator>

        </q-list>

      </div>

      <div class="row-1">

        <q-expansion-item
            expand-separator
            icon="add_box"
            label="Add your comment about document"
        >
          <q-item>
            <q-form style="width: 80%">
              <q-input
                  filled
                  v-model="content"
                  placeholder="Type"
                  type="textarea"
                  label-color="white"
                  input-style="color: white"
                  color="white"
                  label="Type here..."
              />
            </q-form>

            <q-item-section clicable @click="addNewComment(this.content)" style="padding-left: 20px; width: 10%">
              <q-btn round size="xl" icon="send" class="bg-light-blue-10" style="width: 20%">
              </q-btn>

            </q-item-section>
          </q-item>

        </q-expansion-item>

      </div>

    </div>

  </div>

</template>

<script>
import Comment from "@/components/Comment/Comment";
import commentService from "@/services/CommentService";
import userService from "@/services/UserService";
export default {
  name: "CommentList",
  components: {Comment},
  props: {
    commentList: Array,
    documentationId: String
  },
  data() {
    return {
      return: {
        content: "",
        user: null
      }
    }
  },
  methods: {
    async addNewComment(content) {
      this.user = await userService.getUserData();
      this.user = JSON.parse(JSON.stringify(this.user))

      if (this.documentationId && this.user._id) {
        await commentService.addNewCommentForDocument(this.documentationId, content, this.user._id)
        this.$router.go(0)
      }
    }

  },
  mounted() {
    console.log("this.commentList in CommentList")
    console.log(this.commentList)
  }

}
</script>

<style scoped>

</style>