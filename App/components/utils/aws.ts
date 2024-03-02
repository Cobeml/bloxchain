import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: "AKIAZB55MEJTS36KNS2U",
    secretAccessKey: "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",
    region: "us-east-1"
});

const Bucket = "ai-crypto-app-6969696969";

export async function uploadFile(file: File): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
        // Generate file name
        const fileName = `${Date.now()}-${file.name}`;

        // Read the file
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = async function () {
            const arrayBuffer = reader.result as ArrayBuffer;

            // Prepare S3 upload parameters
            const params = {
                Bucket, // replace with your bucket name
                Key: fileName,
                Body: new Buffer(arrayBuffer),
                ContentType: file.type,
            };

            try {
                // Upload the file
                const result = await s3.upload(params).promise();

                // Return the URL of the uploaded file
                resolve(result.Location);
            } catch (error) {
                console.error('Upload failed:', error);
                reject(null);
            }
        };

        reader.onerror = function () {
            console.error('File read failed');
            reject(null);
        };
    });
}
