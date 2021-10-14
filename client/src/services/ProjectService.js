import axios from "axios";

class ProjectService {

    async getOwnedProjectsForUser() {
        return await axios.get("/api/user/projects/owned")
    }

    async getAccessedProjectsForUser() {
        return await axios.get("/api/user/projects/accessed")
    }

    async getPublicProjectsForUser() {
        return await axios.get("/api/projects/public")
    }

    async getProjectById(id) {
        return await axios.get(`/api/project/${id}`)
    }

    async saveNewProject(name, desc, isPublic) {
        await axios({
            method: "post",
            url: `/api/project`,
            data: {
                newProject: {
                    name: name,
                    description: desc,
                    isPublic: isPublic
                }
            }
        })
    }

    async editProject(projectId, name, desc, isPublic) {
        await axios({
            method: "put",
            url: `/api/project/${projectId}`,
            data: {
                projectUpdate: {
                    name: name,
                    description: desc,
                    isPublic: isPublic
                }
            }
        })
    }

}

const projectService = new ProjectService()
export default projectService