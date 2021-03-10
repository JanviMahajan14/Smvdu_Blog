# Smvdu_Blog

A blog website to connect students of SMVDU together 🚀. This blog will not only let you post your thoughts, images etc on the blog, but will also provide you a specific section for sharing and downloading your notes. The platform is created using MERN stack and uses Context API for state management.

## Features and Functionalities 😃

- User Signup and Login
- Add Post
- Delete Post
- Like, comment on the post
- Follow and unfollow other users
- Upload and download class notes in pdf format
- Upload a profile picture
- Search bar in the CMS

You can view the screenshots of the app [here](https://github.com/JanviMahajan14/Smvdu_Blog/blob/main/Screenshots.md)

## Development

### Backend

```sh
cd Smvdu_Blog
```

```sh
npm run dev
```

### Frontend

```sh
cd client
```

```sh
npm install
```

```sh
npm start
```

## API

### Authentication

```sh
/users/signup (for signup)
/users/login  (for Login)
```

### Post

```sh
/post ( to see all the post stored in the application)
/newpost ( to create a new post)
/post/like ( to like a post)
/post/unlike ( to unlike a post)
/post/comment ( to comment on post)
/me/post ( to see your own post)
```

### People

```sh
/profile/:id ( to see your own profile)
/follow ( to follow other users)
/unfollow ( to unfollow users)
```

### Notes

```sh
/notes/upload ( to upload notes)
/getAllFiles ( to view all the notes posted in the blog)
/download/:id ( to download notes)
```
