// Formulaire
function formRender() {
    const app = document.getElementById('commentForm');

    const formHTML = `
        <div class="formulaire">
        <div class="commentaire">
            <input type="text" id="pseudo" placeholder="Votre pseudo" required> 
            <textarea name="" id="comment" placeholder="Votre commentaire" required></textarea>
        </div>
        <button id="postBtn">Publier</button>
        </div>
        <div id="commentSection" class="commentSection"></div>
    `;

    app.innerHTML = formHTML;

    document.getElementById('postBtn').addEventListener('click', createPost);

    olderPost();
}
formRender();


// Charge les anciens posts (haut vers le bas, ordre date)
function olderPost() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const result = document.getElementById('commentSection');
    result.innerHTML = '';

    //charge les 5 derniers
    const recentPosts = posts.slice(-5).reverse(); 
    recentPosts.forEach(postData => {
        const postHTML = `
            <div class="comment">
                <div>${postData.pseudo}</div>
                <small>Posté le ${postData.postDate}</small>
                <div>${postData.comment}</div>
                <hr>
            </div>
        `;
        result.insertAdjacentHTML('afterbegin', postHTML);
    });
}

// Créer un post
function createPost() {
    const pseudo = document.getElementById('pseudo').value;
    const comment = document.getElementById('comment').value;

    if (pseudo === '' || comment === '') {
        alert('Oups, il manque des informations');
        return;
    }

    // date et formatage
    const now = new Date();
    const postDate = now.toLocaleString('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    // Récupère les anciens posts
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Ajoute le nouveau post
    posts.push({ pseudo, comment, postDate });

    // Sauvegarde dans le localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Affiche le nouveau commentaire
    const postHTML = `
        <div class="comment">
            <div>${pseudo}</div>
            <small>Posté le ${postDate}</small>
            <div>${comment}</div>
            <hr>
        </div>
    `;
    document.getElementById('commentSection')
        .insertAdjacentHTML('afterbegin', postHTML);

    // Réinitialise les champs
    document.getElementById('pseudo').value = '';
    document.getElementById('comment').value = '';
}
