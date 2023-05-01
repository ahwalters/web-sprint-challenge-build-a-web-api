// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
    .then((projects) => {
        res.status(200).json(projects)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json([])
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Project.get(id)
    .then((project) => {
        if (project){
            res.status(200).json(project)
        } else {
            res.sendStatus(404)
        }
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
})


router.post('/', (req, res) => {
    const project = req.body
    if (!project.name || !project.description) {
        res.sendStatus(400)
    } else {
        Project.insert(project)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params
    const changes = req.body
    if (!changes.name || !changes.description || changes.completed === undefined) {
        res.sendStatus(400)
    } else {
        try {
            const updatedProject = await Project.update(id, changes)
            res.status(200).json(updatedProject)
        } catch (error) {
            res.sendStatus(500)
        }
    }
})

router.delete('/:id', async (req, res)=> {
    const {id} = req.params
    const deleted = await Project.remove(id)
    if (deleted) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

router.get('/:id/actions', async (req, res) => {
    const {id} = req.params
    const actions = await Project.getProjectActions(id)
    if (actions) {
        res.status(200).json(actions)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router;