import { createExperience, deleteExperience, findExperiences, updateExperience, findExperiencesById } from "../experiences_storage.js";
import { json } from 'stream/consumers'

export async function findAll (req, res){
    return findExperiences()

}

export async function find (req, res, id){
    return findExperiencesById(id)
}

export async function create (req, res){
    return createExperience(await json(req))
}

export async function remove (req, res, id){
    await deleteExperience(id)
    res.writeHead(204)
}

export async function update(req, res, id){
    return updateExperience(id, (await json(req)))
}

