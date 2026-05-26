import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import type {FastifyInstance} from 'fastify'

import {config} from '../config.js'

interface UploadBody {
    fileName: string
    data: string
}

interface UploadResponse {
    url: string
}

export async function registerUploadRoutes(app: FastifyInstance): Promise<void> {
    // Ensure uploads directory exists
    fs.mkdirSync(config.uploadsDir, {recursive: true})

    // POST /upload — accept base64 image, save to disk, return URL
    app.post<{ Body: UploadBody; Reply: UploadResponse }>('/upload', async (request, reply) => {
        const {fileName, data} = request.body as UploadBody

        if (!data) {
            return reply.code(400).send({error: 'Missing "data" field'})
        }

        const ext = resolveExtension(fileName || '', data)
        const id = crypto.randomUUID()
        const filename = `${id}${ext}`
        const filePath = path.join(config.uploadsDir, filename)

        const buffer = decodeBase64(data)
        await fs.promises.writeFile(filePath, buffer)

        const url = `/uploads/${filename}`
        return reply.send({url})
    })

    // GET /uploads/:filename — serve uploaded files
    app.get('/uploads/:filename', async (request, reply) => {
        const {filename} = request.params as { filename: string }

        // prevent path traversal
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return reply.code(400).send({error: 'Invalid filename'})
        }

        const filePath = path.join(config.uploadsDir, filename)

        if (!fs.existsSync(filePath)) {
            return reply.code(404).send({error: 'File not found'})
        }

        const ext = path.extname(filename).toLowerCase()
        const contentType = resolveContentType(ext)
        const buffer = await fs.promises.readFile(filePath)

        return reply.header('Content-Type', contentType).send(buffer)
    })
}

function resolveExtension(fileName: string, data: string): string {
    if (fileName) {
        const ext = path.extname(fileName).toLowerCase()
        if (ext && ext.length <= 5) return ext
    }

    if (data.startsWith('data:')) {
        const semi = data.indexOf(';')
        const mime = semi !== -1 ? data.slice(5, semi) : ''
        if (mime === 'image/jpeg') return '.jpg'
        if (mime === 'image/png') return '.png'
        if (mime === 'image/webp') return '.webp'
        if (mime === 'image/gif') return '.gif'
    }

    return '.jpg'
}

function decodeBase64(data: string): Buffer {
    if (data.startsWith('data:')) {
        const comma = data.indexOf(',')
        if (comma !== -1) {
            return Buffer.from(data.slice(comma + 1), 'base64')
        }
    }
    return Buffer.from(data, 'base64')
}

function resolveContentType(ext: string): string {
    switch (ext) {
    case '.png':
        return 'image/png'
    case '.webp':
        return 'image/webp'
    case '.gif':
        return 'image/gif'
    case '.jpg':
    case '.jpeg':
    default:
        return 'image/jpeg'
    }
}
