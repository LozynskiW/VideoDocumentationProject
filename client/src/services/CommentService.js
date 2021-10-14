import axios from 'axios'

class CommentService {

    async getAllCommentsForDocumentation(documentationId) {

        try {
            return await axios({
                method: "get",
                url: `/api/documentation/${documentationId}/comments`
            })

        } catch (err) {
            console.log("Error in getAllCommentsForDocumentation")
            console.log(err)
        }
    }

    async addNewCommentForDocument(documentationId, content, user) {

        try {
            await axios({
                method: "post",
                url: `/api/documentation/${documentationId}/comments`,
                data: {
                    newComment: {
                        content: content,
                        date: Date.now(),
                        owner: user
                    },
                    documentationId: documentationId
                }
            })

        } catch (err) {
            console.log("Error in addNewDocumentation")
            console.log(err)
        }
    }

    async deleteComment(documentationId, commentId) {
        try {
            await axios({
                method: "delete",
                url: `/api/documentation/${documentationId}/comments`,
                data: {
                    commentId: commentId
                }
            })

        } catch (err) {
            console.log("Error in deleteComment")
            console.log(err)
        }
    }

    async updateComment(documentationId, commentId, updatedContent) {
        try {
            await axios({
                method: "put",
                url: `/api/documentation/${documentationId}/comments`,
                data: {
                    content: updatedContent,
                    commentId: commentId
                }
            })

        } catch (err) {
            console.log("Error in deleteComment")
            console.log(err)
        }
    }



}

const commentService = new CommentService()
export default commentService