import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { Request, Response } from 'express';

require("dotenv").config();

const MY_Verfied_TOKEN= process.env.MY_TOKEN

interface WebhookBody {
    object: string;
    entry: Array<{
        id: string;
        time: number;
        messaging: Array<{
            sender: { id: string };
            recipient: { id: string };
            timestamp: number;
            message?: {
                mid: string;
                text: string;
            };
            postback?: {
                title: string;
                payload: string;
            };
        }>;
    }>;
}
// Handles messages events
// function handleMessage(sender_psid, received_message) {

// }
const getWebhook = async (req: Request, res: Response): Promise<void> => {

    let Verified_Token = MY_Verfied_TOKEN

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === Verified_Token) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.status(403);
        }
    }

};

const postWebhook = async (req: Request<{}, {}, WebhookBody>, res: Response): Promise<void> => {
    const body = req.body;

    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });

    // Check if the webhook is from a page subscription
    if (body.object === "page") {
        // Iterate over each entry
        body.entry.forEach((entry: WebhookBody["entry"][0]) => {
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        // Respond with '200 OK' to acknowledge receipt of the event
        res.status(200).send("EVENT_RECEIVED");
    } else {
        // Return a '404 Not Found' if the event is not from a page subscription
        res.sendStatus(404);
    }
};


// Sends response messages via the Send API
//   function callSendAPI(sender_psid, response) {

//   }  

export const fbMessenger_functions = {
    getWebhook,
    postWebhook

}