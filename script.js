document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const postsSection = document.getElementById('posts');
    const homeLink = document.getElementById('home-link');
    const newPostLink = document.getElementById('new-post-link');

    async function loadPosts() {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        postsSection.innerHTML = posts.map(post => `
            <article>
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </article>
        `).join('');
    }

    function showNewPostForm() {
        content.innerHTML = `
            <form id="new-post-form">
                <input type="text" id="title" placeholder="Post Title" required>
                <textarea id="body" placeholder="Write your post here..." required></textarea>
                <button type="submit">Submit</button>
            </form>
        `;
        document.getElementById('new-post-form').addEventListener('submit', submitPost);
    }

    async function submitPost(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;
        await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body }),
        });
        loadPosts();
    }

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadPosts();
    });

    newPostLink.addEventListener('click', (e) => {
        e.preventDefault();
        showNewPostForm();
    });

    loadPosts();
});
