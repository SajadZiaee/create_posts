const titleInput = document.getElementById('title-input');
const writerInput = document.getElementById('writer-input');
const contextInput = document.getElementById('context-input');
const submitPost = document.getElementById('submit-post');
const tableElements = document.getElementById('table-elements');
let deletePost = document.querySelectorAll('.delete-post');
const messageAdd = document.getElementById('message-add');
const messageDelete = document.getElementById('message-delete');
const messageWarning = document.getElementById('message-warning');
class Post {
    constructor(title, writer, context) {
        this.title = title;
        this.writer = writer;
        this.context = context;
    }
    get tableElement() {
        const tr = document.createElement('tr');
        const thPostTitle = document.createElement('th');
        const tdPostWriter = document.createElement('td');
        const tdPostContext = document.createElement('td');
        const tdDeletePost = document.createElement('td');
        thPostTitle.classList.add('align-middle');
        thPostTitle.appendChild(document.createTextNode(this.title));
        tdPostWriter.classList.add('align-middle');
        tdPostWriter.appendChild(document.createTextNode(this.writer));
        tdPostContext.classList.add('align-middle');
        tdPostContext.appendChild(document.createTextNode(this.context));
        tdDeletePost.classList = 'align-middle delete-post';

        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.classList.add('btn');
        const i = document.createElement('i');
        i.classList = 'material-icons delete-icon';
        i.appendChild(document.createTextNode('delete'));
        a.appendChild(i);

        tdDeletePost.appendChild(a);
        a.addEventListener('click', function (e) {
            tr.remove();
        });
        tr.appendChild(thPostTitle);
        tr.appendChild(tdPostWriter);
        tr.appendChild(tdPostContext);
        tr.appendChild(tdDeletePost);

        return tr;
    }

}
class Store {
    static getPosts() {
        let posts;
        if (localStorage.getItem('posts') == null) {
            posts = [];
        }
        else {
            posts = JSON.parse(localStorage.getItem('posts'));
        }
        return posts;
    }
    static addPost(post) {
        const posts = Store.getPosts();
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    static deletePost(title) {
        const posts = Store.getPosts();
        posts.forEach(function (post, index) {
            if (post.title === title) {
                posts.splice(index, 1);

            };
        });
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    static displayPosts() {
        const posts = Store.getPosts();
        posts.forEach(function (post) {
            let p = new Post(post.title, post.writer, post.context);
            tableElements.appendChild(p.tableElement);
        })
    }
}

Store.displayPosts();

loadEventListeners();


function loadEventListeners() {
    submitPost.addEventListener('click', addPost);
    deletePost = document.querySelectorAll('.delete-post');
    deletePost.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            Store.deletePost(button.parentNode.firstElementChild.textContent);
            console.log('pressed');
            button.parentNode.remove();

            messageDelete.classList = 'alert alert-danger p-2 m-2';
            setTimeout(function () { messageDelete.classList.add('hidden'); }, 5000);

        })
    });
}


function addPost(e) {
    e.preventDefault();
    if (writerInput.value === '' || titleInput.value === '' || contextInput.value === '') {
        messageWarning.classList = 'alert alert-warning bg-gradient p-2 m-2';
        setTimeout(function () { messageWarning.classList.add('hidden'); }, 5000);

    }
    else {
        const newPost = new Post(titleInput.value, writerInput.value, contextInput.value);
        Store.addPost(newPost);
        tableElements.appendChild(newPost.tableElement);
        writerInput.value = '';
        titleInput.value = '';
        contextInput.value = '';
        messageAdd.classList = 'alert alert-success bg-gradient p-2 m-2';
        document.querySelectorAll('.delete-post');
        loadEventListeners();
        setTimeout(function () { messageAdd.classList.add('hidden'); }, 5000);

    }


}