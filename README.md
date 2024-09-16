# WorldTravel - Frontend

WorldTravel is a fully authenticated application where users can sign up, log in, reset passwords, and save or delete cities and countries they have traveled to on an interactive map. The frontend is built using React with state management powered by Redux, and the UI is styled with Tailwind CSS.

## Features

1. **User Sign-up**: Users can sign up with email verification and a profile image.
2. **User Login**: Allows users to log in to their accounts.
3. **Password Reset**: Users can change their passwords.
4. **Traveled Cities & Countries**: Users can save their traveled cities and countries on a map.
5. **Delete Saved Cities**: Users can delete saved cities.
6. **Pagination**: Cities are displayed with pagination for easy navigation.
7. **Full Authentication**: The application ensures that only authenticated users can access the main features.

## Technologies

- React
- Redux Toolkit
- React Query
- React Router
- Axios
- Leaflet (for interactive maps)
- Tailwind CSS
- Vite (for build and development)

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/worldtravel.git
    cd worldtravel/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add the necessary environment variables:
    ```plaintext
    VITE_API_URL=<your-backend-url>
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Build for production:
    ```bash
    npm run build
    ```

## Dependencies

```json
"dependencies": {
    "@reduxjs/toolkit": "^2.2.7",
    "@tanstack/react-query": "^5.54.1",
    "axios": "^1.7.7",
    "dotenv": "^16.4.5",
    "leaflet": "^1.9.4",
    "react": "^18.3.1",
    "react-datepicker": "^7.3.0",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "react-leaflet": "^4.2.1",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.26.1",
    "redux": "^5.0.1",
    "redux-thunk": "^3.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.44",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.1"
  }
