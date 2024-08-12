# Alexis Firebase Template

## Overview

**Alexis Firebase Template** is a React-based web application that integrates seamlessly with Firebase to provide a robust platform for image uploading, and user management. It includes features like user authentication and a contact form with email functionality powered by Firebase Functions and Mailjet.

## Features

- **Image Upload**: Users can upload images directly to Firebase Storage.

- **User Authentication**: Provides user registration and login using Firebase Authentication.

- **Contact Form**: Allows users to send inquiries via a form, with emails sent using Mailjet.

## Installation

To set up this project locally, follow these steps:

1.  **Clone the repository**: Obtain the project from your GitHub repository and navigate to its directory.

```bash
git clone https://github.com/alexi-o/alexis-firebase-template.git
cd alexis-firebase-template
```

2.  **Install dependencies**: Use your package manager to install all required dependencies for the project.

```bash
npm install
```

3.  **Configure Firebase**: Set up a Firebase project, enable necessary services, and obtain configuration details for integration.
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
1.  Create a new project.
1.  Enable Firebase Authentication, Firestore, and Storage.
1.  Add a web app to your project to obtain the Firebase configuration details.

1.  **Set up environment variables**: Create a `.env` file with the required Firebase configuration details.

Add the following variables to your `.env` file:

```plaintext
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

5.  **Start the development server**: Run the project locally to view it in your browser.

```bash
npm start
```

6.  **Deploy Firebase Functions**: Use Firebase CLI to deploy your serverless functions.

1.  Install the Firebase CLI if you haven't already.

1.  Log in to your Firebase account using the CLI.

1.  Navigate to the `functions` directory of your project.

1.  Deploy your functions using the following command:

```bash
firebase deploy --only functions
```

## Usage

- **Image Upload**: Visit the image upload page to add new images to Firebase Storage.
- **Authentication**: Use the registration and login pages to manage user accounts.
- **Contact Form**: Access the contact page to send inquiries via email.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Firebase**: Provides backend services for authentication, storage, and hosting.
- **Material-UI**: UI components for React applications.
- **Mailjet**: Email service for sending contact form submissions.

## Upcoming Features

- **Metadata Extraction**: Automatically extracts and displays metadata for uploaded images. I'm working on deploying this feature to a production environment. You can check the progress on this feature by visiting the [Meta Scraper GitHub repository](https://github.com/alexi-o/meta-scraper).

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your branch.

5. Submit a pull request for review.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, please contact [ohearnalexi@gmail.com](mailto:ohearnalexi@gmail.com).
