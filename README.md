# Coding test result

### Flowchart

![List view](./img/diagram.png)

### API: 
In order to improve the user experience, my approach is to separate the frontend calls from the api using mongo and cache on the backend. 
Every time express loads, it makes a copy of the member list provided by the api provided and stores it in the cache, too. Due to the fact that every day at 00:30 the member list is updated, at 4:00 mongo makes an update of its database from the api and reloads it on the cache again. This way the user doesn’t have to cope with the annoying delays of the given api. In response to every call from the client side, express checks node´s cache and if it fails, then checks mongo data base. If neither of them worked, it would make an api request, as the last resource.

### Fixing the data: 
After each insert in mongo data base, the wrong fields are replaced by a standard text “Missing data”. When it comes to the profile picture, if the string doesn’t match a valid url it´s replaced by a default picture. Given the case that the string is correct but the picture is not online, there’s another function in the frontend that replaces it. 
As an extra, a message in the backend will display all the members fields that need to be fixed.

The rest of the requirements that have been fulfilled: responsive web app, requested user interface and master-detail.


### Tools: 
- Node-cron: schedule update
- Node-cache
- Axios: promise based HTTP client
- Mongodb Atlas
- React



### URL && ENV
- Client will be running on [http://localhost:3000](http://localhost:3000).
- Server will be running on [http://localhost:5000](http://localhost:5000).

DBURL=mongodb://localhost:27017/mediasmart
API_KEY=mediasmart2019
MONGO_URL=mongodb+srv://fer:1234@cluster0-p7cfx.mongodb.net/mediasmart?retryWrites=true&w=majority




Thank you!
Fernando de la Torre
fernandodelatorre4@gmail.com
630023818





