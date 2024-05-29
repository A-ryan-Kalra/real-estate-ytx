<h3>Website is live and running at  <a href="https://real-estate-ytx.onrender.com/">real-esate</a>
</h3>
<div>
<div align="center"><img src="/client/public/docker.png" /></div>
</div>

<div align="center">
<h4>Please wait for a while as the server may take some time to spin up.</h4>
</div>

<h2>Authors</h2>
<ul>
<li><a href="https://github.com/A-ryan-Kalra">Aryan Kalra</a></li>
</ul>
</br>

<h1>Features</h1>

<h3>Note</h3>
<ul>
<li>Admin Dashboard is only accessible to authorized users.However, User has to register an account in order to create a listing of their property.</li>
<li>Feel free to visit.</li>
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
<li>Nginx</li>
<li>Mongoose</li>
<li>MongoDb</li>
<li>React</li>
<li>Express.js</li>
<li>Nodejs</li>
<li>RESTful API</li>
<li>Tailwind CSS</li>
<li>Redux toolkit</li>
<li>React Spinners</li>
<li>JSON Web Token(JWT)</li>
<li>Firebase Storage</li>
<li>Bcrypt</li>
</ul>

</br>
<h2>Enviroment Variables</h2>
<h3>To run this project, you will need to add the following enviroment variables to your .env file</h3>

> [!NOTE] > <code>DATABASE_URL</code>=Your supabase database url, It could be achieved by creating a database in mongodb in order to run this project
> <code>JWT_Token</code>=It could be any secret key
> [Optional]<code>FIREBASE_API_KEY</code>=You can obtain firebase api key by creating an account on firebase

<br/>

<h2>Installation</h2>
<br/>

**DOCKER**

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

You can also visit [http://localhost](http://localhost) and check for production stage since It's running on Nginx for reverse proxy so It will server static html files on deafult port 80.

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
