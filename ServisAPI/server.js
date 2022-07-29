const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

global.flag = true;

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
});
app.get('/contacts', (req, res) => {
    const title = 'Contacts';

    const contacts = [
        {name: 'Youtube', link: 'http://youtube.com/YauhenKavalchuk'},
        {name: 'Twitter', link: 'http://twitter.com/YauhenKavalchuk'}, 
        {name: 'GitHub', link: 'http://github.com/YauhenKavalchuk'}, 

    ]
    res.render(createPath('contacts'), {contacts, title});
});
app.get('/about-us', (req, res) => {
    res.redirect('/contacts');
});
app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
        title: 'Post title',
        date: '05.05.2021',
        author: 'Andrii',
    };

    res.render(createPath('post'), {title, post});
});
app.get('/posts', (req, res) => {
    const title = 'Posts';
    // const posts = [
    //     {
    //         id: '1',
    //         text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    //         title: 'Post title',
    //         date: '05.05.2021',
    //         author: 'Andrii',
    //     }
    // ];
    // res.render(createPath('posts'), {title, posts});
    const Post = fs.readFileSync('base.json', 'utf8');
    console.log(Post);
    const Posts = JSON.parse(Post);
    console.log(Posts);
    
    let posts = Posts;
    res.render(createPath('posts'), {posts, title})

});

app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body;
    const post = {
        id: new Date(),
        date: (new Date()).toLocaleDateString(),
        title,
        author,
        text,
    };
    if(post.title == '' || post.author == '' || post.text == ''){
        const title = 'Error Page';
        res
            .status(404)
            .render(createPath('error'), {title});
    }
    else{
        res.render(createPath('post'), { post, title })
        // fs.appendFile("base.json", JSON.stringify(post), 'binary', (err)=>{
        //     if(err) console.log(err)
        //     else console.log('File saved')
        // });

        const path = 'base.json'
        let posts = [];
        try {
          if (fs.existsSync(path)) {
            posts = JSON.parse(fs.readFileSync(path));
          }
          posts.push(post);
          fs.writeFile(path, JSON.stringify(posts), (err)=>{
            if(err) console.log(err)
            else console.log('File saved')
            });
        } catch(err) {
          console.error(err)
        }

        
        // fs.readFile('base.json', 'binary', function readFileCallback(err, data){
        //     if (err){
        //         let p = {
        //             table: []
        //         }
        //         p.table.push(post);
        //         fs.writeFile("base.json", JSON.stringify(p), 'binary', (err)=>{
        //             if(err) console.log(err)
        //             else console.log('File saved')
        //         });
        //     } else {
        //         p = JSON.parse(data);
        //         p.table.push(post);
        //         fs.writeFile('base.json', JSON.stringify(p), 'binary', (err)=>{
        //             if(err) console.log(err)
        //             else console.log('File saved')
        //         });
        //     }});
    // exports.post = post;
    }
});

app.get('/add-post', (req, res) => {
    const title = 'Add post';

    res.render(createPath('add-post'), {title});
});
app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), {title});
});
