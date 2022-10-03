# Raid API

**BASE URL:** `https://api.ennead.cc/buruaka/`

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