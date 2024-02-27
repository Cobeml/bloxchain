import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";


const s3Client = new S3Client({
    region: "us-east-1", // Specify your bucket region
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!, // Specify your access key ID
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY! // Specify your secret access key
    }
});
const streamToString = (stream: Readable): Promise<string> => {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.once("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
        stream.once("error", reject);
    });
};
const bucketName = "ai-crypto-app-6969696969";
export function randomURL(): string {
    const val: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let result: string = "";
    for (let i = 0; i < 20; i++) {
        result += val[Math.floor(Math.random() * val.length)];
    }
    return result;
}

export async function uploadObject(code: string): Promise<string | void> {
    const objectKey = randomURL(); // Generate a random key for the object
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
        Body: code,
    });

    try {
        const response = await s3Client.send(command);
        console.log("Successfully uploaded object", response);
        return objectKey; // Return the key of the uploaded object
    } catch (error) {
        console.error("Error uploading object", error);
        throw error;
    }
}
export async function retrieveObject(objectKey: string): Promise<string | void> {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
    });

    try {
        const response = await s3Client.send(command);
        if (response.Body) {
            // Convert the stream to a string
            const bodyContent = await streamToString(response.Body as Readable);
            return bodyContent;
        } else {
            throw new Error("Empty body response");
        }
    } catch (error) {
        console.error("Error retrieving object", error);
        throw error;
    }
}