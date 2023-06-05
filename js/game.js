const grid = document.querySelector('.grid');


const caracteres = [
    'capitao',
    'haranha',
    'hferro',
    'hulk',
    'man',
    'thor',
    'batman',
    'maravilha'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstcartas = '';
let secondcartas = '';

const checkEndGame = () => {
    const disabledcartas = document.querySelectorAll('.disabled-cartas');
    if (disabledcartas.length === 16) {
        alert('Parabéns, você conseguiu!!!');
    }
}

const checkcartas = () => {
    const firstcaracter = firstcartas.getAttribute('data-caracter');
    const secondcaracter = secondcartas.getAttribute('data-caracter');

    if (firstcaracter === secondcaracter) {
        firstcartas.firstChild.classList.add('disabled-cartas');
        secondcartas.firstChild.classList.add('disabled-cartas');

        firstcartas = '';
        secondcartas = '';

        checkEndGame();


    } else {
        setTimeout(() => {
            firstcartas.classList.remove('reveal-cartas');
            secondcartas.classList.remove('reveal-cartas');

            firstcartas = '';
            secondcartas = '';
        }, 500);



    }
}

const revealCartas = ({ target }) => {
    if (target.parentNode.className.includes('reveal-cartas')) {
        return;
    }

    if (firstcartas === '') {
        target.parentNode.classList.add('reveal-cartas');
        firstcartas = target.parentNode;

    } else if (secondcartas === '') {
        target.parentNode.classList.add('reveal-cartas');
        secondcartas = target.parentNode;
    }
    checkcartas();

}

const createCartas = (caracter) => {

    const cartas = createElement('div', 'cartas');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${caracter}.png')`;

    cartas.appendChild(front);
    cartas.appendChild(back);

    cartas.addEventListener('click', revealCartas);
    cartas.setAttribute('data-caracter', caracter)

    return cartas;
}

const loadGame = () => {

    const duplicateCaracteres = [...caracteres, ...caracteres];

    const shuffledArray = duplicateCaracteres.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((caracter) => {
        const cartas = createCartas(caracter);
        grid.appendChild(cartas);

    });
}

loadGame();

