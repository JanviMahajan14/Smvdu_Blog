# Smvdu_Blog

To read and to write,
To know and to be known,
Not among your fellow classmates,
But among the whole university.
We present you your very own university's blog site,
//URL of the website
This blog will not only let you post your thoughts, images etc on the blog,
but will also provide you a specific section for sharing and downloading your notes;
so all the nerds and geeks are also welcome.
Apart from this, the website also provides you a chat option (still in progress),
thus allowing you to connect to your classmates, juniors and even to your seniors for seeking help.
This platform is created using javascript and HTML

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
