const tilesContainer = document.querySelector('.tiles');
const colors = ['aqua', 'aquamarine', 'crimson', 'blue', 'dodgerblue', 'gold', 'greenyellow', 'teal'];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

//Game state 
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
    const element = document.createElement('div');
    element.classList.add('tile');
    element.setAttribute('data-color', color);
    element.setAttribute('data-reveald', 'false');

    element.addEventListener('click', () => {
        const reveald = element.getAttribute('data-reveald');

        if (awaitingEndOfMove || reveald === 'true' || element === activeTile) {
            return
        }

        element.style.backgroundColor = color;

        if (!activeTile) {
            activeTile = element;

            return;
        }

        const colorToMatch = activeTile.getAttribute('data-color');

        if (colorToMatch === color) {
            activeTile.setAttribute('data-reveald', 'true');
            awaitingEndOfMove = false
            activeTile = null;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                alert('You win! Refresh to play again.')
            }

            return
        }


        awaitingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);
    });

    return element;
}

for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildTile(color);
    tilesContainer.appendChild(tile);

    colorsPicklist.splice(randomIndex, 1);


}