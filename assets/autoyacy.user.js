// ==UserScript==
// @name AutoYaCy
// @namespace https://kvakil.me/
// @description Automatically index visited pages with YaCy.
// @version 0.1
// @match *://*/*
// @grant GM_xmlhttpRequest
// @grant GM_log
// ==/UserScript==

const YACY_HOST = 'https://example.com';
const ADMIN_PASSWORD = 'REPLACE_ME';

const yacyUrl = new URL('/Crawler_p.html', YACY_HOST);

const url = new URL(window.location);
// Don't try to index YaCy from YaCy.
if (url.host === yacyUrl.host) return;

// Strip out potentially sensitive parts of the URL.
url.search = '';
url.hash = '';

yacyUrl.search = new URLSearchParams({
    crawlingstart: '',
    crawlingMode: 'url',
    crawlingURL: url.toString(),
    crawlingDepth: '1',
    range: 'width',
    deleteold: 'off',
    recrawl: 'reload',
    reloadIfOlderNumber: '7',
    reloadIfOlderUnit: 'day',
    indexText: 'on',
    indexMedia: 'on',
    // Check API documentation for other parameters!
    // https://wiki.yacy.net/index.php/Dev:APICrawler
});

GM_xmlhttpRequest({
    method: 'GET',
    url: yacyUrl.toString(),
    onload: (response) => {
        GM_log('YaCy gave us a response', response.status);
    },
    onerror: (response) => {
        GM_log('YaCy error requesting crawl', response.status);
    },
    user: 'admin',
    password: ADMIN_PASSWORD,
});
