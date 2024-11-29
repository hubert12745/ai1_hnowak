const msg = "Hello";
alert(msg);

interface StylesDictionary {
    [key: string]: string;
}

const styles: StylesDictionary = {
    'Styl 1': 'page1.css',
    'Styl 2': 'page2.css',
    'Styl 3': 'page3.css'
};

let currentStyle: string = 'Styl 1';

function changeStyle(newStyle: string) {
    if (styles[newStyle]) {
        const oldLink = document.querySelector('link[rel="stylesheet"]');
        if (oldLink) {
            oldLink.remove();
        }

        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = styles[newStyle];
        document.head.appendChild(newLink);

        currentStyle = newStyle;
    } else {
        console.error(`Style ${newStyle} not found in styles dictionary.`);
    }
}

function setupStyleLinks() {
    const menu = document.querySelector('#menu ul');
    if (menu) {
        for (const style in styles) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'style-link';
            link.setAttribute('data-style', style);
            link.textContent = `${style}`;
            link.addEventListener('click', (event) => {
                event.preventDefault();
                changeStyle(style);
            });
            li.appendChild(link);
            menu.appendChild(li);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupStyleLinks();
    changeStyle(currentStyle);
});