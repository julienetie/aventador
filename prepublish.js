require('fs')
    .rename(
        './index.md', './README.md',
        error => error ?
        console.log(`ERROR: ${error}`) :
        null
    );