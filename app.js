/** 
 * 
 * ARTICLE = CARTE
 * UL = LISTE
 * 
 * Ajout de liste:
 *  - boutton class 'addBtn'
 *      - en cliquant dessus, on a un formulaire avec:
 *          - input
 *          - button ajouter une liste
 *          - croix pour fermer
 * 
 * Création de carte:
 *  - article
 *      - titre h2
 *      - ul > li
 *      - li -> lien a et un boutton pour fermer
 *      - un formulaire 
 *          - input
 *          - button 'Ajouter une carte'
 * 
 * Ajout de carte:
 *  - En saisissant dans le input du formulaire
 *  - En validant avec le bouton 'ajouter une carte'
 *  - Un li apparait avec le lien a et le bouton 'X'
 *  - La carte peut etre supprimée avec le bouton 'X'
 *  
 * */ 


var cardForm = document.querySelector('.to_do form');
var list = document.querySelector('.add');
var listForm = document.querySelector('.add form');
var addBtn = document.querySelector('.addBtn');
var closeBtn = document.querySelector('.close');

addBtn.addEventListener('click', function(){
    list.classList.add('is-active');
    addBtn.classList.add('is-hidden');
});

closeBtn.addEventListener('click', function(){
    addBtn.classList.remove('is-hidden');
    list.classList.remove('is-active');
});


listForm.addEventListener('submit', function(event){
    // permet de ne pas soumettre le formulaire à proprement parler
    event.preventDefault();

    var input = this.elements[0];
    if (input.value === ''){
        // arret de fonction
        return;
    }

    // création de Carte
    var newArticle = document.createElement('article');
    var newArticleHeader = document.createElement('div');
    newArticleHeader.classList.add('header_article');
    var newArticleTitle = document.createElement('h2');
    newArticleTitle.textContent = input.value;
    var newArticleCloseBtn = document.createElement('button');
    newArticleCloseBtn.textContent = 'X';
    newArticleCloseBtn.setAttribute('type', 'button');
    var newArticleList = document.createElement('ul');
    var newArticleForm = document.createElement('form');
    var newArticleInput = document.createElement('input');
    var newArticleBtn = document.createElement('button');
    newArticleBtn.setAttribute('type', 'submit');
    var newArticleBtnSpan = document.createElement('span');
    newArticleBtnSpan.textContent = 'Ajouter une carte';

    newArticleForm.addEventListener('submit', function(event){
        event.preventDefault();
        var cardInput = this.elements[0];
        if(cardInput.value === ''){
            return;
        }
        // création de Liste
        var cardList = document.createElement('li');
        var cardListLink = document.createElement('a');
        cardListLink.setAttribute('href', '#');
        cardListLink.textContent = cardInput.value + '';
        var cardListBtn = document.createElement('button');
        cardListBtn.setAttribute('type', 'button')
        cardListBtn.textContent = 'X';

        cardListBtn.addEventListener('click', function(){
            cardList.parentElement.removeChild(cardList);
        });
        
        
        cardList.appendChild(cardListLink);
        newArticleList.appendChild(cardList);
        cardList.appendChild(cardListBtn);

        // vide le input après avoir submit
        cardInput.value = '';


        // fonctions MODAL
        var modalWrapper = document.querySelector('.modal-wrapper');
        var modalClose = document.querySelector('.modal-close')
        var modalOverlay = document.querySelector('.modal-overlay');
        var modalTitle = document.querySelector('.modal-title');
        var modalLink = document.querySelector('.modal-link');
        var modalTextArea = document.querySelector('.modal-title-header textarea');

        
        modalLink.textContent = newArticleTitle.innerHTML;
        modalTitle.textContent = cardListLink.innerHTML; 
        modalTextArea.textContent = modalTitle.textContent;

        cardListLink.addEventListener('click', function(){
            modalWrapper.classList.remove('is-hidden');
        });

        modalClose.addEventListener('click', function(){
            modalWrapper.classList.add('is-hidden');
        });

        modalOverlay.addEventListener('click', function(){
            modalWrapper.classList.add('is-hidden');
        });

        modalTitle.addEventListener('click', function(event){
            event.preventDefault();
            disappearTitle();
        });

        var cardListLinkArray = document.querySelectorAll('li a');
        console.log(cardListLinkArray);
        console.log(cardListLink);

        //En tapant sur la touche entrée, ca change les titres de la modal et de la carte
        for (var i = 0; i < cardListLinkArray.length; i++){
            cardListLink.addEventListener('click', function(event){
            appearTitle();
            });
        }
            
                // modalTextArea.addEventListener('keyup', function(event){
                //     if(event.keyCode == 13){
                //     // texte du lien a
                //     cardListLink.textContent = modalTitle.textContent;
                //     modalTextArea.value = modalTitle.textContent;
                //     }
                // });


        // modalTextArea.addEventListener('keyup', function(event){
        //     event.preventDefault();
        //     if(event.keyCode == 13){
        //         appearTitle();
        //         var newModalTitle = modalTextArea.value;
        //         modalTextArea.value = newModalTitle;
        //         modalTitle.textContent = newModalTitle;
        //         cardListLink.innerHTML = newModalTitle;
        //     };
        // });




        //définit la hauteur du textarea en fonction du texte tapé
        modalTextArea.addEventListener('input', function(){
            this.style.height = 0;
            this.style.height = this.scrollHeight + 'px';
        });

        // si modal depasse le body à cause du textarea, mettre du scroll dans la modal wrapper
        if ((modalWrapper.style.display !== 'none') && (modalTextArea.style.height > '280px')) {
            modalOverlay.style.overflow = 'scroll';
        };

        //faire disparaitre le titre
        function disappearTitle(){
            modalTitle.classList.add('is-hidden');
            modalTextArea.style.display = 'inline';
        }

        //faire apparaitre le titre
        function appearTitle(){
            modalTitle.classList.remove('is-hidden');
            modalTextArea.style.display = 'none';
        }
    });
    
    newArticleCloseBtn.addEventListener('click', function(){
        newArticle.remove();
    });



    newArticle.appendChild(newArticleHeader);
    newArticleHeader.appendChild(newArticleTitle);
    newArticleHeader.appendChild(newArticleCloseBtn);
    newArticle.appendChild(newArticleList);
    newArticle.appendChild(newArticleForm);
    newArticleForm.appendChild(newArticleInput);
    newArticleForm.appendChild(newArticleBtn);
    newArticleBtn.appendChild(newArticleBtnSpan);

    this.parentElement.insertAdjacentElement('beforebegin', newArticle);
    this.parentElement.classList.remove('is-active');
    addBtn.classList.remove('is-hidden')
    newArticleBtnSpan.insertAdjacentHTML('beforebegin', '<ion-icon name="add-outline"></ion-icon>');



    input.value = '';

});


    
