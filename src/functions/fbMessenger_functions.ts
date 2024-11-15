import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { Request, Response } from 'express';



const sendMessage = async (req: Request, res: Response): Promise<void> => {
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
                res.status(200).json({ message: 'Messages sent to all phone numbers.' });
            })
            .catch(err => {
                console.error('Error sending message:', err);
                res.status(504).json({ message: 'Something went wrong ' });

            });
        }

        // Send success response after all messages are sent
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


export const whatsapp_functions={
    sendMessage,
    
   
}