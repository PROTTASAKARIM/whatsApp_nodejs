# Integrate Whatsapp API with Node.js

Integrate Whatsapp API with Node.js. Using Axios.

# Routes
* http://localhost:3000/api/whatsapp/template
* http://localhost:3000/api/whatsapp/customTemplate
* http://localhost:3000/api/whatsapp/text
* http://localhost:3000/api/whatsapp/media


json file in req.body 
```
{
  "phones": [
    "8801687142825"
  ],
  "url":"https://graph.facebook.com/v21.0/465650199970097/messages",
  "photourl":"https://dummyimage.com/600x400/000/fff.png&text=manfra.io",
  "text":"this is my media",
  "caption":"this is my media"
}

```

### Version: 1.0.0

### Usage

```sh
$ npm install
```

```sh
$ npm run start:prod
```

# run for fb 
first run a powersell 
```
npm run start:prod
```
then run this on gt bash
```
curl -X GET "localhost:3000/api/fb/webhook?hub.verify_token=prottasa2345&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
```