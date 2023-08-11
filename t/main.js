let md = `
# Short Links Directory

## What is this directory?

This directory is for creating a system of short URLs that redirect to longer URLs on my website. You can see an automatically-generated table of the current short URLs below.

## What is the format?

URL codes for shortened links are just the initials of the URL path, unless URL codes have duplicate path initials, in which case a number is tacked onto the end.

### Huh?

For example, the URL for [Wavefunction Simulator](https://piano-miles.github.io/Wavefunction-Simulator) is <https://piano-miles.github.io/t?ws>. The URL for [Terminize](https://piano-miles.github.io?terminize) is <https://piano-miles.github.io/t/t>. The URL for [resources/study/econ-notes](https://piano-miles.github.io/resources/study/econ-notes) would be <https://piano-miles.github.io/t?rsen>. If there was another URL like [resources/study/ecology-notes](https://piano-miles.github.io/resources/study/ecology-notes), the shortened URL would be <https://piano-miles.github.io/t?rsen2>, since rsen is already taken. Much easier to type, isn't it?

---

## All shortened URLs
`

const guide = () => '<div class="pad">' + (new showdown.Converter).makeHtml(md) + "</div>";

const getShortLink = () => {
    let queryString = window.location.search
    console.log(`queryString: ${queryString}`)
    let queryParams = {}

    return queryString &&
        new URLSearchParams(queryString)
            .forEach((value, key) => {
                queryParams[key] = value
            }), queryParams
};

const addDescription = () => {
    let main = document.createElement("main")
    main.innerHTML = guide(),
        document.body.appendChild(main);

    // Create table header
    let table = document.createElement('table'),
        header = table.createTHead(),
        row = header.insertRow(0),
        cell = row.insertCell(0);
    cell.innerHTML = `<p class="th">Short URL</p>`,
        (cell = row.insertCell(1))
            .innerHTML = `<p class="th">Full URL</h4>`;

    // Create table body
    let body = table.createTBody()
    for (let key in pairs) {
        cell = (row = body.insertRow())
            .insertCell(0);
        const shortlink = "https://piano-miles.github.io/t?" + key
        cell.innerHTML = `<a href=${shortlink}>${shortlink}</a>`,
            cell = row.insertCell(1);
        const biglink = pairs[key]
        cell.innerHTML = `<a href=${biglink}>${biglink}</a>`
    }

    main.appendChild(table)
}

const links = [
    "file-index", "home", "Wavefunction-Simulator", "terminize", "car-physics-simulator", "password-generator", "Baryon-Simulator"
]

let pairs = {}
for (let i = 0; i < links.length; i++) {
    let link = links[i],
        key = link.split("-")
            .map(word => word[0].trim()
                .toLowerCase())
            .join("")

    // Check if key already exists
    if (key in pairs) {
        // If it does, add a number to the end of the key until it doesn't
        for (; (key + 2 in pairs);) key++
        key += num
    }

    pairs[key] = "https://piano-miles.github.io/" + link
}

if ((params = getShortLink()).length > 0) { // If there are params
    if (params.length > 1) // If there are multiple params
        for (let i = 1; i < params.length; i++)
            params[i] in pairs &&
                window.open(pairs[params[i]]); // Open each additional link after the first in a new tab

    params[0] in pairs ?
        window.location.replace(pairs[params[0]]) :
        addDescription(); // Redirect to the pimary link if it exists, otherwise add the description

} else addDescription() // If there are no params, add the description
