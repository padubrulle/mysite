import { findExperiencesById, findExperiences, createExperience, deleteExperience } from '../controller/experiences_storage.js'
import assert from 'assert'

after('remove last exp added by test to avoid to overpopulate datas (temporary solution)', async function(){
    const experiences = await findExperiences()
    await deleteExperience(experiences.length)
})

describe('Test des endpoints experiences', () => {
    it('should return an array with id value', async function(){
        const experience = await findExperiencesById(1)
        
        assert.equal(experience[0].employer, "SP Informatique", `${experience[0].employer} n'est pas égale à "SP Informatique"`)
        assert.equal(experience[0].id, 1, `${experience[0].id} n'est pas égale à 1`)
        assert.equal(experience[0].jobName, "Technicien Informatique", `${experience[0].jobName} n'est pas égale à "Technicien Informatique"`)
    })

    it('should return a count value +1 when adding an experience', async function(){
        const experiences = await findExperiences()
        const expCount = experiences.length;

        await createExperience({employer: "test",jobName: "QA"})

        const experiencesAfter = await findExperiences()
        assert.equal(expCount+1, experiencesAfter.length, `Le nombre d'expériences n'a pas augmenté`)
    })
})