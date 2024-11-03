import { error } from "node:console"
import { write } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { NotFoundError } from "./errors.js"

const path = 'model/experiences.json'


/**
 * @typedef {object} Experience
 * @property {number} id
 * @property {string} employer
 * @property {string} jobName
 * @property {string} jobDescription
 * @property {string} jobLength
 * @returns {Promise<Experience[]>}
 */
export async function findExperiences () {
    const data = await readFile(path, 'utf-8')
    return JSON.parse(data)
}

/**
 * @property {string} employer
 * @property {string} jobName
 * @property {string} jobDescription
 * @property {string} jobLength
 * @returns {Promise<Experience>}
 */
export async function createExperience ({employer, jobName, jobDescription = "", jobLength = ""}) {
    const exps = await findExperiences()
    const nextId = exps.length +1
    const experience = {employer, jobName, jobDescription, jobLength, id: nextId}
    const experiences = [experience, ...await findExperiences()]
    await writeFile(path, JSON.stringify(experiences, null, 2))
    return experience
}


/**
 * @param {number} id 
 * @returns {Promise<Experience>}
 */
export async function findExperiencesById (id) {
    const experiences = await findExperiences()
    try{
        return experiences.filter(exp => exp.id === id)
    }catch(e){
        throw new Error('experience not found')
    }
}

/**
 * @param {number} id 
 * @returns {string}
 */
export async function deleteExperience (id) {
    const experiences = await findExperiences()

    if(await expExists(experiences, id)){
        const exp = experiences.filter(exp => exp.id !== id)
        await writeFile(path, JSON.stringify(exp, null, 2))
    }else{
        throw new NotFoundError()
    }

}

async function expExists(exp, id){
    const expIndex = await exp.findIndex((exp) => { return exp.id == id } )
    if(expIndex === -1){
        return false
    } 
    return true
}

/**
 * 
 * @param {number} id 
 * @property {{ employer?: string, jobName?: string, jobDescription?: string, jobLength?: string}} partialExp
 * @returns 
 */
export async function updateExperience (id, partialExp) {
    const experiences = await findExperiences()
    if(await expExists(experiences, id)){
        const exp = await experiences.find((exp) => { return exp.id === id })
        Object.assign(exp, partialExp)
        await writeFile(path, JSON.stringify(experiences, null, 2))
        return exp
    }else{
        throw new NotFoundError()
    }
}