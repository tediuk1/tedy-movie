import './movie-detail';

class MovieItem extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'})
    }

    set movie(movie) {
        this._movie = movie;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :host {
            display: flex;
            flex: 25%;
            max-width: 20%;
            flex-direction: column;
            border: 1px solid white;
            border-radius: 14px;
            margin: 10px 10px 20px 10px;
            overflow: hidden;
            outline: none;
        }
        
        .movie-image {
            width: 100%;
            padding: 10px;
            overflow: hidden;
            position: relative;
            transition: 200ms ease-in-out transform;
        }
        
        .movie-image img {
            width: 100%;
            border-radius: 10px;
            object-fit: cover;
        }
        
        .movie-item:hover .movie-image {
            transform: scale(1.03);
        }
        
        .movie-header {
            color: white;
            padding: 0px 20px 0px 20px;
        }

        .movie-header p {
            font-size: 19px;
        }
        
        .movie-footer {
            margin: 10px;
            padding: 10px;
            border-top: 1px solid white;
        }
        
        .movie-footer button {
            position: relative;
            bottom: 0;
            width: 100%;
            font-size: 24px;
            padding: 14px;
            border-radius: 10px;
            background-color: #3D3762;
            color: white;
            cursor: pointer;
        }
        
        .movie-footer button:hover {
            transition: 0.4s;
            border: 1px solid white;
        }
        
        .movie-footer button:active {
            transform: scale(0.95);
        }

        @media (max-width: 768px) {
            :host {
                font-size: 12px;
                flex: 25%;
                max-width: 30%;
            }
        }

        @media (max-width: 640px) {
            :host {
                font-size: 10px;
                flex: 50%;
                max-width: 100%;
            }
        }
        </style>

        <div class="movie-item">
            <div class="movie-image">
                <img src="https://image.tmdb.org/t/p/w185${this._movie.poster_path}" alt="${this._movie.title} Poster">
            </div>
            <div class="movie-header">
                <h2 class="card-title">${this._movie.title}</h2>
                <p class="card-subtitle">${this._movie.release_date.substring(0, 4)}</p>
            </div>
            <div class="movie-footer">
                <button class="button-detail" id="buttonDetail" type="button">Detail</button>
                </div>
            </div>
        </div>
        `;

        const buttonDetail = this.shadowDOM.querySelector('#buttonDetail');
        buttonDetail.addEventListener('click', () => {
            const movieDetailElement = document.createElement('movie-detail');
            movieDetailElement.movie = this._movie;
            movieDetailElement.show();
            document.body.appendChild(movieDetailElement);
        });
    }
}

customElements.define('movie-item', MovieItem);