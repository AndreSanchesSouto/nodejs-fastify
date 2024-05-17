import { randomUUID } from 'node:crypto' 

export class DatabaseMemory {
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries())
        .map((video) => {
            const id = video[0]
            const data = video[1]

            return {
                id,
                ...data
            }
        })
        .filter(video => {
            if (search) {
                console.log(video.title.includes(search))
                return video.title.includes(search)
            }
            return true
        }) 

    }

    create(video) {
        const videoId = randomUUID();
        this.#videos.set(videoId, video)
    }
    
    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}