# React + Vite

### 1
- First of all, I created a basic structure for the frontend and backend. 
  - I created a schema only for movies. My schema contains title, type, links (480p, 720p, 1080p, etc.), genre, director, and creator.
  - To input data into the backend, I created a basic form in React.
  - The main feature of this website is a single schema used for both movies and series.
  - The form for the schema is also very complicated.
  - Day by day, I modify all components. For example, I created a main page where all data will be displayed.
  - On the main page, I show all the main objects of the movies. Each object contains an image and the title of the movie.
  - Whenever a user clicks on a card, a different URL is created like `movie/movieid`, and on the movie detail page, I fetch the data of that ID.
  - To maintain all the data on the website, I use Redux Toolkit. Whenever the website loads, all data is first stored in the React store and then passed into the React components.
  - I also implemented dynamic search for searching movies. If the user is on the movie detail page and wants to search for a movie, they just need to click on the search bar. Whenever they type a movie, it brings all movies to the main page.
  - The most important part of the website is securing all the data.
  - For that, I use Crypto.js which encrypts data. Whenever we try to fetch data, it first comes in a string form, and we have to decrypt that data first.

- Created the navbar and footer.
- Disabled the right-click on the whole application.
- For encryption and decryption, I use Crypto.js.
- Implemented SEO in the application for better search performance.

Link: [https://chatgpt.com/share/c035ebe8-8108-4144-b5b4-ff1fc1627351](https://chatgpt.com/share/c035ebe8-8108-4144-b5b4-ff1fc1627351)

### NGINX Configuration

```bash
sudo rm /etc/nginx/nginx.conf
sudo vi /etc/nginx/nginx.conf
events {
    # Event directives...
}

http {
    server {
        listen 80;
        server_name backendname ;

        location / {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
