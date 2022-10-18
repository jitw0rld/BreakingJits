// make an api request to  71.72.237.156/breakingbad
// the response is an image
// set the image to the desktop background using the wallpaper package

// use commonjs
const wallpaper = import('wallpaper');
const axios = require('axios');
const fs = require('fs');
const url = 'http://71.72.237.156/breakingbad';

async function set() {
    // download to wallpaper.png
    // set the wallpaper
    // delete the wallpaper.png
    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(
        fs.createWriteStream(path.join(__dirname, 'wallpaper.png'))
    );
    await (await wallpaper).setWallpaper(path.join(__dirname, 'wallpaper.png'));
    fs.unlinkSync(path.join(__dirname, 'wallpaper.png'));
}
setInterval(set, 5000);
