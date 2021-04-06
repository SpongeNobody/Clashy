<h1 align="center">
  <img src="./docs/icon.png" alt="Clash" width="300">
  <br>
  Clashy
  <br>
</h1>

A GUI proxy client for Windows / macOS / Ubuntu Desktop based on [Clash](https://github.com/Dreamacro/clash) and [Electron](https://electronjs.org/)

<div align="center">
<a href="https://travis-ci.org/SpongeNobody/Clashy">
<img src="https://api.travis-ci.org/SpongeNobody/Clashy.svg?branch=master" width="80" />
</a>
</div>

## Features

- Easy to use interface.
- Build-in Clash binary.
- GUI configuration.
- Remote subscription support.
- Server speed test.
- Set as system proxy (Windows & macOS only).
- Start with system.

## Installation
Download latest release from [Release Page](https://github.com/SpongeNobody/Clashy/releases)

### If you meet binary singing issue on Apple & Windows operating system.
Check ["Sign Issue"](https://github.com/SpongeNobody/Clashy/blob/master/SignIssue.md) for more information.



## Screenshots

| ![status](./docs/status.png) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSpongeNobody%2FClashy.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FSpongeNobody%2FClashy?ref=badge_shield)
  | ![proxies](./docs/proxies.png)   |
| ------------------------------------------------------- | --------------------------------------------------------- |
| ![profile](./docs/profile.png) | ![settings](./docs/settings.png) |




## Build

- Clone this project & run `yarn install`
- Run `node pre-build.js` to download clash binary for **current** platform.
- Run `yarn start` to start dev server for webpage.
- Run `yarn start:electron` to start electron main process. Or hit run button in `VSCode`.

## Pack
- Run `yarn run pack` and wait.


## Configuration

- Where is my configuration files & how can I modify them?

  To check your configuration files for `Clash` & `Clashy`, click on the folder icon in status panel. `Clash` configuration file folder will opened automatically and navigate to parent folder you will see  `Clashy` configuration files named `clashy-configs`.

- Can I change clash external controller port & secrets in configuration file?

  You can but you need to modify `Clashy`'s source code to make it work.

## Roadmap & TODOs

- [x] Auto update
- [x] ~~Post build script to zip binaries~~
- [ ] Reset system proxy after exit app
- [ ] Logout current clash client
- [ ] Use external clash binary
- [ ] Login interface for external clash binary
- [ ] Clash binary update
- [ ] View Clash logs
- [ ] Subscription auto-update


## Contribution
Any pull request is welcome.

## FAQ

### Is this a copycat of [ClashX](https://github.com/yichengchen/clashX) or [Clash for Windows](https://github.com/Fndroid/clash_for_windows_pkg)?

Not exactly. I've been using ClashX for several months and I like it. It's easy to use and nicely designed. But I also need a decent Clash client on my Ubuntu Desktop. And the interface must be easy enough for anyone to use because I don't want to teach my wife how to edit proxy rules or how to use remote configuration files. So I decide to make my own Clash GUI client. I did NOT take any code or assets from those two projects but they did give me some ideas about interface design and implementation.

### How can I check `Clash`'s logs in `Clashy` ?
You can't for now. Visit `127.0.0.1:2390/logs` for Clash logs.

### Is `timeout`ed proxy means the proxy is unavailable?

Not really. `Clashy` use `Clash`'s `/delay` API for speed testing. This API requires a parameter which indicates speed test timeout. This parameter is 10 seconds in current build. So there are two kinds of timeout in `Clashy`:
* Proxy timeout, which means proxy is unavailable.
* `Clash` speed test timeout, which means `Clash` waited more than 10 seconds but still no response from target server (which is https://www.google.com). This proxy might be available with a huge delay. Or unavailable at all.

Sadly, I can't distinct those two timeout types with current `Clash` API.


### I don't like Electron.
Me either. Checkout Electron memes below!

<div width="100%">
  <img src="https://i.imgur.com/e2zUaPq.png" width="300" />
  <img src="https://i.imgur.com/Hxy2XXC.jpg" width="300" />
  <img src="https://i.imgur.com/DuwkjfZ.png" width="300" />
</div>



## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSpongeNobody%2FClashy.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FSpongeNobody%2FClashy?ref=badge_large)