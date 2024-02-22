// const cheerio = require('cheerio');
import { htmlString } from './htmlString.js';
import cheerio from 'cheerio';

function extractBase64SrcFromHTML(htmlString) {
    const base64SrcArray = [];

    // Load the HTML string into cheerio
    const $ = cheerio.load(htmlString);

    // Find all elements with 'src' attribute
    $('[src]').each((index, element) => {
        const srcValue = $(element).attr('src');
        // Check if the src starts with 'data:image'
        if (srcValue.startsWith('data:image')) {
            base64SrcArray.push(srcValue);
        }
    });

    return base64SrcArray;
}

function replaceBase64SrcWithLinks(htmlString, imageLinks) {
    // Load the HTML string into cheerio
    const $ = cheerio.load(htmlString);

    // Find all elements with 'src' attribute
    $('[src]').each((index, element) => {
        const srcValue = $(element).attr('src');
        // Check if the src starts with 'data:image'
        if (srcValue.startsWith('data:image')) {
            // Replace the src with the corresponding link from imageLinks
            $(element).attr('src', imageLinks[index]);
        }
    });

    // Return the modified HTML string
    return $.html();
}



const base64SrcArray = extractBase64SrcFromHTML(htmlString);
const imageLinks = [
    'https://www.example.com/image1.jpg',
    'https://www.example.com/image2.jpg',
    'https://www.example.com/image3.jpg',
]
console.clear();
console.table(base64SrcArray.length);


const replacedHTML = replaceBase64SrcWithLinks(htmlString, imageLinks);
console.log(replacedHTML);
