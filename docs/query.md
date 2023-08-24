# Query API

**BASE URL:** `https://api.ennead.cc/buruaka/`

## Character Query list example

### Get characters by their role

> https://api.ennead.cc/buruaka/character/query?role=dealer

    Role list:
     - Tank
     - Dealer
     - Healer
     - Support
     - T.S.

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 10000,
    "name": "Aru"
  },
  {
    "id": 10002,
    "name": "Haruna"
  },
  {
    "id": 10004,
    "name": "Hina"
  },
  {
    "id": 10006,
    "name": "Iori"
  },
  {
    "id": 10007,
    "name": "Maki"
  },
  {
    "id": 10008,
    "name": "Neru"
  },
  {
    "id": 10009,
    "name": "Izumi"
  },
  {
    "id": 10010,
    "name": "Shiroko"
  },
  {
    "id": 10011,
    "name": "Shun"
  },
  {
    "id": 10012,
    "name": "Sumire"
  },
  {
    "id": 10013,
    "name": "Tsurugi"
  },
  {
    "id": 10014,
    "name": "Izuna"
  },
  {
    "id": 10015,
    "name": "Aris"
  },
  {
    "id": 10016,
    "name": "Midori"
  },
  {
    "id": 10017,
    "name": "Cherino"
  },
  {
    "id": 10018,
    "name": "Yuzu"
  },
  {
    "id": 10019,
    "name": "Azusa"
  },
  {
    "id": 10021,
    "name": "Azusa (Swimsuit)"
  },
  {
    "id": 10022,
    "name": "Hina (Swimsuit)"
  },
  {
    "id": 10023,
    "name": "Iori (Swimsuit)"
  },
  {
    "id": 10024,
    "name": "Shiroko (Cycling)"
  },
  {
    "id": 10025,
    "name": "Shun (Small)"
  },
  {
    "id": 10027,
    "name": "Karin (Bunny)"
  },
  {
    "id": 10031,
    "name": "Aru (New Year)"
  },
  {
    "id": 10032,
    "name": "Mutsuki (New Year)"
  },
  {
    "id": 10033,
    "name": "Wakamo"
  },
  {
    "id": 10036,
    "name": "Hinata"
  },
  {
    "id": 10041,
    "name": "Misaki"
  },
  {
    "id": 10043,
    "name": "Wakamo (Swimsuit)"
  },
  {
    "id": 10044,
    "name": "Nonomi (Swimsuit)"
  },
  {
    "id": 10046,
    "name": "Izuna (Swimsuit)"
  },
  {
    "id": 10048,
    "name": "Saori"
  },
  {
    "id": 10049,
    "name": "Kazusa"
  },
  {
    "id": 10051,
    "name": "Utaha (Cheer Squad)"
  },
  {
    "id": 10055,
    "name": "Shigure"
  },
  {
    "id": 10057,
    "name": "Haruna (New Year)"
  },
  {
    "id": 13001,
    "name": "Chise"
  },
  {
    "id": 13002,
    "name": "Akari"
  },
  {
    "id": 13003,
    "name": "Hasumi"
  },
  {
    "id": 13004,
    "name": "Nonomi"
  },
  {
    "id": 13006,
    "name": "Mutsuki"
  },
  {
    "id": 13007,
    "name": "Junko"
  },
  {
    "id": 13008,
    "name": "Serika"
  },
  {
    "id": 13011,
    "name": "Momoi"
  },
  {
    "id": 16001,
    "name": "Asuna"
  },
  {
    "id": 16004,
    "name": "Pina"
  },
  {
    "id": 16005,
    "name": "Tsurugi (Swimsuit)"
  },
  {
    "id": 16008,
    "name": "Fubuki"
  },
  {
    "id": 16009,
    "name": "Michiru"
  },
  {
    "id": 16010,
    "name": "Hibiki (Cheer Squad)"
  },
  {
    "id": 16011,
    "name": "Hasumi (Track)"
  },
  {
    "id": 16012,
    "name": "Junko (New Year)"
  },
  {
    "id": 20000,
    "name": "Hibiki"
  },
  {
    "id": 20001,
    "name": "Karin"
  },
  {
    "id": 20002,
    "name": "Saya"
  },
  {
    "id": 20003,
    "name": "Mashiro"
  },
  {
    "id": 20004,
    "name": "Mashiro (Swimsuit)"
  },
  {
    "id": 20006,
    "name": "Saya (Casual)"
  },
  {
    "id": 20013,
    "name": "Chihiro"
  },
  {
    "id": 20014,
    "name": "Saki"
  },
  {
    "id": 20018,
    "name": "Moe"
  },
  {
    "id": 20019,
    "name": "Akane (Bunny)"
  },
  {
    "id": 23004,
    "name": "Utaha"
  },
  {
    "id": 26005,
    "name": "Yoshimi"
  }
]
```
</details>

### Get characters by their type
> https://api.ennead.cc/buruaka/character/query?type=special

    Type list:
     - Special
     - Striker

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 20000,
    "name": "Hibiki"
  },
  {
    "id": 20001,
    "name": "Karin"
  },
  {
    "id": 20002,
    "name": "Saya"
  },
  {
    "id": 20003,
    "name": "Mashiro"
  },
  {
    "id": 20004,
    "name": "Mashiro (Swimsuit)"
  },
  {
    "id": 20005,
    "name": "Hifumi (Swimsuit)"
  },
  {
    "id": 20006,
    "name": "Saya (Casual)"
  },
  {
    "id": 20007,
    "name": "Hatsune Miku"
  },
  {
    "id": 20008,
    "name": "Ako"
  },
  {
    "id": 20009,
    "name": "Cherino (Hot Spring)"
  },
  {
    "id": 20010,
    "name": "Nodoka (Hot Spring)"
  },
  {
    "id": 20011,
    "name": "Serika (New Year)"
  },
  {
    "id": 20012,
    "name": "Sena"
  },
  {
    "id": 20013,
    "name": "Chihiro"
  },
  {
    "id": 20014,
    "name": "Saki"
  },
  {
    "id": 20015,
    "name": "Kaede"
  },
  {
    "id": 20016,
    "name": "Iroha"
  },
  {
    "id": 20017,
    "name": "Hiyori"
  },
  {
    "id": 20018,
    "name": "Moe"
  },
  {
    "id": 20019,
    "name": "Akane (Bunny)"
  },
  {
    "id": 20020,
    "name": "Himari"
  },
  {
    "id": 20021,
    "name": "Hanae (Christmas)"
  },
  {
    "id": 20022,
    "name": "Fuuka (New Year)"
  },
  {
    "id": 23000,
    "name": "Airi"
  },
  {
    "id": 23001,
    "name": "Fuuka"
  },
  {
    "id": 23002,
    "name": "Hanae"
  },
  {
    "id": 23003,
    "name": "Hare"
  },
  {
    "id": 23004,
    "name": "Utaha"
  },
  {
    "id": 23005,
    "name": "Ayane"
  },
  {
    "id": 23006,
    "name": "Shizuko"
  },
  {
    "id": 23007,
    "name": "Hanako"
  },
  {
    "id": 23008,
    "name": "Mari"
  },
  {
    "id": 26000,
    "name": "Chinatsu"
  },
  {
    "id": 26001,
    "name": "Kotama"
  },
  {
    "id": 26002,
    "name": "Juri"
  },
  {
    "id": 26003,
    "name": "Serina"
  },
  {
    "id": 26004,
    "name": "Shimiko"
  },
  {
    "id": 26005,
    "name": "Yoshimi"
  },
  {
    "id": 26006,
    "name": "Nodoka"
  },
  {
    "id": 26007,
    "name": "Ayane (Swimsuit)"
  },
  {
    "id": 26008,
    "name": "Shizuko (Swimsuit)"
  }
]
```
</details>

### Get chracters by their school
> https://api.ennead.cc/buruaka/character/query?school=abydos

    School list:
     - Abydos
     - Arius
     - Gehenna
     - Hyakkiyako
     - Millennium
     - Red Winter
     - Shanhaijing
     - SRT
     - Trinity
     - Valkyrie

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 10005,
    "name": "Hoshino"
  },
  {
    "id": 10010,
    "name": "Shiroko"
  },
  {
    "id": 10024,
    "name": "Shiroko (Cycling)"
  },
  {
    "id": 10044,
    "name": "Nonomi (Swimsuit)"
  },
  {
    "id": 10045,
    "name": "Hoshino (Swimsuit)"
  },
  {
    "id": 13004,
    "name": "Nonomi"
  },
  {
    "id": 13008,
    "name": "Serika"
  },
  {
    "id": 20011,
    "name": "Serika (New Year)"
  },
  {
    "id": 23005,
    "name": "Ayane"
  },
  {
    "id": 26007,
    "name": "Ayane (Swimsuit)"
  }
]
```
</details>

### Get characters by their club
> https://api.ennead.cc/buruaka/character/query?club=countermeasure
> https://api.ennead.cc/buruaka/character/query?club=countermeasure&region=japan

    Club List:
      - Kohshinjo68
      - SPTF
      - GourmetClub
      - RemedialClass
      - Fuuki
      - Countermeasure
      - Veritas
      - CleanNClearing
      - Meihuayuan
      - TrainingClub
      - Justice
      - NinpoKenkyubu
      - GameDev
      - RedwinterSecretary
      - HoukagoDessert
      - EmptyClub
      - Shugyobu
      - BookClub
      - SisterHood
      - RabbitPlatoon
      - AriusSqud
      - Onmyobu
      - Engineer
      - TheSeminar
      - Class227
      - KnightsHospitaller
      - anzenkyoku
      - TrinityVigilance
      - MatsuriOffice
      - Endanbou
      - Emergentology
      - PandemoniumSociety
      - FoodService
      - KnowledgeLiberationFront

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 10005,
    "name": "Hoshino"
  },
  {
    "id": 10010,
    "name": "Shiroko"
  },
  {
    "id": 10024,
    "name": "Shiroko (Cycling)"
  },
  {
    "id": 10044,
    "name": "Nonomi (Swimsuit)"
  },
  {
    "id": 10045,
    "name": "Hoshino (Swimsuit)"
  },
  {
    "id": 13004,
    "name": "Nonomi"
  },
  {
    "id": 13008,
    "name": "Serika"
  },
  {
    "id": 20011,
    "name": "Serika (New Year)"
  },
  {
    "id": 23005,
    "name": "Ayane"
  },
  {
    "id": 26007,
    "name": "Ayane (Swimsuit)"
  }
]
```
</details>

### Get characters by their position
> https://api.ennead.cc/buruaka/character/query?position=front

    Position list:
     - Front
     - Middle
     - Back

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 10001,
    "name": "Eimi"
  },
  {
    "id": 10005,
    "name": "Hoshino"
  },
  {
    "id": 10008,
    "name": "Neru"
  },
  {
    "id": 10012,
    "name": "Sumire"
  },
  {
    "id": 10013,
    "name": "Tsurugi"
  },
  {
    "id": 10014,
    "name": "Izuna"
  },
  {
    "id": 10026,
    "name": "Neru (Bunny)"
  },
  {
    "id": 10029,
    "name": "Natsu"
  },
  {
    "id": 10037,
    "name": "Marina"
  },
  {
    "id": 10038,
    "name": "Miyako"
  },
  {
    "id": 10040,
    "name": "Tsukuyo"
  },
  {
    "id": 10042,
    "name": "Atsuko"
  },
  {
    "id": 10045,
    "name": "Hoshino (Swimsuit)"
  },
  {
    "id": 10046,
    "name": "Izuna (Swimsuit)"
  },
  {
    "id": 10051,
    "name": "Utaha (Cheer Squad)"
  },
  {
    "id": 10053,
    "name": "Yuuka (Track)"
  },
  {
    "id": 10058,
    "name": "Mine"
  },
  {
    "id": 13009,
    "name": "Tsubaki"
  },
  {
    "id": 13010,
    "name": "Yuuka"
  },
  {
    "id": 16000,
    "name": "Haruka"
  },
  {
    "id": 16005,
    "name": "Tsurugi (Swimsuit)"
  },
  {
    "id": 16009,
    "name": "Michiru"
  }
]
```
</details>

### Get characters by their weapon type
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
     - FT

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 10003,
    "name": "Hifumi"
  },
  {
    "id": 10010,
    "name": "Shiroko"
  },
  {
    "id": 10019,
    "name": "Azusa"
  },
  {
    "id": 10021,
    "name": "Azusa (Swimsuit)"
  },
  {
    "id": 10024,
    "name": "Shiroko (Cycling)"
  },
  {
    "id": 10028,
    "name": "Asuna (Bunny)"
  },
  {
    "id": 10048,
    "name": "Saori"
  },
  {
    "id": 10050,
    "name": "Kokona"
  },
  {
    "id": 10056,
    "name": "Serina (Christmas)"
  },
  {
    "id": 13002,
    "name": "Akari"
  },
  {
    "id": 13007,
    "name": "Junko"
  },
  {
    "id": 13008,
    "name": "Serika"
  },
  {
    "id": 13011,
    "name": "Momoi"
  },
  {
    "id": 16001,
    "name": "Asuna"
  },
  {
    "id": 16003,
    "name": "Suzumi"
  },
  {
    "id": 16012,
    "name": "Junko (New Year)"
  },
  {
    "id": 20005,
    "name": "Hifumi (Swimsuit)"
  },
  {
    "id": 20011,
    "name": "Serika (New Year)"
  },
  {
    "id": 20013,
    "name": "Chihiro"
  },
  {
    "id": 20021,
    "name": "Hanae (Christmas)"
  },
  {
    "id": 23002,
    "name": "Hanae"
  },
  {
    "id": 23003,
    "name": "Hare"
  },
  {
    "id": 23007,
    "name": "Hanako"
  },
  {
    "id": 26003,
    "name": "Serina"
  },
  {
    "id": 26004,
    "name": "Shimiko"
  },
  {
    "id": 26005,
    "name": "Yoshimi"
  }
]
```
</details>

### Get characters by their attack type
> https://api.ennead.cc/buruaka/character/query?damage=explosive

    Damage list:
     - Explosive
     - Mystic
     - Piercing

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 10000,
    "name": "Aru"
  },
  {
    "id": 10001,
    "name": "Eimi"
  },
  {
    "id": 10004,
    "name": "Hina"
  },
  {
    "id": 10009,
    "name": "Izumi"
  },
  {
    "id": 10010,
    "name": "Shiroko"
  },
  {
    "id": 10011,
    "name": "Shun"
  },
  {
    "id": 10019,
    "name": "Azusa"
  },
  {
    "id": 10020,
    "name": "Koharu"
  },
  {
    "id": 10022,
    "name": "Hina (Swimsuit)"
  },
  {
    "id": 10023,
    "name": "Iori (Swimsuit)"
  },
  {
    "id": 10025,
    "name": "Shun (Small)"
  },
  {
    "id": 10026,
    "name": "Neru (Bunny)"
  },
  {
    "id": 10035,
    "name": "Ui"
  },
  {
    "id": 10041,
    "name": "Misaki"
  },
  {
    "id": 10042,
    "name": "Atsuko"
  },
  {
    "id": 10044,
    "name": "Nonomi (Swimsuit)"
  },
  {
    "id": 10045,
    "name": "Hoshino (Swimsuit)"
  },
  {
    "id": 10048,
    "name": "Saori"
  },
  {
    "id": 10055,
    "name": "Shigure"
  },
  {
    "id": 10057,
    "name": "Haruna (New Year)"
  },
  {
    "id": 10058,
    "name": "Mine"
  },
  {
    "id": 13002,
    "name": "Akari"
  },
  {
    "id": 13005,
    "name": "Kayoko"
  },
  {
    "id": 13006,
    "name": "Mutsuki"
  },
  {
    "id": 13008,
    "name": "Serika"
  },
  {
    "id": 13010,
    "name": "Yuuka"
  },
  {
    "id": 13012,
    "name": "Kirino"
  },
  {
    "id": 16000,
    "name": "Haruka"
  },
  {
    "id": 16003,
    "name": "Suzumi"
  },
  {
    "id": 16006,
    "name": "Izumi (Swimsuit)"
  },
  {
    "id": 16010,
    "name": "Hibiki (Cheer Squad)"
  },
  {
    "id": 20000,
    "name": "Hibiki"
  },
  {
    "id": 20002,
    "name": "Saya"
  },
  {
    "id": 20003,
    "name": "Mashiro"
  },
  {
    "id": 20007,
    "name": "Hatsune Miku"
  },
  {
    "id": 20009,
    "name": "Cherino (Hot Spring)"
  },
  {
    "id": 20010,
    "name": "Nodoka (Hot Spring)"
  },
  {
    "id": 20015,
    "name": "Kaede"
  },
  {
    "id": 20017,
    "name": "Hiyori"
  },
  {
    "id": 23000,
    "name": "Airi"
  },
  {
    "id": 23001,
    "name": "Fuuka"
  },
  {
    "id": 23002,
    "name": "Hanae"
  },
  {
    "id": 23003,
    "name": "Hare"
  },
  {
    "id": 26001,
    "name": "Kotama"
  },
  {
    "id": 26002,
    "name": "Juri"
  },
  {
    "id": 26004,
    "name": "Shimiko"
  },
  {
    "id": 26006,
    "name": "Nodoka"
  }
]
```
</details>

### Get characters by their armor type
> https://api.ennead.cc/buruaka/character/query?armor=heavy

    Armor list:
     - Heavy
     - Light
     - Special
     - Elastic

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 10002,
    "name": "Haruna"
  },
  {
    "id": 10004,
    "name": "Hina"
  },
  {
    "id": 10005,
    "name": "Hoshino"
  },
  {
    "id": 10006,
    "name": "Iori"
  },
  {
    "id": 10013,
    "name": "Tsurugi"
  },
  {
    "id": 10019,
    "name": "Azusa"
  },
  {
    "id": 10020,
    "name": "Koharu"
  },
  {
    "id": 10022,
    "name": "Hina (Swimsuit)"
  },
  {
    "id": 10024,
    "name": "Shiroko (Cycling)"
  },
  {
    "id": 10026,
    "name": "Neru (Bunny)"
  },
  {
    "id": 10027,
    "name": "Karin (Bunny)"
  },
  {
    "id": 10029,
    "name": "Natsu"
  },
  {
    "id": 10032,
    "name": "Mutsuki (New Year)"
  },
  {
    "id": 10036,
    "name": "Hinata"
  },
  {
    "id": 10038,
    "name": "Miyako"
  },
  {
    "id": 10043,
    "name": "Wakamo (Swimsuit)"
  },
  {
    "id": 10049,
    "name": "Kazusa"
  },
  {
    "id": 10055,
    "name": "Shigure"
  },
  {
    "id": 13001,
    "name": "Chise"
  },
  {
    "id": 13002,
    "name": "Akari"
  },
  {
    "id": 13003,
    "name": "Hasumi"
  },
  {
    "id": 13005,
    "name": "Kayoko"
  },
  {
    "id": 13010,
    "name": "Yuuka"
  },
  {
    "id": 16003,
    "name": "Suzumi"
  },
  {
    "id": 16008,
    "name": "Fubuki"
  },
  {
    "id": 16012,
    "name": "Junko (New Year)"
  },
  {
    "id": 20000,
    "name": "Hibiki"
  },
  {
    "id": 20001,
    "name": "Karin"
  },
  {
    "id": 20003,
    "name": "Mashiro"
  },
  {
    "id": 20005,
    "name": "Hifumi (Swimsuit)"
  },
  {
    "id": 20008,
    "name": "Ako"
  },
  {
    "id": 20009,
    "name": "Cherino (Hot Spring)"
  },
  {
    "id": 20013,
    "name": "Chihiro"
  },
  {
    "id": 20016,
    "name": "Iroha"
  },
  {
    "id": 20019,
    "name": "Akane (Bunny)"
  },
  {
    "id": 23001,
    "name": "Fuuka"
  },
  {
    "id": 23002,
    "name": "Hanae"
  },
  {
    "id": 23004,
    "name": "Utaha"
  },
  {
    "id": 26005,
    "name": "Yoshimi"
  },
  {
    "id": 26006,
    "name": "Nodoka"
  },
  {
    "id": 26008,
    "name": "Shizuko (Swimsuit)"
  }
]
```
</details>

## Get character with multiple queries
Support multiple queries

> https://api.ennead.cc/buruaka/character/query?armor=special&position=front&damage=penetration

<details>
<summary>View Payload Example</summary>

```json
[
  {
    "id": 10012,
    "name": "Sumire"
  },
  {
    "id": 10042,
    "name": "Atsuko"
  },
  {
    "id": 10045,
    "name": "Hoshino (Swimsuit)"
  },
  {
    "id": 10046,
    "name": "Izuna (Swimsuit)"
  },
  {
    "id": 10051,
    "name": "Utaha (Cheer Squad)"
  },
  {
    "id": 10053,
    "name": "Yuuka (Track)"
  },
  {
    "id": 13009,
    "name": "Tsubaki"
  },
  {
    "id": 16005,
    "name": "Tsurugi (Swimsuit)"
  }
]
```
</details>