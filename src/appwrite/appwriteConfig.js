import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from 'appwrite';


export class Service {
    Client = new Client();
    databases;
    bucket;
    // initializing db
    constructor() {
        this.Client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({ title, slug, content, image, status, userId, cardContent, authorName }) {
        try {
            return await this.databases.createDocument(config.databaseId, config.collectionId, ID.unique(),
                {
                    title,
                    slug,
                    content,
                    slug,
                    image,
                    status,
                    userId,
                    cardContent,
                    authorName,
                })
        } catch (error) {
            console.error("error while posting content", error)
        }
    }

    async updatePost(documentId, {
        title,
        content,
        image,
        status,
        slug,
        cardContent,
        authorName,
    }) {
        try {
            return await this.databases.updateDocument(config.databaseId, config.collectionId, documentId,
                {
                    title,
                    content,
                    image,
                    status,
                    slug,
                    cardContent,
                    authorName,
                })
        } catch (error) {
            console.error('error updating content', error)
        }
    }

    async deletePost(dbId) {
        try {
            return await this.databases.deleteDocument(config.databaseId, config.collectionId, dbId)

        } catch (error) {
            console.error('error deleting content', error)
        }
    }

    async getPost(docId, query = []) {
        try {
            return await this.databases.getDocument(config.databaseId, config.collectionId, docId, query)

        } catch (error) {
            console.error('error fetching content', error)
        }
    }

    async listAllPost(query = [


        Query.equal("status", ["active"]),

        Query.orderDesc('$updatedAt'),
        Query.orderDesc('$createdAt')



    ],) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                query)

        } catch (error) {
            console.error('error fetching contents', error)
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("error uploading file ", error);
        }
    }
    async deleteFile(fileId) {

        try {
            return await this.bucket.deleteFile(config.bucketId,
                fileId,
            )
        } catch (error) {
            console.error("error deleting file ", error);
        }
    }

    async getFilePreview(fileId) {
        if (fileId)

            return this.bucket.getFileView(
                config.bucketId,
                fileId,
            )
    }

}





const service = new Service();
export default service