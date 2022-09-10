
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url';
import credentials from './credentials.js';

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = credentials

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const filePath = path.join(__dirname, 'moto.png')

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const uploadImage = async () => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'frame.png',
                mimeType: 'image/png' 
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data)
        
    } catch (err) {
        console.log(err.message)
    }
}

const dowloadVideo = async () => {
    try {
        const result = await drive.files.export({
            fileId: "12KyNa6b-wZJw5HF82xOGh5xzJQYZNQwa",
            mimeType: 'video/mp4',
        });
        console.log(result.status);
        return result;
    } catch (err) {
    // TODO(developer) - Handle error
    throw err;
    }
}

dowloadVideo()