# Query API

**BASE URL:** `https://api.ennead.cc/buruaka/`

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