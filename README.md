# event_management_SES3B
This is a web application which has backend as C#, React, Redux 


How to run the front end files : 

1. Make sure you have npm running 
2. npm start after you cd in to the file where the project is 
3. Install react-router-dom installed npm install --save react-router-dom
4. To-Do : configuration of Material UI for the styling

The file structure for the front end is seperated into folders where there are different folders for different paged i.e home page, login , events etc. These will have components that are unique to these pages. Components that are used commonly should be in the Shared Components. Components and files will have a line of comment describing what the file is about and what in general the functions do.

Front End : React, JS(ES6)
Recommended Editor (Frontend) ; VS Studio Code


When running npm, if the deployment server has the ports already busy (i had some obsecure error here), try killing the process using pid

Running swagger (for now):

1. Run back-end server by opening Visual Studio and run the application by pressing the button in the top middle that has a green play button that would say (IIS Express).
2. A web browser should load to a default URL. If it defaults to http://localhost:{port_number}/api/values change the URL to http://localhost:{port_number}/swagger.

For Frontend People!
IMP
-Do not delete .suo files or .sqln files when doing a git commit
-these files are imp and would give you merge conflict if they are missing from your pull req
