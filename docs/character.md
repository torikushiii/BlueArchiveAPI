# Character API

**BASE URL:** `https://api.ennead.cc/buruaka/`

### Get Character
Get all character list with their basic info

> [https://api.ennead.cc/buruaka/character/](https://api.ennead.cc/buruaka/character)

> Returns: `Character Object`
<details>
<summary>View Payload Example</summary>

```json
{
    "data": [
        {
            "ID": 10000,
            "baseStar": 3,
            "rarity": "SSR",
            "name": "Aru",
            "profile": "The self-proclaimed boss of Problem Solver 68.\n\nAru expanded the Gehenna Academy's Problem Solver 68 club without permission to conduct illegal business activities. She aspires to be seen as a dashing and debonair villain, but her frequent blunders always expose her as a poser.",
            "armorType": "Light Armor",
            "bulletType": "Explosion",
            "position": "Back",
            "role": "Attacker",
            "squadType": "Striker",
            "weaponType": "SR",
            "terrain": {
                "Urban": {
                    "DamageDealt": "120%(1.2x)",
                    "ShieldBlockRate": "60%"
                },
                "Desert": {
                    "DamageDealt": "100%(1x)",
                    "ShieldBlockRate": "30%"
                },
                "Indoor": {
                    "DamageDealt": "80%(0.8x)",
                    "ShieldBlockRate": "0%"
                }
            }
        },
        {
            "ID": 10001,
            "baseStar": 3,
            "rarity": "SSR",
            "name": "Eimi",
            "profile": "An agent of the Super Phenomenon Task Force at the Millennium School.\n\nAn emotionally inscrutable oddball, Eimi very rarely speaks and can often be found staring off into space for no particular reason. However, there's no one as brutally efficient as her when it comes to carrying out missions for Seminar.",
            "armorType": "Light Armor",
            "bulletType": "Explosion",
            "position": "Front",
            "role": "Tanker",
            "squadType": "Striker",
            "weaponType": "SG",
            "terrain": {
                "Urban": {
                    "DamageDealt": "120%(1.2x)",
                    "ShieldBlockRate": "60%"
                },
                "Desert": {
                    "DamageDealt": "100%(1x)",
                    "ShieldBlockRate": "30%"
                },
                "Indoor": {
                    "DamageDealt": "80%(0.8x)",
                    "ShieldBlockRate": "0%"
                }
            }
        }
    ]
}
```
</details>

Get characters by their release status

> [https://api.ennead.cc/buruaka/character?released=true](https://api.ennead.cc/buruaka/character?released=true)

Get a single character

> [https://api.ennead.cc/buruaka/character/aru](https://api.ennead.cc/buruaka/character/aru)

> GET `character/:character` | `character/aru`

> GET `character/10015?id=true` You need to pass `?id=true` to get character by ID

> Returns: `Character Object`
<details>
<summary>View Payload Example</summary>

```json
{
    "id": 10000,
    "isReleased": true,
    "isPlayable": true,
    "character": {
        "armorType": "Light Armor",
        "baseStar": 3,
        "bulletType": "Explosion",
        "name": "Aru",
        "position": "Back",
        "profile": "The self-proclaimed boss of Problem Solver 68.\n\nAru expanded the Gehenna Academy's Problem Solver 68 club without permission to conduct illegal business activities. She aspires to be seen as a dashing and debonair villain, but her frequent blunders always expose her as a poser.",
        "rarity": "SSR",
        "role": "Attacker",
        "squadType": "Striker",
        "weaponType": "SR"
    },
    "info": {
        "age": "16 years old",
        "artis": "DoReMi",
        "club": "Kohshinjo68",
        "school": "Gehenna",
        "schoolYear": "2nd Year",
        "voiceActor": "近藤玲奈"
    },
    "stat": {
        "id": 10000,
        "attackLevel1": 369,
        "attackLevel100": 3690,
        "maxHPLevel1": 2236,
        "maxHPLevel100": 19390,
        "defenseLevel1": 19,
        "defenseLevel100": 119,
        "healPowerLevel1": 1408,
        "healPowerLevel100": 4225,
        "defPenetrateLevel1": 0,
        "defPenetrateLevel100": 0,
        "ammoCount": 5,
        "ammoCost": 1,
        "range": 750,
        "moveSpeed": 200,
        "streetMood": "S",
        "outdoorMood": "B",
        "indoorMood": "D"
    },
    "terrain": {
        "urban": {
            "DamageDealt": "120%(1.2x)",
            "ShieldBlockRate": "60%"
        },
        "outdoor": {
            "DamageDealt": "100%(1x)",
            "ShieldBlockRate": "30%"
        },
        "indoor": {
            "DamageDealt": "80%(0.8x)",
            "ShieldBlockRate": "0%"
        }
    },
    "skills": {
        "ex": [
            {
                "level": 1,
                "name": "Hard-Boiled Shot",
                "description": "Deals 274% of ATK as damage to 1 enemy.\nAlso inflicts 292% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 2,
                "name": "Hard-Boiled Shot",
                "description": "Deals 315% of ATK as damage to 1 enemy.\nAlso inflicts 335% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 3,
                "name": "Hard-Boiled Shot",
                "description": "Deals 397% of ATK as damage to 1 enemy.\nAlso inflicts 423% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 4,
                "name": "Hard-Boiled Shot",
                "description": "Deals 438% of ATK as damage to 1 enemy.\nAlso inflicts 467% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 5,
                "name": "Hard-Boiled Shot",
                "description": "Deals 521% of ATK as damage to 1 enemy.\nAlso inflicts 554% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 6,
                "name": "Hard-Boiled Shot",
                "description": "Deals 562% of ATK as damage to 1 enemy.\nAlso inflicts 598% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 7,
                "name": "Hard-Boiled Shot",
                "description": "Deals 644% of ATK as damage to 1 enemy.\nAlso inflicts 686% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 8,
                "name": "Hard-Boiled Shot",
                "description": "Deals 685% of ATK as damage to 1 enemy.\nAlso inflicts 730% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 9,
                "name": "Hard-Boiled Shot",
                "description": "Deals 768% of ATK as damage to 1 enemy.\nAlso inflicts 817% of ATK as damage to enemies within a circular area.",
                "skillCost": 4,
                "bulletType": "Explosion"
            },
            {
                "level": 10,
                "name": "Hard-Boiled Shot",
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
    }
}
```
</details>