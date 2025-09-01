// Fonction pour injecter le formulaire dynamiquement
function renderForm() {
    const app = document.getElementById('app');

    const formHTML = `
        <div >
        <input type="text" id="name" class="inputName input" placeholder="Nom" />
        <textarea id="content" placeholder="Message" class="inputMessage input"></textarea>
        <button id="postBtn">Poster</button>
            <div id="result" ></div>
        </div>
    `;
    app.innerHTML = formHTML;

    // Attacher l'événement
    document.getElementById('postBtn').addEventListener('click', postToPage);

    // Charger et afficher les posts sauvegardés
    loadPosts();
}


function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; 

    posts.slice().reverse().forEach(postData => {
        const post = createPostElement(postData);
        resultDiv.insertBefore(post, resultDiv.firstChild);

    });
}


function createPostElement({ name, content, dateString }) {
    const post = document.createElement('div');
    post.className = 'well';
    post.style = "background:#f8f9fa; padding:15px; margin-top:10px; border-radius:6px; box-shadow:0 1px 4px rgba(0,0,0,0.1);";

    const el_name = document.createElement('h5');
    el_name.textContent = name;
    el_name.style.color = '#2d2d2dff';


    const el_line = document.createElement('hr');
    el_line.style.borderTop = '1px dotted #ccc';

    const el_date = document.createElement('small');
    el_date.textContent = `Posté le ${dateString}`;
    el_date.style.color = '#666';
    el_date.style.display = 'block';
    el_date.style.marginBottom = '8px';

    const el_message = document.createElement('p');
    el_message.textContent = content;

    post.appendChild(el_name);
    post.appendChild(el_line);
    post.appendChild(el_message);
    post.appendChild(el_date);

    return post;
}


function postToPage() {
    const name = document.getElementById('name').value.trim();
    const content = document.getElementById('content').value.trim();

    if (name === "" || content === "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const now = new Date();
    const dateString = now.toLocaleString('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

  
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

   
    posts.push({ name, content, dateString });


    localStorage.setItem('posts', JSON.stringify(posts));

    const post = createPostElement({ name, content, dateString });
    const resultDiv = document.getElementById('result');
    resultDiv.insertBefore(post, resultDiv.firstChild);


    // Réinitialiser les champs
    document.getElementById('name').value = "";
    document.getElementById('content').value = "";
}


window.onload = renderForm;
