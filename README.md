# The Phonebook - backend

This is the backend for the Phonebook assignment in the fullstackopen course.
The full app with the frontend is currently deployed [here](https://render-test-tjdg.onrender.com/)
The API is currently deployed to render [here](https://render-test-tjdg.onrender.com/api/persons/)

---

## How to use.

For backend only:

1. Clone this repo
2. Sign up to MongoDB atlas and make a database
3. Create a .env file in the root of this repo and set a variable `MONGODB_URI=<Your link to MongoDB>`
4. `npm install` in the terminal
5. `npm run dev` in the terminal to run this locally.

For full application:

1. Create an empty folder with the name f.ex "Phonebook_App"
2. Navigate into said folder in the terminal and clone this repo.
3. While still in the "Phonebook_App" folder, also clone (the frontend of the project)[https://github.com/SemanticDolphin/FSO_PhonebookFrontend]
4. Navigate into the backend directory and follow the steps above.
5. Navigate into the frontend directory and install all dependecies with `npm install`
6. Navigate into the backend directory again and run `npm run dev` and visit your app at localhost:3001

Alternatively, you can do the (fullstackopen)[https://fullstackopen.com] course for free online and learn to make this yourself.
