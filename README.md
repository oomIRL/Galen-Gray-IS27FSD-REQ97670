# Galen-Gray-IS27FSD-REQ97670
### Organizational Chart CC

## Project Details
The only true prereq for this project is NodeJS. The backend uses NodeJS/Express and employs Mongoose to interface with MongoDB.
The frontend is written in Vue.
The project expects several environmental variables
```
process.env.PORT || 3000 // The backend uses port 3000 unless PORT is specified
DB_URL = mongodb+srv  // A MongoDB connection string is required
VUE_APP_API_URL = localhost:3000 // The address for the backend API server

```

## Project setup
```
npm install
```

### Compiles Frontend and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Runs the Backend API Server
```
npm start
```

TODO: An architecture diagram

### Back End Files
1. server.js
  - The NodeJS/Express + Mongoose API Server. Supports Get, Post, Put, Delete requests to /staff
2. models/staff.js
  - The schema model for the Staff MongoDB elements

### Front End Files
1. src/App.vue
  - The base Vue App, I didn't really change it
2. src/views/HomeView.vue
  - The only view used. It displays a banner and contains the OrgChart component. It also fetches staff data from the API Server.
3. src/components/OrgChart.vue
  - This component creates the top level of the staff directory hierarchy. Contains a ChartElement component for the director.
4. src/components/ChartElement.vue
  - The ChartElement component fills out the tree-structure by rendering the top-level employee and then moving down the child nodes.
5. src/components/CreateElement.vue
  - Create New Staff. Invoked via a Modal pop up. Specify Name, Position Name, and Employee ID.
6. src/components/UpdateElement.vue
  - Update/Delete Staff. Also Modal. Update Name, Position Name, and Employee ID. Or mark Vacant. Delete is only available below Director-level and w/o child nodes
7. src/assets/blankprofile.jpeg
  - a blank profile pic for each employee

### Hosting Service Deployment
I'm hosting this project on Render, I'm using the free-tier level. I've created two Web Services using this GitHub repo

The Back End setup
```
Environmental Variable: DB_URL = MongoDB Connection String
Build Command: npm install
Start Command: npm start
```

The Front End setup
```
Environmental Variable: VUE_APP_API_URL = The Back End Render URL
Build Command: npm install
Start Command: npm run serve
```

## Instructions
### The Backend Component
### The Frontend Component
