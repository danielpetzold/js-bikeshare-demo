This is a console app that allows you to create static, encrypted auth tokens to use with Visualize.js requests for the BikeShare demo website.
For each user, specify command line parameters:

-o:orgname[,orgname...]
-u:userName
-r:rolename[,rolename...]

We're omitting the expiration here for the sake of having a static token that never expires (for the demo). 
You'd never use this in any "real" production environment elsewhere.