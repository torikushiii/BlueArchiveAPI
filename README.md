# Blue Archive API

An API that primarily focused on drop rate of each stages on Blue Archive.

Now Support  Characters!

**Hosted API at https://api.torikushi.xyz!**

## Prerequisites

- [Node.js](https://nodejs.org/): ^16.0.0
- [Yarn](https://yarnpkg.com/) similar to Node.js
- [NPM](https://npmjs.org/) or any other Node.js package manager

## Installation

Install packages with your preferred package manager, e.g. npm:

```
yarn/npm install
```

If you want to have the API running on a different port, change the port on `app.js` to your preferred port.

### Usage

- [api.torikushi.xyz/equipment/](https://api.torikushi.xyz/equipment)
```
Supports by equipment name:

- Item name: Tennis Headband
  https://api.torikushi.xyz/equipment/Tennis%20Headband

- Support by equipment ID:
  https://api.torikushi.xyz/equipment/5000

- Support by equipment Tier
  https://api.torikushi.xyz/equipment/t1%20hairpin
  https://api.torikushi.xyz/equipment/t2%20hairpin

  https://api.torikushi.xyz/equipment/t2%20watch
```

- [https://api.torikushi.xyz/character/](https://api.torikushi.xyz/character/)
```
Get Character by Name or ID:

- Character Name: Aru
  https://api.torikushi.xyz/character/aru

- Character ID: 10015 (Alice)
  https://api.torikushi.xyz/character/10015
```
All drop rate were taken and parsed from this [Google Doc](https://docs.google.com/spreadsheets/d/1Pqfk8z-VvtISddqrx_tBw_vv24DgnuBMcgU8frddjKg/)

### License

Licensed under Open Software License v3.0