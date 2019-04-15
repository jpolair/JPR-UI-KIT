class JprCardElement extends HTMLElement {

    get headerBackground() {
        return this._headerBackground;
    }

    set headerBackground(val) {
        this.setAttribute('header-background', val);
    }
    constructor() {
        super(); 
        this.attachShadow({ mode: 'open'});

        this.shadowRoot.innerHTML = `<style> 
        .card {
            width: 400px;
            height: 250px;
            border: 0.25px solid #ddd;
            display: flex;
            flex-direction: column;
            box-shadow: 5px 5px 5px grey;
        }
        .header-card {
            
            width: 100%;
            height: 50px;
            display: flex;
        }
        .header-card h2 {
            margin: auto;
        }
        .content-card {
            padding: 4%;
            text-align: center;
        }
        .content-card-title {
            text-align: center;
        }
        .footer-card {
            height: 50px;
            
            margin-top: auto;
        }
        </style>
        <div class="card">
            <div class="header-card"><h2></h2></div>
            <div class="content-card">
                <div class="content-card-title">
                    <h3></h3>
                </div>
            <p></p>
            </div>
            <div class="footer-card"></div>
        </div>
        `;
    }
    connectedCallback() {
        this._headerBackground = this.getAttribute('header-background') || 'grey';
        this._headerColor = this.getAttribute('header-color');
        this._cardTitle = this.getAttribute('card-title') || 'Choose a title';
        this._cardContent = this.getAttribute('card-content') || '';
        this._cardContentTitle = this.getAttribute('card-content-title') || ''; 

        this.render();
        
    }
    
    static get observedAttributes() { 
        return ['header-background','header-color','card-title','card-content','card-content-title'];
    }

    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'header-background') {
            this._headerBackground = newValue;
        }
        this.render();
    }

    render() { 
        this.shadowRoot.querySelector('.footer-card').style.background = this._headerBackground; 
        this.shadowRoot.querySelector('.header-card').style.background = this._headerBackground; 
        this.shadowRoot.querySelector('.header-card h2').textContent = this._cardTitle;
        this.shadowRoot.querySelector('.header-card h2').style.color = this._headerColor;
        this.shadowRoot.querySelector('h3').textContent = this._cardContentTitle;
        this.shadowRoot.querySelector('p').textContent = this._cardContent;

    }
}

window.customElements.define('jpr-card', JprCardElement);

/* 
Création d'un web component
------------------------------------------------------------------------------
1 - Création d'une classe qui Extend HTMLelement
2 - connectedCallback => est la fonction appelée dès que la balise crée sera rencontrée cette fonction est appelée automatiquement par le navigateur
3 - on appelle this.attachShadow({ mode: 'open' }) pour cloisonner les classes css en ciblant un shadow DOM et non pas le DOM
4 - On injecte innerHTML dans shadowRoot qui est le root du shadowDOM
6 - On appelle render() pour le rendu de la page (render peut avoir un autre nom)
5 - window.customElements.define => associe le nom de la balise à la classe


* attributeChangedCallback => spécifie que faire quand attribut change de manière programmatique
* static get observedAttributes => retourne les attributs à observer fonction propre à la classe et non à l'instance... de JprCardElement
* méthode set et get en début de classe sert à changer "directement" les attributs

source: Youtube Lior Chamla  
------------------------------------------------------------------------------
*/