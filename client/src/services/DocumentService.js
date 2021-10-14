import axios from 'axios'

class DocumentService {

    async addNewDocument(documentationId, name, url) {

        try {
            await axios({
                method: "post",
                url: `/api/documentation/${documentationId}/addDocument`,
                data: {
                    newDocument: {
                        name: name,
                        file: url
                    }
                }
            })

        } catch (err) {
            console.log("Error in addNewDocument")
            console.log(err)
        }
    }

    async deleteDocument(documentationId, documentId) {
        try {
            await axios({
                method: "post",
                url: `/api/documentation/${documentationId}/pullDocument`,
                data: {
                    documentId: documentId
                }
            })

        } catch (err) {
            console.log("Error in deleteDocumentation")
            console.log(err)
        }
    }

    async getDocumentById(documentId) {

        try {
            return await axios({
                method: "get",
                url: `/api/document`,
                params: {
                    documentId: documentId
                }
            })

        } catch (err) {
            console.log("Error in addNewDocument")
            console.log(err)
        }
    }

}

const documentService = new DocumentService()
export default documentService