# Banner API

**BASE URL:** `https://api.ennead.cc/buruaka/`

## Get Gacha Banners
Display all current and past banners
> [https://api.ennead.cc/buruaka/banner](https://api.ennead.cc/buruaka/banner)

> Returns : `Banner Object`
<details>
<summary>View Payload Example</summary>

```json
{
    "current": [
        {
            "id": 90050129,
            "gachaType": "PickupGacha",
            "startedAt": "Tue, 27 Sep 2022 03:00:00 GMT",
            "endedAt": "Tue, 04 Oct 2022 02:59:59 GMT",
            "rateups": [
                "Koharu"
            ]
        },
        {
            "id": 90050130,
            "gachaType": "PickupGacha",
            "startedAt": "Tue, 27 Sep 2022 03:00:00 GMT",
            "endedAt": "Tue, 04 Oct 2022 02:59:59 GMT",
            "rateups": [
                "Haruna"
            ]
        }
    ],
    "upcoming": [],
    "ended": [
        {
            "id": 90050003,
            "gachaType": "PickupGacha",
            "startedAt": "Mon, 08 Nov 2021 16:00:00 GMT",
            "endedAt": "Tue, 16 Nov 2021 04:00:00 GMT",
            "rateups": [
                "Shiroko",
                "Hoshino"
            ]
        },
        {
            "id": 90050005,
            "gachaType": "PickupGacha",
            "startedAt": "Tue, 16 Nov 2021 04:30:00 GMT",
            "endedAt": "Mon, 29 Nov 2021 04:00:00 GMT",
            "rateups": [
                "Mashiro"
            ]
        }
    ]
}
```
</details>
