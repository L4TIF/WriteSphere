import { Client, ID, Account } from "appwrite";
import config from "../config/config";

//creating wrapper for appwrite services
export class AuthService {
    Client = new Client();
    account;
    // constructor for creating account
    constructor() {
        this.Client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
        this.account = new Account(this.Client);
    }

    //creating new account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            // redirect to login after sign up
            if (userAccount) {
                return this.login({ email, password });
            }
            else {
                return userAccount
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    //login in user
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //get current user
    async getCurrentUser() {

        try {
            return await this.account.get();
        } catch (error) {
            console.log('Error getting user', error)
        }
        return null
    }

    //logout from session 
    async deleteSession() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("cannot delete session", error)
        }
    }
}

const authService = new AuthService();

export default authService