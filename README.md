
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

If you want to have the API running on a different port, change the port on `config.js` to your preferred port.

# REST API - DOCUMENTATION

this file documents the public endpoints.

## Reference

**BASE URL:** `https://api.torikushi.xyz/`

## Routes

### Get Equipment
Get Equipment by Tier or ID

> [https://api.torikushi.xyz/equipment/](https://api.torikushi.xyz/equipment)

> GET `equipment/:equipment` | `equipment/t1%20hairpin` | `equipment/6000` | `equipment/Tennis%20Headband`

> Returns: `Equipment Object`
<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": {
        "ID": 6000,
        "name": "Tennis Headband",
        "description": "A tennis headband from Serval, a sportswear brand. It's made of a high-moisture-absorption material to prevent sweating during exercise.",
        "category": "Hairpin",
        "rarity": "N",
        "maxLevel": 10,
        "recipeID": 600,
        "tier": 1,
        "tags": ["Equipment", "Hairpin"]
    },
    "drop": [
        {
            "stageName": "[Normal] Main Chapter 01 - Stage 04",
            "stageInfo": {
                "ID": 1011104,
                "stageData": "https://api.torikushi.xyz/stage/1011104"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 30
        },
        {
            "stageName": "[Hard] Main Chapter 01 - Stage 03",
            "stageInfo": {
                "ID": 1012103,
                "stageData": "https://api.torikushi.xyz/stage/1012103"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 60
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 01",
            "stageInfo": {
                "ID": 1021101,
                "stageData": "https://api.torikushi.xyz/stage/1021101"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 40
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 02",
            "stageInfo": {
                "ID": 1021102,
                "stageData": "https://api.torikushi.xyz/stage/1021102"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 40
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 03",
            "stageInfo": {
                "ID": 1021103,
                "stageData": "https://api.torikushi.xyz/stage/1021103"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 30
        },
        {
            "stageName": "[Hard] Main Chapter 02 - Stage 03",
            "stageInfo": {
                "ID": 1022103,
                "stageData": "https://api.torikushi.xyz/stage/1022103"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 80
        }
    ]
}
```
</details>

### Get Character
Get a single character

> [https://api.torikushi.xyz/character/](https://api.torikushi.xyz/character)

> GET `character/:character`| `character/aru` | `character/10015`

> Returns: `Character Object`
<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": {
        "ID": 10000,
        "isReleased": true,
        "isPlayable": true,
        "character": {
            "baseStar": 3,
            "rarity": "SSR",
            "name": "Aru",
            "profile": "The self-proclaimed boss of Problem Solver 68.\n\nAru expanded the Gehenna Academy's Problem Solver 68 club without permission to conduct illegal business activities. She aspires to be seen as a dashing and debonair villain, but her frequent blunders always expose her as a poser.",
            "armorType": "Light Armor",
            "bulletType": "Explosion",
            "position": "Back",
            "role": "Attacker",
            "squadType": "Striker",
            "weaponType": "SR"
        },
        "info": {
            "club": "Kohshinjo68",
            "school": "Gehenna",
            "age": "16 years old",
            "birthDate": "March 12th",
            "artist": "DoReMi",
            "voiceActor": "????????????"
        },
        "stat": {
            "AttackLevel1": 369,
            "AttackLevel100": 3690,
            "MaxHPLevel1": 2236,
            "MaxHPLevel100": 19390,
            "DefenseLevel1": 19,
            "DefenseLevel100": 119,
            "HealPowerLevel1": 1408,
            "HealPowerLevel100": 4225,
            "DefensePenetrationLevel1": 0,
            "DefensePenetrationLevel100": 0,
            "AmmoCount": 5,
            "AmmoCost": 1,
            "Range": 750,
            "MoveSpeed": 200
        },
        "terrain": {
            "Urban": { "DamageDealt": "120%(1.2x)", "ShieldBlockRate": "60%" },
            "Desert": { "DamageDealt": "100%(1x)", "ShieldBlockRate": "30%" },
            "Indoor": { "DamageDealt": "80%(0.8x)", "ShieldBlockRate": "0%" }
        },
        "equipmentType": ["Hat", "Hairpin", "Watch"],
        "skill": {
            "EX": [
                {
                    "level": 1,
                    "name": "Hardboiled Shot",
                    "description": "Deals 274% of ATK as damage to 1 enemy.\nAlso inflicts 292% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 2,
                    "name": "Hardboiled Shot",
                    "description": "Deals 315% of ATK as damage to 1 enemy.\nAlso inflicts 335% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 3,
                    "name": "Hardboiled Shot",
                    "description": "Deals 397% of ATK as damage to 1 enemy.\nAlso inflicts 423% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 4,
                    "name": "Hardboiled Shot",
                    "description": "Deals 438% of ATK as damage to 1 enemy.\nAlso inflicts 467% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 5,
                    "name": "Hardboiled Shot",
                    "description": "Deals 521% of ATK as damage to 1 enemy.\nAlso inflicts 554% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 6,
                    "name": "Hardboiled Shot",
                    "description": "Deals 562% of ATK as damage to 1 enemy.\nAlso inflicts 598% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 7,
                    "name": "Hardboiled Shot",
                    "description": "Deals 644% of ATK as damage to 1 enemy.\nAlso inflicts 686% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 8,
                    "name": "Hardboiled Shot",
                    "description": "Deals 685% of ATK as damage to 1 enemy.\nAlso inflicts 730% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 9,
                    "name": "Hardboiled Shot",
                    "description": "Deals 768% of ATK as damage to 1 enemy.\nAlso inflicts 817% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                },
                {
                    "level": 10,
                    "name": "Hardboiled Shot",
                    "description": "Deals 809% of ATK as damage to 1 enemy.\nAlso inflicts 861% of ATK as damage to enemies within a circular area.",
                    "skillCost": 4,
                    "bulletType": "Explosion"
                }
            ],
            "normal": [
                {
                    "level": 1,
                    "name": "Noir Attack",
                    "description": "Deals 152% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 251% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 2,
                    "name": "Noir Attack",
                    "description": "Deals 160% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 263% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 3,
                    "name": "Noir Attack",
                    "description": "Deals 168% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 276% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 4,
                    "name": "Noir Attack",
                    "description": "Deals 198% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 326% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 5,
                    "name": "Noir Attack",
                    "description": "Deals 206% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 338% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 6,
                    "name": "Noir Attack",
                    "description": "Deals 213% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 351% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 7,
                    "name": "Noir Attack",
                    "description": "Deals 244% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 401% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 8,
                    "name": "Noir Attack",
                    "description": "Deals 251% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 414% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 9,
                    "name": "Noir Attack",
                    "description": "Deals 259% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 426% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 10,
                    "name": "Noir Attack",
                    "description": "Deals 290% of ATK as damage to 1 enemy every 25 sec.\nHas a 50% chance to inflict 476% of ATK as damage to enemies within a circular area.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                }
            ],
            "passive": [
                {
                    "level": 1,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 14%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 2,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 14.7%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 3,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 15.4%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 4,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 18.2%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 5,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 18.9%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 6,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 19.6%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 7,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 22.4%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 8,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 23.1%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 9,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 23.8%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 10,
                    "name": "The Gravity of a Boss",
                    "description": "Increases Crit DMG by 26.6%.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                }
            ],
            "sub": [
                {
                    "level": 1,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 20.1% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 2,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 21.1% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 3,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 22.1% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 4,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 26.2% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 5,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 27.2% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 6,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 28.2% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 7,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 32.2% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 8,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 33.2% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 9,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 34.2% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                },
                {
                    "level": 10,
                    "name": "Way of the Outlaw",
                    "description": "Increases Crit by 38.3% while using EX skills.",
                    "skillCost": 0,
                    "bulletType": "Explosion"
                }
            ]
        },
        "tags": [
            "Gehenna",
            "AllyMedium",
            "Main",
            "LightArmor",
            "Explosion",
            "Back",
            "SR",
            "Cover",
            "StreetBattle_Over_A",
            "OutdoorBattle_Under_B",
            "IndoorBattle_Under_B"
        ],
        "other": {
            "ArtistName": {
                "KR": "DoReMi",
                "JP": "DoReMi",
                "TH": "DoReMi",
                "TW": "DoReMi",
                "EN": "DoReMi",
                "DE": null,
                "FR": null
            },
            "VoiceActor": {
                "KR": "????????????",
                "JP": "????????????",
                "TH": "????????????",
                "TW": "????????????",
                "EN": "????????????",
                "DE": null,
                "FR": null
            },
            "StatusMessage": {
                "KR": "???????????? ????????? ????????????",
                "JP": "?????????????????????????????????",
                "TH": "???????????????????????????????????????????????????????????????????????????????????????",
                "TW": "?????????????????????",
                "EN": "I'll solve any problem!",
                "DE": null,
                "FR": null
            },
            "FullName": {
                "KR": "??????????????? ??????",
                "JP": "???????????????",
                "TH": "??????????????? ??????",
                "TW": "??????????????? ??????",
                "EN": "??????????????? ??????",
                "DE": "??????????????? ??????",
                "FR": "??????????????? ??????"
            },
            "SchoolYear": {
                "KR": "2??????",
                "JP": "2??????",
                "TH": "??????????????????????????? 2",
                "TW": "2??????",
                "EN": "2nd Year",
                "DE": null,
                "FR": null
            },
            "CharacterAge": {
                "KR": "16???",
                "JP": "16???",
                "TH": "16 ??????",
                "TW": "16???",
                "EN": "16 years old",
                "DE": null,
                "FR": null
            },
            "BirthDate": {
                "KR": "3??? 12???",
                "JP": "3???12???",
                "TH": "12 ??????.???.",
                "TW": "3???12???",
                "EN": "March 12th",
                "DE": null,
                "FR": null
            },
            "CharHeight": {
                "KR": "160cm",
                "JP": "160cm",
                "TH": "160 ??????.",
                "TW": "160cm",
                "EN": "5'2\"",
                "DE": null,
                "FR": null
            },
            "Hobby": {
                "KR": "?????? ??????",
                "JP": "???????????????",
                "TH": "??????????????????????????????????????????",
                "TW": "????????????",
                "EN": "Studying management",
                "DE": null,
                "FR": null
            },
            "ProfileIntroduction": {
                "KR": "????????? 68??? ?????? ??????. \n\n????????? ????????? ???????????? ????????? 68??? ???????????? ???????????? ???????????? ?????? ????????? ?????? ??????. \n?????? ????????? ???????????? ?????? ???????????? ???????????? ???????????? ????????? ????????? ?????? ??????????????? ????????? ?????? ???????????? ??????.",
                "JP": "?????????????????????????????????68??????????????????\n\n??????????????????????????????????????????68????????????????????????????????????????????????????????????\n??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                "TH": "???????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????? 68\n\n??????????????????????????????????????????????????????????????????????????????????????? 68 ??????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????? ??????????????????",
                "TW": "???????????????68????????????\n\n????????????????????????????????????--?????????68?????????????????????????????????\n?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                "EN": "The self-proclaimed boss of Problem Solver 68.\n\nAru expanded the Gehenna Academy's Problem Solver 68 club without permission to conduct illegal business activities. She aspires to be seen as a dashing and debonair villain, but her frequent blunders always expose her as a poser.",
                "DE": null,
                "FR": null
            },
            "CharacterSSRNewLine": {
                "KR": "?????????. ????????? ????????????.\n?????????.",
                "JP": "????????????????????????????????????\n??????",
                "TH": "?????????????????? ?????????????????????????????????????????????????????????????????????",
                "TW": "????????????????????????????????????\n?????????",
                "EN": "Heh heh. Good choice.",
                "DE": null,
                "FR": null
            }
        }
    }
}
```
</details>

## Get Raids
Display all current and future raids
> [https://api.torikushi.xyz/?list=raid](https://api.torikushi.xyz/?list=raid)

> Returns : `Raid Object`
<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": [
        {
            "seasonId": 1,
            "bossName": "Binah",
            "startAt": "2021-10-14 12:30:00",
            "endAt": "2021-11-03 23:59:59"
        },
        {
            "seasonId": 2,
            "bossName": "Binah",
            "startAt": "2021-11-16 12:30:00",
            "endAt": "2021-11-22 23:59:59"
        },
        {
            "seasonId": 3,
            "bossName": "ShiroKuro",
            "startAt": "2021-11-29 12:30:00",
            "endAt": "2021-12-06 23:59:59"
        },
        {
            "seasonId": 4,
            "bossName": "Chesed_Outdoor",
            "startAt": "2021-12-14 12:30:00",
            "endAt": "2021-12-20 23:59:59"
        },
        {
            "seasonId": 5,
            "bossName": "ShiroKuro_Indoor",
            "startAt": "2021-12-28 12:30:00",
            "endAt": "2022-01-03 23:59:59"
        },
        {
            "seasonId": 6,
            "bossName": "Chesed_Outdoor",
            "startAt": "2022-01-11 12:30:00",
            "endAt": "2022-01-17 23:59:59"
        },
        {
            "seasonId": 7,
            "bossName": "Hieronymus",
            "startAt": "2022-01-25 12:30:00",
            "endAt": "2022-01-31 23:59:59"
        },
        {
            "seasonId": 8,
            "bossName": "Binah_Street",
            "startAt": "2022-02-08 12:30:00",
            "endAt": "2022-02-14 23:59:59"
        },
        {
            "seasonId": 9,
            "bossName": "ShiroKuro_Indoor",
            "startAt": "2022-02-22 12:30:00",
            "endAt": "2022-02-28 23:59:59"
        },
        {
            "seasonId": 10,
            "bossName": "Chesed",
            "startAt": "2022-03-08 12:30:00",
            "endAt": "2022-03-14 23:59:59"
        },
        {
            "seasonId": 11,
            "bossName": "Kaitenger",
            "startAt": "2022-03-22 12:30:00",
            "endAt": "2022-03-28 23:59:59"
        }
    ]
}

```
</details>

## Character Query list example

### Get characters by role

> https://api.torikushi.xyz/character/query?role=attacker

    Role list:
     - Attacker
     - Healer
     - Supporter
     - Tanker

<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": [
        "Akari",
        "Aris",
        "Aru",
        "Asuna",
        "Azusa",
        "Azusa (Swimsuit)",
        "Cherino",
        "Chise",
        "Haruna",
        "Hasumi",
        "Hibiki",
        "Hina",
        "Hina (Swimsuit)",
        "Iori",
        "Iori (Swimsuit)",
        "Izumi",
        "Izuna",
        "Junko",
        "Karin",
        "Maki",
        "Mashiro",
        "Mashiro (Swimsuit)",
        "Midori",
        "Momoi",
        "Mutsuki",
        "Neru",
        "Nonomi",
        "Pina",
        "Saya",
        "Serika",
        "Shiroko",
        "Shiroko (Cycling)",
        "Shun",
        "Shun (Small)",
        "Sumire",
        "Tsurugi",
        "Tsurugi (Swimsuit)",
        "Utaha",
        "Yoshimi",
        "Yuzu"
    ]
}
```
</details>

### Get characters by type
> https://api.torikushi.xyz/character/query?type=special

    Type list:
     - Special
     - Striker

<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": [
        "Airi",
        "Ayane",
        "Chinatsu",
        "Fuuka",
        "Hanae",
        "Hanako",
        "Hare",
        "Hibiki",
        "Hifumi (Swimsuit)",
        "Juri",
        "Karin",
        "Kotama",
        "Mashiro",
        "Mashiro (Swimsuit)",
        "Nodoka",
        "Saya",
        "Saya (Casual)",
        "Serina",
        "Shimiko",
        "Shizuko",
        "Utaha",
        "Yoshimi"
    ]
}

```
</details>

### Get chracters by school
> https://api.torikushi.xyz/character/query?school=abydos

    School list:
     - Abydos
     - Gehenna
     - Hyakkiyako
     - Millennium
     - Shanhaijing
     - Trinity

<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": [
        "Ayane",
        "Hoshino",
        "Nonomi",
        "Serika",
        "Shiroko",
        "Shiroko (Cycling)"
    ]
}

```
</details>

### Get characters by position
> https://api.torikushi.xyz/character/query?position=front

    Position list:
     - Front
     - Middle
     - Back

<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": [
        "Eimi",
        "Haruka",
        "Hoshino",
        "Izuna",
        "Neru",
        "Sumire",
        "Tsubaki",
        "Tsurugi",
        "Tsurugi (Swimsuit)",
        "Yuuka"
    ]
}

```
</details>

### Get characters by weapon
> https://api.torikushi.xyz/character/query?weapon=ar


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

<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": [
        "Akari",
        "Asuna",
        "Azusa",
        "Azusa (Swimsuit)",
        "Hanae",
        "Hanako",
        "Hare",
        "Hifumi",
        "Hifumi (Swimsuit)",
        "Junko",
        "Momoi",
        "Serika",
        "Serina",
        "Shimiko",
        "Shiroko",
        "Shiroko (Cycling)",
        "Suzumi",
        "Yoshimi"
    ]
}

```
</details>

### Get characters by damage
> https://api.torikushi.xyz/character/query?damage=explosion

    Damage list:
     - Explosion
     - Mystic
     - Penetration

<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": [
        "Airi",
        "Akari",
        "Aru",
        "Azusa",
        "Eimi",
        "Fuuka",
        "Hanae",
        "Hare",
        "Haruka",
        "Hibiki",
        "Hina",
        "Hina (Swimsuit)",
        "Iori (Swimsuit)",
        "Izumi",
        "Izumi (Swimsuit)",
        "Juri",
        "Kayoko",
        "Kirino",
        "Koharu",
        "Kotama",
        "Mashiro",
        "Mutsuki",
        "Nodoka",
        "Saya",
        "Serika",
        "Shimiko",
        "Shiroko",
        "Shun",
        "Shun (Small)",
        "Suzumi",
        "Yuuka"
    ]
}

```
</details>

### Get characters by armor
> https://api.torikushi.xyz/character/query?armor=heavy%20armor

    Armor list:
     - Heavy Armor
     - Light Armor
     - Special Armor

<details>
<summary>View Payload Example</summary>

```json
{
    "status": 200,
    "data": [
        "Akari",
        "Azusa",
        "Chise",
        "Fuuka",
        "Hanae",
        "Haruna",
        "Hasumi",
        "Hibiki",
        "Hifumi (Swimsuit)",
        "Hina",
        "Hina (Swimsuit)",
        "Hoshino",
        "Iori",
        "Karin",
        "Kayoko",
        "Koharu",
        "Mashiro",
        "Nodoka",
        "Shiroko (Cycling)",
        "Suzumi",
        "Tsurugi",
        "Utaha",
        "Yoshimi",
        "Yuuka"
    ]
}

```
</details>

## Get character with multiple queries
Support multiple queries

> https://api.torikushi.xyz/character/query?armor=special%20armor&position=front&damage=penetration

<details>
<summary>View Payload Example</summary>

```json
{ "status": 200, "data": ["Sumire", "Tsubaki"] }
```
</details>

### License

Licensed under Open Software License v3.0
