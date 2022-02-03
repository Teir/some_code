/**
 * As breadcrumb menùs are quite popular today, I won't digress much on explaining them, 
 * leaving the wiki link to do all the dirty work in my place.
 * 
 * What might not be so trivial is instead to get a decent breadcrumb from your current url. 
 * For this kata, your purpose is to create a function that takes a url, 
 * strips the first part (labelling it always HOME) and then builds it making each element
 *  but the last a <a> element linking to the relevant path; last has to be a <span> element getting the active class.
 * 
 * All elements need to be turned to uppercase and separated by a separator, 
 * given as the second parameter of the function;
 *  the last element can terminate in some common extension like .html, .htm, .php or .asp; 
 * if the name of the last element is index.something, you treat it as if it wasn't there, 
 * sending users automatically to the upper level folder.
 * 
 * A few examples can be more helpful than thousands of words of explanation, so here you have them:
 * 
 * generateBC("mysite.com/pictures/holidays.html", " : ") == '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>'
 * generateBC("www.codewars.com/users/GiacomoSorbi", " / ") == '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>'
 * generateBC("www.microsoft.com/docs/index.htm", " * ") == '<a href="/">HOME</a> * <span class="active">DOCS</span>'
 * Seems easy enough?
 * 
 * Well, probably not so much, but we have one last extra rule: if one element (other than the root/home) is longer than 30 characters, you have to shorten it, acronymizing it (i.e.: taking just the initials of every word); url will be always given in the format this-is-an-element-of-the-url and you should ignore words in this array while acronymizing: ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]; a url composed of more words separated by - and equal or less than 30 characters long needs to be just uppercased with hyphens replaced by spaces.
 * 
 * Ignore anchors (www.url.com#lameAnchorExample) and parameters (www.url.com?codewars=rocks&pippi=rocksToo) when present.
 * 
 * Examples:
 * 
 * generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") == '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
 * generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") == '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'
 * You will always be provided valid url to webpages in common formats, so you probably shouldn't bother validating them.

 * If you like to test yourself with actual work/interview related kata,
 * please also consider this one about building a string filter for Angular.js.
 * 
 * Special thanks to the colleague that, seeing my code and commenting that I worked on that as if it was I was on CodeWars,
 * made me realize that it could be indeed a good idea for a kata :)
 */

 function generateBC(url, separator) {
    const urlWithoutParams = getUrlWithoutParams(url);
    let pathParts = urlWithoutParams.split('/');

    if (!pathParts.length) {
        return '';
    }

    pathParts = pathParts.slice(1).filter(Boolean);
    let lastPart = pathParts.pop();
    const lastPartIsIndexPage = lastPart && isIndexPage(lastPart);

    let startPartStr = '';
    let middlePartStr = '';
    let lastPartStr = '';

    if (!pathParts.length && (!lastPart || lastPartIsIndexPage)) {
        startPartStr = getSpan('HOME');
        lastPart = null;
    } else {
        startPartStr = getLink('', 'HOME');

        if (lastPartIsIndexPage) {
            lastPart = pathParts.pop();
        }

        middlePartStr = getMiddlePart(pathParts, separator);
    }

    if (lastPart) {
        lastPartStr = getSpan(getSpanCaption(lastPart));
    }

    return [startPartStr, middlePartStr, lastPartStr]
        .filter(Boolean)
        .join(separator);
}
  
function getLink(path, title) {
    const url = path ? `/${path}/` : '/';
    const caption = getCaption(title);

    return `<a href="${url}">${caption}</a>`;
}
                                          
function getSpan(caption) {
    return `<span class="active">${caption}</span>`;
}

function getSpanCaption(path) {
    return getCaption(path.replace(/.(htm(l?)|php|asp)$/, ''));
}
    
function getCaption(path) {
    const MAX_CAPTION_LENGTH = 30;

    let result = path.replace(/-/g, ' ');

    if (result.length > MAX_CAPTION_LENGTH) {
        result = reduceItemCaption(result);
    }

    return result.toUpperCase();
}
    
function reduceItemCaption(caption) {
    const NOT_IMPORTANT_WORDS = ['the','of','in','from','by','with','and', 'or', 'for', 'to', 'at', 'a'];

    const captionWords = caption.split(' ').filter((word) => !NOT_IMPORTANT_WORDS.includes(word));

    return captionWords.reduce((result, word) => {
        return `${result}${word.charAt(0)}`;
    }, '');
}
    
function isIndexPage(path) {
    return /index.(htm(l?)|php|asp)$/.test(path);
}

function getMiddlePart(pathParts, separator) {
    let pathAcc = '';

    return pathParts.reduce((result, urlPart) => {
        pathAcc = `${pathAcc}${pathAcc ? '/' : ''}${urlPart}`;

        const link = getLink(pathAcc, urlPart);

        return `${result}${result ? separator : ''}${link}`;
    }, '');
}

function getUrlWithoutParams(url) {
    return url
        .replace(/^http(s?):\/\//, '')
        .replace(/(#|\?)(\S+)/g, '');
}