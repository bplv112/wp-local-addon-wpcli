# Enable Cli From Terminal (without ssh) •
## Installation

### Clone

Clone the repository into the following directory depending on your platform:

- macOS: `~/Library/Application Support/Local/addons`

### Install Dependencies
1. `yarn install`

### Enable Global Cli

 - Enable global cli from the Local app > Overview > Global Cli > Enable .
 - You have to restart your site after enabling the option to make it work.

## Build
1. `yarn build` or `yarn watch`

## Development

### Folder Structure
All files in `/src` will be transpiled to `/lib` using [Babel](https://github.com/babel/babel/) after running `yarn watch` or `yarn build`. Anything in `/lib` will be overwritten.


## License

MIT
