import axios from 'axios'

export class UserService {

    async getUserData() {

        let user = null;

        try {

            let user = await axios({
                method: "GET",
                url: '/api/user/details',
            })
            return user.data

        } catch (err) {
            console.log("error when getting data from server: /api/user/details")
            console.log(err);

        }

        return user
    }

    async getUserAccessLevel(projectId) {

        let user = null;

        try {

            let user = await axios({
                method: "post",
                url: '/api/user/accessLevel',
                data: {
                    projectId: projectId
                }
            })
            return user.data

        } catch (err) {
            console.log("error when getting data from server: /api/user/details")
            console.log(err);
        }

        return user
    }

    async getUsersByEmailOrName (email) {

        let users = [];

        try {

            let usersByName = await axios({
                method: "post",
                url: '/api//user/find/name',
                body: {
                    name: email
                },
                data: {
                    name: email
                }
            })

            return usersByName

        } catch (err) {

            console.log(err);
        }

        return users

    }

    async addUserToProject(userId, projectId) {
        try {
            console.log(userId)
            await axios({
                url: `/api/project/${projectId}/addUser`,
                method: "post",
                body: {
                    userId: userId
                },
                data: {
                    userId: userId
                }
            })

            return {msg: "person added"}
        } catch (err) {
            console.log(err)
            return {err: err}
        }
    }

    async removeUserFromProject(userId, projectId) {
        try {
            await axios({
                url: `/api/project/${projectId}/deleteUser`,
                method: "post",
                body: {
                    userId: userId
                },
                data: {
                    userId: userId
                }
            })
            return {msg: "person removed from project"}
        } catch (err) {
            console.log(err)
            return {err: err}
        }
    }

    async logout() {
        document.cookie.split(";")
            .forEach(function(c) { document.cookie = c.replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

        await axios.delete("/api/logout")

    }

    async acceptProject(projectId, userId) {
        await axios({
            method: "put",
            url: `/api/user/project/${projectId}`,
            data: {
                userId: userId,
                isAccepted: true
            }
        })
    }

    async unacceptProject(projectId, userId) {
        await axios({
            method: "put",
            url: `/api/user/project/${projectId}`,
            data: {
                userId: userId,
                isAccepted: false
            }
        })
    }

    async updateUser(name, surname, email, avatar) {
        let userUpdate = {
            firstName: name,
            lastName: surname,
            email: email,
            avatar: avatar
        }

        await axios({
            method: "put",
            url: `/api/user/update`,
            data: {
                update: userUpdate
            }
        })
    }
}

const userService = new UserService()
export default userService;