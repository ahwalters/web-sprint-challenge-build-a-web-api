// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
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
    Actions.get(id)
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
    const action = req.body
    if (!action.notes || !action.description || action.project_id === undefined) {
        res.sendStatus(400)
    } else {
        Actions.insert(action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params
    const action = req.body
    if (!action.notes || !action.description || action.project_id === undefined) {
        res.sendStatus(400)
    } else {
        try {
            const updatedAction = await Actions.update(id, action)
            res.status(200).json(updatedAction)
        } catch (error) {
            res.sendStatus(500)
        }
    }
})

router.delete('/:id', async (req, res)=> {
    const {id} = req.params
    const deleted = await Actions.remove(id)
    if (deleted) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router;