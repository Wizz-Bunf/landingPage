function clients() {
    fetch("js/carte.json", {
        method: 'GET', headers: {
            'Content-Type': "application/json"
        },
    })
        .then((response) => response.json())
        .then((dov) => {
            carteAvis(dov);
            console.log(dov);
        })
}
clients();


function carteAvis(avis) {
    const avisComm = document.getElementById("Avis")
    avis.forEach(element => {
        const carteHTML = `
            <div class="baseAvis">
        <div class="baseCartes">
            <div class="carte">
                <div class="profil">
                    <img src="/avisClient/img/profil/profil1.png" alt="">
                    <div>${element.pseudo}</div>
                </div>
                <div class="col-md-6">
    <div class="rating-card p-4">
        
        <div class="star-rating animated-stars">
            <input type="radio" id="star5" name="rating" value="5">
            <label for="star5" class="bi bi-star-fill"></label>
            <input type="radio" id="star4" name="rating" value="4">
            <label for="star4" class="bi bi-star-fill"></label>
            <input type="radio" id="star3" name="rating" value="3">
            <label for="star3" class="bi bi-star-fill"></label>
            <input type="radio" id="star2" name="rating" value="2">
            <label for="star2" class="bi bi-star-fill"></label>
            <input type="radio" id="star1" name="rating" value="1">
            <label for="star1" class="bi bi-star-fill"></label>
        </div>
        </div>
</div>
                <hr>
                <div>${element.avis}</div>
            </div>
        </div>
    </div>
        `;
        Avis.innerHTML += carteHTML;
    })
}