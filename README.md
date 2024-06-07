<h3>Website is live and running at  <a href="https://real-estate-ytx.vercel.app/">real-esate</a>
</h3>
<div>
<div align="center"><img src="/client/public/docker.png" /></div>
</div>

<h2>Authors</h2>
<ul>
<li><a href="https://github.com/A-ryan-Kalra">Aryan Kalra</a></li>
</ul>
</br>

<h1>Features</h1>

> [!NOTE]
>
> <ul>
> <li>Admin Dashboard is only accessible to authorized users.However, User has to register an account in order to create a listing of their property.</li>
> <li>The project also includes a PWA extension, allowing you to easily access this website on your phone and have the same experience as when using the regular app.</li>
> <li>Feel free to visit.</li>

</ul>
</br>

 <h2>User Panel</h2>
  <ul>
  <li>User can create a listing as per their convenience. ✔</li>
  <li>The platform offers users the flexibility to put their property up for rent or sale. ✔</li>
  <li>Users have the opportunity to share their feedback about the property or their stay in the house. ✔</li>
  <li>Search functionality is also included that allows user to search particular product. ✔</li>
  <li>Users can create, edit or delete their commment along with liking functionality. ✔</li>
  <li>Users can search properties with the help of custom functionalities. ✔</li>
  <li>User can also upload their property images while listing for rent or sale. ✔</li>
  <li>The platform also offers Users the functionality to contact landlord of the listing for further discussion regarding property. </li>
  </ul>
</br>
 
 <h2>Admin Panel</h2>
 <ul>
  <li>Admin has the flexibility to supervise all the listings. ✔</li>
  <li>Admin can can edit, delete user's comment and much more. ✔</li>
  <li>Admins can delete user's listing if they find something suspicious ✔</li>
 </Ul>

</br>

<h1>Tech</h1>
<ul>
<li>Typescript</li>
<li>Docker</li>
<li>PWA</li>
<li>Nginx</li>
<li>Mongoose</li>
<li>MongoDb</li>
<li>React</li>
<li>Express.js</li>
<li>Nodejs</li>
<li>Tailwind CSS</li>
<li>Redux toolkit</li>
<li>JSON Web Token(JWT)</li>
<li>Firebase Storage</li>
<li>Bcrypt</li>
</ul>

</br>
<h2>Enviroment Variables</h2>
<h3>To run this project, you will need to add the following enviroment variables to your .env file</h3>

> [!CAUTION]
> Make sure to assign the environment variables before proceeding further.

> <code>DATABASE_URL</code>=Your supabase database url, It could be achieved by creating a database in mongodb in order to run this project

> <code>JWT_Token</code>=It could be any secret key

> <code>FIREBASE_API_KEY</code>=You can obtain firebase api key by creating an account on firebase

<br/>

<h2>Installation</h2>
<br/>

<svg xmlns="http://www.w3.org/2000/svg" height="18" width="27" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#74C0FC" d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4 .4 67.6 .1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z"/></svg> **DOCKER**

> [!IMPORTANT]
> Make sure to include .env file for both server and client directory before the build.

Build image using docker compose as It will spin up necessary containers based on each configured docker compose file.

```bash
# It will build image for development stage
docker compose -f compose.yaml -f compose.dev.yaml up -d --build
```

Open [http://localhost:3000](http://localhost:3000) for development stage as It will allow you to start making changes inside the webpage.

```bash
# It will build image for production stage
docker compose -f compose.yaml -f compose.prod.yaml up -d --build
```

You can also visit [http://localhost](http://localhost) and check for production stage since It's running on Nginx for reverse proxy so It will serve static html files on deafult port 80.

<h3>Install my project with npm<h3>

```bash
  npm install
  npm run dev (for development server)
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  npm run build (for Production)
  npm run preview (To View Production Server )

```

Open <a href='http://localhost:3000'>http://localhost:3000</a> with your browser to see the result.

<div align="center">

Thank you\
By Aryan Kalra

</div>
