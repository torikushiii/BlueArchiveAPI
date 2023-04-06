# Raid API

**BASE URL:** `https://api.ennead.cc/buruaka/`

## Get Raids
Display all current and future raids
> [https://api.ennead.cc/buruaka/raid](https://api.ennead.cc/buruaka/raid)
> [https://api.ennead.cc/buruaka/raid?region=japan](https://api.ennead.cc/buruaka/raid?region=japan)

> Returns : `Raid Object`
<details>
<summary>View Payload Example</summary>

```json
{
    "current": [],
    "upcoming": [
        {
            "seasonId": 25,
            "bossName": "Kaitenger",
            "startAt": "Tue, 11 Oct 2022 03:00:00 GMT",
            "endAt": "Mon, 17 Oct 2022 19:59:59 GMT"
        },
        {
            "seasonId": 26,
            "bossName": "Binah_Street",
            "startAt": "Tue, 25 Oct 2022 03:00:00 GMT",
            "endAt": "Mon, 31 Oct 2022 19:59:59 GMT"
        },
        {
            "seasonId": 27,
            "bossName": "HOD",
            "startAt": "Tue, 08 Nov 2022 03:00:00 GMT",
            "endAt": "Mon, 14 Nov 2022 19:59:59 GMT"
        }
    ],
    "ended": [
        {
            "seasonId": 1,
            "bossName": "Binah",
            "startAt": "Thu, 14 Oct 2021 04:30:00 GMT",
            "endAt": "Wed, 03 Nov 2021 15:59:59 GMT"
        },
        {
            "seasonId": 2,
            "bossName": "Binah",
            "startAt": "Tue, 16 Nov 2021 04:30:00 GMT",
            "endAt": "Mon, 22 Nov 2021 15:59:59 GMT"
        },
        {
            "seasonId": 3,
            "bossName": "ShiroKuro",
            "startAt": "Mon, 29 Nov 2021 04:30:00 GMT",
            "endAt": "Mon, 06 Dec 2021 15:59:59 GMT"
        },
        {
            "seasonId": 4,
            "bossName": "Chesed_Outdoor",
            "startAt": "Tue, 14 Dec 2021 04:30:00 GMT",
            "endAt": "Mon, 20 Dec 2021 15:59:59 GMT"
        },
        {
            "seasonId": 5,
            "bossName": "ShiroKuro_Indoor",
            "startAt": "Tue, 28 Dec 2021 04:30:00 GMT",
            "endAt": "Mon, 03 Jan 2022 15:59:59 GMT"
        },
        ...
    ]
}

```
</details>