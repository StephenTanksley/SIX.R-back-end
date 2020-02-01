const bcrypt = require('bcryptjs')
const db = require('../../config/dbConfig')

const get = () => {
    return db('users')
        .select('id', 'username')
}

const getBy = (filter) => {
    return db('users')
        .where(filter)
        .select(['id', 'username', 'password'])
}

const getById = async (id) => {
    const user = await db('users')
        .where({ id })
        .first('id', 'username')

    const projects = await db('projects')
        .where('user_id', id)
        .select('project_id', 'user_id', 'title', 'description', 'goal_amount', 'amount_received', 'funding_completed')

    projects.map((project) => {
        return {...project, funding_completed: project.funding_completed === 1 ? true : false }
    })
    return {...user, projects}
}

const add = async (user) => {
    user.password = await bcrypt.hash(user.password, 10)
    const [id] = await db('users')
        .insert(user)
    return getById(id)
}

const update = async (id, changes) => {
    await db('users')
        .where({ id })
        .update(changes)
        
        return getById(id)
}

const remove = (id) => {
    return db('users')
        .where({ id })
        .del()
}

module.exports = {
    get,
    getBy,
    getById,
    add,
    update,
    remove
}