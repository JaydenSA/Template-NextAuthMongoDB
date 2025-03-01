SaaS Template

A fully-featured SaaS boilerplate built with Next.js, NextAuth, MongoDB, and Hygraph CMS, designed to help you kickstart your SaaS project with authentication, user management, and content handling.

🚀 Features

Authentication: Secure user authentication using NextAuth.

User Management: Store and manage user data in MongoDB.

Shipping Details: Integrated shipping address management.

CMS Integration: Content management via Hygraph CMS.

Dark Mode Support: Built-in theme switcher.

🛠️ Tech Stack

Framework: Next.js (App Router)

Authentication: NextAuth.js

Database: MongoDB

CMS: Hygraph

Styling: Tailwind CSS

Deployment: Vercel

🔧 Installation & Setup

Clone the Repository

git clone https://github.com/your-repo/saas-template.git
cd saas-template

Install Dependencies

npm install
# or
yarn install

Set Up Environment Variables
Rename .env.example to .env.local and update the following:

NEXTAUTH_SECRET=your-secret
MONGODB_URI=mongodb+srv://your-db-url
HYGRAPH_ENDPOINT=https://your-hygraph-api-endpoint

Run the Development Server

npm run dev

The app will be available at http://localhost:3000

🚀 Deployment

Easily deploy to Vercel:

vercel

🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

📜 License

This project is licensed under the MIT License.