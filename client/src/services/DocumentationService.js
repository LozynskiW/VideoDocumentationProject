import axios from 'axios'

class DocumentationService {

    async addNewDocumentation(projectId, name) {

        try {
            await axios({
                method: "post",
                url: `/api/project/${projectId}/addDocumentation`,
                data: {
                    documentation: {
                        name: name
                    },
                    projectId: projectId
                }
            })

        } catch (err) {
            console.log("Error in addNewDocumentation")
            console.log(err)
        }
    }

    async deleteDocumentation(projectId, documentationId) {
        try {
            await axios({
                method: "post",
                url: `/api/project/${projectId}/pullDocumentation`,
                data: {
                    documentationToPullId: documentationId,
                    projectId: projectId
                }
            })

        } catch (err) {
            console.log("Error in deleteDocumentation")
            console.log(err)
        }
    }

}

const documentationService = new DocumentationService()
export default documentationService