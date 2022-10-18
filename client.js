// make an api request to  71.72.237.156/breakingbad
// the response is an image
// set the image to the desktop background using the wallpaper package

// use commonjs
const wallpaper = import('wallpaper');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const url = 'http://71.72.237.156/breakingbad';
const chalk = require('chalk');
const commander = require('commander');

const program = new commander.Command();
program.version('1.0.0');
program.option('-d, --debug', 'output extra debugging');

program.parse(process.argv);
const args = program.opts();

// add --debug, -d flag

async function set() {
    // download to wallpaper.png
    // set the wallpaper
    // delete the wallpaper.png
    if (args.debug) console.log(debug('Downloading wallpaper...'));
    const response = await axios
        .get(url, { responseType: 'stream' })
        .catch(err => {
            if (args.debug) console.log(debug(err));
            process.exit(1);
        });
    if (args.debug)
        console.log(debug(`Downloaded wallpaper. ${chalk.green.bold('✓')}`));
    if (args.debug)
        console.log(
            debug(
                `Writing to ${chalk
                    .ansi256(57)
                    .bold(path.resolve(__dirname, 'wallpaper.png'))}`
            )
        );
    response.data.pipe(
        fs.createWriteStream(path.join(__dirname, 'wallpaper.png'))
    );

    if (args.debug)
        console.log(
            debug(`Wallpaper downloaded and saved. ${chalk.green.bold('✓')}`)
        );
    if (args.debug) console.log(debug(`Setting wallpaper...`));
    await (await wallpaper).setWallpaper(path.join(__dirname, 'wallpaper.png'));
    if (args.debug)
        console.log(debug(`Wallpaper set. ${chalk.green.bold('✓')}`));
    if (args.debug) console.log(debug(`Deleting wallpaper...`));
    fs.unlinkSync(path.join(__dirname, 'wallpaper.png'));
    if (args.debug)
        console.log(debug(`Wallpaper deleted. ${chalk.green.bold('✓')}`));
}
setInterval(set, 5000);

function debug(message) {
    return chalk.bgAnsi256(99).black.bold(` DEBUG `) + ` ${message}`;
}
