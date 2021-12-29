
# Blue Archive API

## *This API data is mainly based from global version of Blue Archive*

An API that primarily focused on drop rate of each stages on Blue Archive.

Now Support Characters Data!

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

- [https://api.torikushi.xyz/equipment/](https://api.torikushi.xyz/equipment)
```
Get equipment by name id or tier

- Item name: Tennis Headband
  https://api.torikushi.xyz/equipment/Tennis%20Headband

- Support by equipment ID:
  https://api.torikushi.xyz/equipment/5000

(Equipment tier is sorted by blueprint)
- Support by equipment Tier
  https://api.torikushi.xyz/equipment/t1%20hairpin
  https://api.torikushi.xyz/equipment/t2%20hairpin

  https://api.torikushi.xyz/equipment/t2%20watch
```

- [https://api.torikushi.xyz/character/](https://api.torikushi.xyz/character)
```
Get Character by Name or ID:

- Character Name: Aru
  https://api.torikushi.xyz/character/aru

- Character ID: 10015 (Alice)
  https://api.torikushi.xyz/character/10015
```
### Display all current and future raids
- [https://api.torikushi.xyz/?list=raid](https://api.torikushi.xyz/?list=raid)

### Query list example
`Get characters by role`

    Role list:
     - Attacker
     - Healer
     - Supporter
     - Tanker

    https://api.torikushi.xyz/character/query?role=attacker

`Get characters by type`

    Type list:
     - Special
     - Striker

    https://api.torikushi.xyz/character/query?type=special

`Get chracters by school`

    School list:
     - Abydos
     - Gehenna
     - Hyakkiyako
     - Millennium
     - Shanhaijing
     - Trinity

    https://api.torikushi.xyz/character/query?school=abydos

`Get characters by position`

    Position list:
     - Front
     - Middle
     - Back

    https://api.torikushi.xyz/character/query?position=front

`Get characters by weapon`

    Weapon list:
     - AR
     - GL
     - HG
     - MG
     - MT
     - RF
     - RG
     - RL
     - SG
     - SMG
     - SR

    https://api.torikushi.xyz/character/query?weapon=ar

`Get characters by damage`

    Damage list:
     - Explosion
     - Mystic
     - Penetration

    https://api.torikushi.xyz/character/query?damage=explosion

`Get characters by armor`

    Armor list:
     - Heavy Armor
     - Light Armor
     - Special Armor

    https://api.torikushi.xyz/character/query?armor=heavy%20armor

### Get character with multiple queries
Support multiple queries

    https://api.torikushi.xyz/character/query?armor=special%20armor&position=front&damage=explosion

All drop rate were taken and parsed from this [Google Doc](https://docs.google.com/spreadsheets/d/1Pqfk8z-VvtISddqrx_tBw_vv24DgnuBMcgU8frddjKg/)

### License

Licensed under Open Software License v3.0
