
# Blue Archive API

## *This API data is mainly based from global version of Blue Archive*

An API that primarily focused on drop rate of each stages on Blue Archive.

Now Support Characters Data!

**Hosted API at https://api.ennead.cc/buruaka !**

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

**BASE URL:** `https://api.ennead.cc/buruaka/`

## Routes

### Get Equipment
Get Equipment by Tier or ID

> [https://api.ennead.cc/buruaka/equipment/](https://api.ennead.cc/buruaka/equipment)

> GET `equipment/:equipment` | `equipment/t1%20hairpin` | `equipment/Tennis%20Headband`

> GET `equipment/6000?id=true` You need to pass `?id=true` to get equipment by ID

> Returns: `Equipment Object`
<details>
<summary>View Payload Example</summary>

```json
{
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
    "drops": [
        {
            "stageName": "[Normal] Main Chapter 01 - Stage 04",
            "stageInfo": {
                "ID": 1011104,
                "stageData": "https://api.ennead.cc/buruaka/stage/1011104"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 30
        },
        {
            "stageName": "[Hard] Main Chapter 01 - Stage 03",
            "stageInfo": {
                "ID": 1012103,
                "stageData": "https://api.ennead.cc/buruaka/stage/1012103"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 60
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 01",
            "stageInfo": {
                "ID": 1021101,
                "stageData": "https://api.ennead.cc/buruaka/stage/1021101"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 40
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 02",
            "stageInfo": {
                "ID": 1021102,
                "stageData": "https://api.ennead.cc/buruaka/stage/1021102"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 40
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 03",
            "stageInfo": {
                "ID": 1021103,
                "stageData": "https://api.ennead.cc/buruaka/stage/1021103"
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 30
        },
        {
            "stageName": "[Hard] Main Chapter 02 - Stage 03",
            "stageInfo": {
                "ID": 1022103,
                "stageData": "https://api.ennead.cc/buruaka/stage/1022103"
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

> [https://api.ennead.cc/buruaka/character/](https://api.ennead.cc/buruaka/character)

> GET `character/:character` | `character/aru`

> GET `character/10015?id=true` You need to pass `?id=true` to get character by ID

> Returns: `Character Object`
<details>
<summary>View Payload Example</summary>

```json
{
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
            "voiceActor": "近藤玲奈"
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
                "KR": "近藤玲奈",
                "JP": "近藤玲奈",
                "TH": "近藤玲奈",
                "TW": "近藤玲奈",
                "EN": "近藤玲奈",
                "DE": null,
                "FR": null
            },
            "StatusMessage": {
                "KR": "무엇이든 해결해 드립니다",
                "JP": "なんでも解決するわよ！",
                "TH": "ฉันจะจัดการให้ทุกเรื่องเลยค่ะ",
                "TW": "為您解決任何事",
                "EN": "I'll solve any problem!",
                "DE": null,
                "FR": null
            },
            "FullName": {
                "KR": "리쿠하치마 아루",
                "JP": "陸八魔アル",
                "TH": "리쿠하치마 아루",
                "TW": "리쿠하치마 아루",
                "EN": "리쿠하치마 아루",
                "DE": "리쿠하치마 아루",
                "FR": "리쿠하치마 아루"
            },
            "SchoolYear": {
                "KR": "2학년",
                "JP": "2年生",
                "TH": "ชั้นปีที่ 2",
                "TW": "2年級",
                "EN": "2nd Year",
                "DE": null,
                "FR": null
            },
            "CharacterAge": {
                "KR": "16세",
                "JP": "16歳",
                "TH": "16 ปี",
                "TW": "16歲",
                "EN": "16 years old",
                "DE": null,
                "FR": null
            },
            "BirthDate": {
                "KR": "3월 12일",
                "JP": "3月12日",
                "TH": "12 มี.ค.",
                "TW": "3月12日",
                "EN": "March 12th",
                "DE": null,
                "FR": null
            },
            "CharHeight": {
                "KR": "160cm",
                "JP": "160cm",
                "TH": "160 ซม.",
                "TW": "160cm",
                "EN": "5'2\"",
                "DE": null,
                "FR": null
            },
            "Hobby": {
                "KR": "경영 공부",
                "JP": "経営の勉強",
                "TH": "เรียนการบริหาร",
                "TW": "學習經營",
                "EN": "Studying management",
                "DE": null,
                "FR": null
            },
            "ProfileIntroduction": {
                "KR": "흥신소 68의 자칭 사장. \n\n게헨나 학원의 동아리인 흥신소 68을 제멋대로 확장시켜 마음대로 불법 사업을 하고 있다. \n아루 본인은 스스로가 멋진 악당처럼 보이기를 희망하고 있지만 빈틈이 많아 허당이라는 실체가 쉽게 드러나곤 한다.",
                "JP": "ゲヘナ学園所属、便利屋68の自称社長。\n\nゲヘナ学園の部活である便利屋68で、好き勝手に不法事業を行っている少女。\nアル本人はかっこいい悪党としてふるまいたいと思っているものの、抜けているところが多いためすぐにバレてしまう。",
                "TH": "สาวน้อยที่ยกย่องตัวเองเป็นประธาน ของหน่วยรับจ้างสารพัด 68\n\nเธอขยายชมรมหน่วยรับจ้างสารพัด 68 ของสถาบันเกเฮนน่า และทำธุรกิจสีเทาอย่างไม่สนใจใคร เธออยากให้คนอื่นมองเธอว่าเป็นอันธพาลสุดเท่ แต่ในหลายๆ ครั้งเธอก็เผลอเปิดเผยตัวตนที่แท้จริง ว่าเธอคือคนติงต๊องดีๆ นี่เอง",
                "TW": "自稱徵信社68的社長。\n\n恣意擴大格黑娜學園的社團--徵信社68，正胡亂進行非法事業。\n雖然亞瑠本人希望自己看起來像帥氣的壞蛋，但卻破綻百出，一下子就顯露出自己呆萌的真面目。",
                "EN": "The self-proclaimed boss of Problem Solver 68.\n\nAru expanded the Gehenna Academy's Problem Solver 68 club without permission to conduct illegal business activities. She aspires to be seen as a dashing and debonair villain, but her frequent blunders always expose her as a poser.",
                "DE": null,
                "FR": null
            },
            "CharacterSSRNewLine": {
                "KR": "후후후. 탁월한 선택이야.\n선생님.",
                "JP": "ふふふ、素晴らしい選択よ\n先生",
                "TH": "ฮุฮุฮุ เลือกถูกคนแล้วล่ะคุณครู",
                "TW": "呼呼呼。這是明智的選擇，\n老師。",
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
> [https://api.ennead.cc/buruaka/raid](https://api.ennead.cc/buruaka/raid)

> Returns : `Raid Object`
<details>
<summary>View Payload Example</summary>

```json
{
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

> https://api.ennead.cc/buruaka/character/query?role=attacker

    Role list:
     - Attacker
     - Healer
     - Supporter
     - Tanker

<details>
<summary>View Payload Example</summary>

```json
{
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
> https://api.ennead.cc/buruaka/character/query?type=special

    Type list:
     - Special
     - Striker

<details>
<summary>View Payload Example</summary>

```json
{
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
> https://api.ennead.cc/buruaka/character/query?school=abydos

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
> https://api.ennead.cc/buruaka/character/query?position=front

    Position list:
     - Front
     - Middle
     - Back

<details>
<summary>View Payload Example</summary>

```json
{
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
> https://api.ennead.cc/buruaka/character/query?weapon=ar


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
> https://api.ennead.cc/buruaka/character/query?damage=explosion

    Damage list:
     - Explosion
     - Mystic
     - Penetration

<details>
<summary>View Payload Example</summary>

```json
{
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
> https://api.ennead.cc/buruaka/character/query?armor=heavy%20armor

    Armor list:
     - Heavy Armor
     - Light Armor
     - Special Armor

<details>
<summary>View Payload Example</summary>

```json
{
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

> https://api.ennead.cc/buruaka/character/query?armor=special%20armor&position=front&damage=penetration

<details>
<summary>View Payload Example</summary>

```json
{ "data": ["Sumire", "Tsubaki"] }
```
</details>

### License

Licensed under Open Software License v3.0
