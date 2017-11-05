const {createPresentationGenerator} = window.js2flowchart;

const presentationGenerator = createPresentationGenerator(code);
const slides = presentationGenerator.buildSlides();

const slideNames = [
    'See exports: what module provides?',
    '..and imports: what it depends on?',
    'Classes and functions',
    '...and dependencies between functions',
    'See all details'
];

document.getElementById('container').appendChild(

    slides.reduce((fragment, svg, i) => {
        const span = document.createElement('span');
        span.innerHTML = `
                    <p>${slideNames[i]}</p>
                    <div>${svg}</div>
                `;

        fragment.appendChild(span);
        return fragment;
    }, document.createDocumentFragment())

);

window['tns']({
    container: '#container',
    mouseDrag: true,
    arrowKeys: true,
    loop: false,
    speed: 700,
    mode: 'gallery'
});
