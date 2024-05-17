// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     console.log(`deu`)
//     response.write('tesuaier')
//     return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgresql.js'

//const data = new DatabaseMemory();
const data = new DatabasePostgres()

const server = fastify()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await data.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search
    const videos = await data.list(search)
    return reply.send(videos)
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body
    
    await data.update(videoId, {
        title,
        description,
        duration
    })
    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await data.delete(videoId)
    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})