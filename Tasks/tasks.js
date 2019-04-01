let $text = document.querySelector("#text");
const regExp = '"';

const replace = (text) => {
    return console.log(text.replace(/'/ig, regExp));
};
replace($text.textContent);

const replace2 = (text) => {
    return console.log(text.replace(/'\B|\B'/g, regExp));
};
replace2($text.textContent);
