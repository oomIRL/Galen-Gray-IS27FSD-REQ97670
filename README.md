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

[architecture diagram](https://drive.google.com/file/d/15mILiUbRpFdHnTfoW-R0H7jHuVbLYNOp/view?usp=sharing)

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
The Backend component supports Get, Post, Put, Delete requests made to the /staff directory, ex:
```
GET host/staff      // returns all staff
GET host/staff/:id  // returns one staff with matching ID
POST host/staff/    // creates new staff member
PUT host/staff/:id  // updates staff member with matching ID
DELETE host/staff/:id   // deletes staff member with matching ID
```

### The Frontend Component
The Frontend component displays a 5-level staff directory. The staff are displayed in a tree structure hierarchy.
Clicking the name of an employee will open a modal dialog allowing the user to Edit employee/position details. The position can also be marked as Vacant.
The employee can also be deleted if they're below Director-level and no staff are directly below them.
<sub>Note: Deletion doesn't update the existing position number fields, so they can get messed up. But, since deletion wasn't a requiement I consider this more of a feature than a bug.</sub>
Oh, and clicking the background will close the modal dialogs.
