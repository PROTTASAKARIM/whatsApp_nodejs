import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { Request, Response } from 'express';



const sendTemplateMessage = async (req: Request, res: Response): Promise<void> => {
    // Dynamically casting req.body as an object with a `phones` field
    const { phones,url } = req.body;

    // Validate that the phones array exists and is not empty
    if (!phones || !Array.isArray(phones) || phones.length === 0) {
         res.status(400).json({ error: 'Phone numbers are required and should be in an array.' });
         return
    }

    try {
        // Loop through each phone number and send the message
        for (const phone of phones) {
            // Sending message to each phone number
            await axios({
                url: url,
                // url: 'https://graph.facebook.com/v21.0/465650199970097/messages',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    messaging_product: 'whatsapp',
                    to: phone,  // International format without '+' sign
                    type: 'template',
                    template: {
                        name: 'hello_world',  // Replace with your actual template name
                        language: {
                            code: 'en_US'  // Language code for the template
                        },
                    }
                }
            }).then(response => {
                console.log(`Media message sent to ${phone}:`, response.data);
            })
            .catch(err => {
                console.error('Error sending message:', err);
            });
        }

        // Send success response after all messages are sent
        res.status(200).json({ message: 'Messages sent to all phone numbers.' });
    } catch (error : unknown) {
        // Detailed error logging
        if (axios.isAxiosError(error)) {
            // API responded with an error
            console.error('Error sending message:', error.response?.data || error.message);
             res.status(500).json({ error: error.response?.data || error.message });
             return
        } else if (error instanceof Error) {
            // General error, not from axios
            console.error('General error:', error.message);
             res.status(500).json({ error: error.message });
        } else {
            // Unknown error type
            console.error('Unknown error occurred:', error);
             res.status(500).json({ error: 'An unknown error occurred' });
             return
        }
    }
};

const sendTemplateMessageCustomTemplate = async (req:Request, res:Response):Promise<void>  => {
    const { phones,url } = req.body;  // Expecting an array of phone numbers

    // Validate that the phones array exists and is not empty
    if (!phones || !Array.isArray(phones) || phones.length === 0) {
         res.status(400).json({ error: 'Phone numbers are required and should be in an array.' });
         return
    }

    try {
        // Loop through each phone number and send the custom template message
        for (const phone of phones) {
            // Sending message to each phone number using the custom template
             await axios({
                url: url,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    messaging_product: 'whatsapp',
                    to: phone,  // International format without '+' sign
                    type: 'template',
                    template: {
                        // name: 'dicount',  // Using your custom template name
                        name: 'testing_prottasa',  // Using your custom template name
                        language: {
                            code: 'en_US'
                        },
                        // components: [
                        //     {
                        //         type: 'header',
                        //         parameters: [
                        //             {
                        //                 type: 'text',
                        //                 text: '40'  // Example text for the header parameter
                        //             }
                        //         ]
                        //     },
                        //     {
                        //         type: 'body',
                        //         parameters: [
                        //             {
                        //                 type: 'text',
                        //                 text: 'upto 50'  // Example text for the body parameter
                        //             }
                        //         ]
                        //     }
                        // ]
                    }
                }
            }).then(response => {
                console.log(`Custom template message sent to ${phone}:`, response.data);
            })
            .catch(err => {
                console.error('Error sending message:', err);
            });
        }

        // Send success response after all messages are sent
        res.status(200).json({ message: 'Messages sent to all phone numbers.' });
    } catch (error : unknown) {
        // Detailed error logging
        if (axios.isAxiosError(error)) {
            // API responded with an error
            console.error('Error sending message:', error.response?.data || error.message);
             res.status(500).json({ error: error.response?.data || error.message });
             return
        } else if (error instanceof Error) {
            // General error, not from axios
            console.error('General error:', error.message);
             res.status(500).json({ error: error.message });
             return
        } else {
            // Unknown error type
            console.error('Unknown error occurred:', error);
             res.status(500).json({ error: 'An unknown error occurred' });
             return
        }
    }
};

const sendTextMessage = async (req:Request, res:Response): Promise<void>   => {
    const { phones,url,text } = req.body;  // Expecting an array of phone numbers
console.log('phones,url,text',phones,url,text)
    // Validate that the phones array exists and is not empty
    if (!phones || !Array.isArray(phones) || phones.length === 0) {
         res.status(400).json({ error: 'Phone numbers are required and should be in an array.' });
         return
    }

    try {
        // Loop through each phone number and send the text message
        for (const phone of phones) {
            // Sending message to each phone number using the text message API
             await axios({
                url: url,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    messaging_product: 'whatsapp',
                    to: phone,  // International format without '+' sign
                    type: 'text',
                    text: {
                        body: text // Text message content
                    }
                }
            }).then(response => {
                console.log(`Text message sent to ${phone}:`, response.data);
            })
            .catch(err => {
                console.error('Error sending message:', err);
            });
        }

        // Send success response after all messages are sent
        res.status(200).json({ message: 'Messages sent to all phone numbers.' });
    } catch (error : unknown) {
        // Detailed error logging
        if (axios.isAxiosError(error)) {
            // API responded with an error
            console.error('Error sending message:', error.response?.data || error.message);
             res.status(500).json({ error: error.response?.data || error.message });
             return
        } else if (error instanceof Error) {
            // General error, not from axios
            console.error('General error:', error.message);
             res.status(500).json({ error: error.message });
             return
        } else {
            // Unknown error type
            console.error('Unknown error occurred:', error);
             res.status(500).json({ error: 'An unknown error occurred' });
             return
        }
    }
};



const sendMediaMessage = async (req:Request, res:Response): Promise<void>  => {
    const { phones,url ,photourl,caption} = req.body;  // Expecting an array of phone numbers

    // Validate that the phones array exists and is not empty
    if (!phones || !Array.isArray(phones) || phones.length === 0) {
         res.status(400).json({ error: 'Phone numbers are required and should be in an array.' });
         return
    }
    if (!url || !photourl) {
        res.status(400).json({ error: 'Both URL and photourl are required.' });
        return;
    }

    try {
        // Loop through each phone number and send the media message
        for (const phone of phones) {
            // Sending media (image) to each phone number using the media message API
             await axios({
                url:url,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    messaging_product: 'whatsapp',
                    to: phone,  // International format without '+' sign
                    type: 'image',
                    image: {
                        link: photourl,  // Image URL
                        // link: 'https://dummyimage.com/600x400/000/fff.png&text=manfra.io',  // Image URL
                        caption: caption  // Image caption
                    }
                }
            }).then(response => {
                console.log(`Media message sent to ${phone}:`, response.data);
            })
            .catch(err => {
                console.error('Error sending message:', err);
            });
        }

        // Send success response after all messages are sent
        res.status(200).json({ message: 'Media messages sent to all phone numbers.' });
    } catch (error : unknown) {
        // Detailed error logging
        if (axios.isAxiosError(error)) {
            // API responded with an error
            console.error('Error sending message:', error.response?.data || error.message);
             res.status(500).json({ error: error.response?.data || error.message });
             return
        } else if (error instanceof Error) {
            // General error, not from axios
            console.error('General error:', error.message);
             res.status(500).json({ error: error.message });
             return
        } else {
            // Unknown error type
            console.error('Unknown error occurred:', error);
             res.status(500).json({ error: 'An unknown error occurred' });
             return
        }
    }
};




// Function to upload the image to WhatsApp API
// const uploadImage = async (): Promise<string> => {
//     try {
//         const data = new FormData();
//         data.append('messaging_product', 'whatsapp');
//         data.append('file', fs.createReadStream(process.cwd() + '/logo.png'), { contentType: 'image/png' });
//         data.append('type', 'image/png');

//         // Upload image to WhatsApp API
//         const response = await axios({
//             url: 'https://graph.facebook.com/v20.0/465650199970097/media',
//             method: 'post',
//             headers: {
//                 'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                 ...data.getHeaders(),  // Include form-data headers
//             },
//             data: data,
//         });

//         console.log('Image uploaded successfully:', response.data);
//         return response.data.id;  // Return the media ID
//     } catch (error) {
//         console.error('Error uploading image:', error.response ? error.response.data : error.message);
//         throw error;  // Throw error if upload fails
//     }
// };

// Function to send media (image) message to multiple phone numbers
// const sendImageMessageToMultiplePhones = async (phones: string[], mediaId: string): Promise<void> => {
//     try {
//         // Loop through each phone number and send the media message
//         for (const phone of phones) {
//             const response = await axios({
//                 url: 'https://graph.facebook.com/v21.0/465650199970097/messages',
//                 method: 'post',
//                 headers: {
//                     'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                     'Content-Type': 'application/json',
//                 },
//                 data: {
//                     messaging_product: 'whatsapp',
//                     to: phone,  // International format without '+' sign
//                     type: 'image',
//                     image: {
//                         id: mediaId,  // Use the media ID from the uploaded image
//                         caption: 'This is your uploaded image',
//                     },
//                 },
//             });

//             console.log(`Image message sent to ${phone}:`, response.data);
//         }
//     } catch (error) {
//         console.error('Error sending image message:', error.response ? error.response.data : error.message);
//     }
// };

// Main function to handle the image upload and send media message
// const uploadAndSendImage = async (req: Request, res: Response): Promise<void> => {
//     const { phones } = req.body;  // Expecting an array of phone numbers

//     // Validate phones array
//     if (!phones || !Array.isArray(phones) || phones.length === 0) {
//      res.status(400).json({ error: 'Phone numbers are required and should be in an array.' });
//      return
//     }

//     try {
//         // Step 1: Upload the image and get the media ID
//         const mediaId = await uploadImage();

//         // Step 2: Send the uploaded image to multiple phone numbers
//         await sendImageMessageToMultiplePhones(phones, mediaId);

//         // Send success response
//         res.status(200).json({ message: 'Image message sent to all phone numbers.' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to upload and send image.' });
//     }
// };





export const whatsapp_functions={
    sendTemplateMessage,
    sendTemplateMessageCustomTemplate,
    sendTextMessage,
    sendMediaMessage,
    // uploadImage
}