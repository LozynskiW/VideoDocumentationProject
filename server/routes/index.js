var express = require('express');
var router = express.Router();
require('dotenv').config();

const UserController = require("../controllers/UserController")
const DocumentationController = require("../controllers/DocumentationController")
const DocumentController = require("../controllers/DocumentController")
const CommentController = require('../controllers/CommentController')
const ProjectController = require('../controllers/ProjectController')
const Auth = require('../security/Authentication')


// PUBLIC

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// USER

router.post('/api/register', UserController.registerNewUser)
router.post('/api/login', UserController.login)
router.delete('/api/logout', Auth.userAuth, Auth.logout)

// PROTECTED

router.delete('/api/user/delete',
    [
        Auth.userAuth,
        UserController.findUserById
    ], UserController.deleteUserById)

router.put('/api/user/update',
    [
        Auth.userAuth,
        UserController.findUserById
    ], UserController.updateUser)

router.get('/api/user/find/email',
    [
        Auth.userAuth,
        UserController.findUserByEmail
    ], UserController.getUserDetails)

router.post('/api/user/accessLevel',
    [
        Auth.userAuth,
        UserController.findUserById
    ], UserController.getUserAccessLevel)

router.post('/api/user/find/name',
    [
        Auth.userAuth,
        UserController.findUserByNameOrSurname
    ], UserController.getUserDetails)

router.get('/api/user/details/:userId',
    [
        Auth.userAuth,
        UserController.findUserById
    ], UserController.getUserDetails)

router.get('/api/user/details',
    [
        Auth.userAuth,
        UserController.findUserById
    ],
    UserController.getUserDetails)

//Inaccessible
router.get('/api/user/test/all', UserController.getAllUsers)

router.put('/api/user/project/:projectId',
    [
        Auth.userAuth,
        ProjectController.getProjectById,
        UserController.findUserById,
        UserController.checkIfUserAlreadyHasAccessToProject,
        UserController.acceptProject,
        ProjectController.checkIfUserAcceptedProject,
        ProjectController.markProjectAsAcceptedBySingleUser,
        ProjectController.getProjectById,
    ],
    ProjectController.checkIfProjectIsAccepted)

// DOCUMENT

router.post('/api/document', DocumentController.addNewDocument)

router.get('/api/document', DocumentController.findDocumentById, DocumentController.getDocumentDetails)

// DOCUMENTATION

router.post('/api/documentation/newDocumentation',
    Auth.userAuth,
    DocumentationController.addNewDocumentation)

router.post('/api/documentation/:documentationId/addDocument', [
    // req.body.newDocument
    // req.param.documentationId

        Auth.userAuth, // + req.user
        DocumentationController.findDocumentationById, // + req.body.documentation, needs req.param.documentationId
        DocumentController.addNewDocument, // needs req.body.newDocument
        DocumentationController.addNewDocumentToDocumentation // needs req.body.documentation and req.body.newDocument
    ],
    DocumentationController.return2xxStatus)

router.post('/api/documentation/:documentationId/pullDocument', [
        // req.body.newDocument
        // req.param.documentationId

        Auth.userAuth, // + req.user
        DocumentationController.findDocumentationById, // + req.body.documentation, needs req.param.documentationId
        DocumentController.findDocumentById, // needs req.body.newDocument
        DocumentationController.pullDocumentFromDocumentation // needs req.body.documentation and req.body.newDocument
    ],
    DocumentationController.return2xxStatus)
// req.user._id
// req.body.newDocument
// req.body.documentation

router.put('/api/documentation/:documentationId/update', [
        // req.body.documentToUpdateId;
        // req.body.newDocumentId

        Auth.userAuth,
        DocumentationController.findDocumentationById
    ],
    DocumentController.updateDocumentForDocumentation)

router.get('/api/documentation/:documentationId/documents', [
        Auth.userAuth,
        DocumentationController.findDocumentationById
    ],
    DocumentationController.getAllDocumentsForDocumentation)

router.get('/api/documentation/:documentationId', [
        Auth.userAuth,
        DocumentationController.findDocumentationById
    ],
    DocumentationController.getDocumentationDetails)

// COMMENT

//get all comments
router.get('/api/documentation/:documentationId/comments',
    [
        Auth.userAuth,
        DocumentationController.findDocumentationById
    ], CommentController.getAllCommentsForDocumentation)

//add new comment
router.post('/api/documentation/:documentationId/comments',
    [
        Auth.userAuth,
        DocumentationController.findDocumentationById,
        CommentController.addNewComment
    ], DocumentationController.bindCommentToDocumentation)

//update comment
router.put('/api/documentation/:documentationId/comments',
    [
        Auth.userAuth,
        CommentController.getCommentById
    ], CommentController.updateComment)

//delete comment
router.delete('/api/documentation/:documentationId/comments',
    [
        Auth.userAuth,
        CommentController.getCommentById,
        DocumentationController.findDocumentationById,
        CommentController.deleteComment
    ], DocumentationController.pullCommentAfterDeleting)

// PROJECT

router.get('/api/project/:projectId',
    [Auth.userAuth,
    ProjectController.getProjectById
    ],
    ProjectController.getProjectDetails)

router.get('/api/projects/public',
[Auth.userAuth,
    ],
    ProjectController.getAllPublicProjects)

router.get('/api/user/projects/owned',
    [Auth.userAuth,
        UserController.findUserById,
    ],
    ProjectController.getAllOwnedProjectsForUser)

router.get('/api/user/projects/accessed',
    [Auth.userAuth,
        UserController.findUserById,
    ],
    ProjectController.getAllAccessedProjectsForUser)

router.post('/api/project',
    [Auth.userAuth,
        ProjectController.addNewProject
    ],
    UserController.addProjectForOwner)

router.post('/api/project/:projectId/addUser',
    [Auth.userAuth,
        UserController.findUserById,
        ProjectController.getProjectById,
        UserController.checkIfUserAlreadyHasAccessToProject,
        Auth.checkIfUserIsProjectOwner,
        ProjectController.addUserToProject
    ],
    UserController.addProjectToAccessedProjects)

router.post('/api/project/:projectId/deleteUser',
    [Auth.userAuth,
        UserController.findUserById,
        ProjectController.getProjectById,
        UserController.checkIfUserAlreadyHasAccessToProject,
        Auth.checkIfUserIsProjectOwner,
        ProjectController.removeUserFromProject
    ],
    UserController.pullProjectFromAccessedProjects)

router.post('/api/project/:projectId/addDocumentation',
    [Auth.userAuth,
        DocumentationController.addNewDocumentation,
        DocumentationController.findDocumentationById,
        ProjectController.getProjectById,
        Auth.checkIfUserIsProjectOwner,
    ],
    ProjectController.addDocumentationToProject)

router.post('/api/project/:projectId/pullDocumentation',
    [Auth.userAuth,
        DocumentationController.findDocumentationById,
        ProjectController.getProjectById,
        Auth.checkIfUserIsProjectOwner,
    ],
    ProjectController.pullDocumentationFromProject)

router.put('/api/project/:projectId',
    [
        Auth.userAuth,
        ProjectController.getProjectById,
        Auth.checkIfUserIsProjectOwner,
    ],
    ProjectController.editProject)

router.delete('/api/project/:projectId',
    [Auth.userAuth,
        ProjectController.getProjectById
    ],
    ProjectController.deleteProject)

module.exports = router;
