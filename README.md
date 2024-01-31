# React Image Upload and Metadata Generation App

This is a simple web application built using React that allows users to upload images, generate image metadata, and display the uploaded image along with its metadata. The application utilizes a Flask backend as an endpoint to handle image processing and metadata generation.

## Features

- Upload images and receive metadata about the content.
- Display the uploaded image along with its metadata.
- Utilizes a Flask backend for image processing.

## Getting Started

Follow these steps to set up and run the application locally:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/alexi-o/meta-scraper-frontend
   ```

2. Change into the project directory:

   ```bash
   cd rmeta-scraper-frontend
   ```

3. Install the required dependencies for the React app:

   ```bash
   npm install
   ```

4. Start the React app:

   ```bash
   npm start
   ```

5. Open your web browser and navigate to http://localhost:3000 to access the application.

## Backend (Flask) Endpoint

The React app uses a Flask backend as an endpoint for image processing and metadata generation. The Flask app is hosted separately and should be running at the specified endpoint URL.

To set up and run the Flask app, please refer to the following repo:
[Link to Flask API](https://github.com/alexi-o/meta-scraper)
