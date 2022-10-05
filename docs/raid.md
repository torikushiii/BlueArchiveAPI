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
    "data": {
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
            {
                "seasonId": 6,
                "bossName": "Chesed_Outdoor",
                "startAt": "Tue, 11 Jan 2022 04:30:00 GMT",
                "endAt": "Mon, 17 Jan 2022 15:59:59 GMT"
            },
            {
                "seasonId": 7,
                "bossName": "Hieronymus",
                "startAt": "Tue, 25 Jan 2022 04:30:00 GMT",
                "endAt": "Mon, 31 Jan 2022 15:59:59 GMT"
            },
            {
                "seasonId": 8,
                "bossName": "Binah",
                "startAt": "Tue, 08 Feb 2022 04:30:00 GMT",
                "endAt": "Mon, 14 Feb 2022 15:59:59 GMT"
            },
            {
                "seasonId": 9,
                "bossName": "ShiroKuro_Indoor",
                "startAt": "Tue, 22 Feb 2022 04:30:00 GMT",
                "endAt": "Mon, 28 Feb 2022 15:59:59 GMT"
            },
            {
                "seasonId": 10,
                "bossName": "Chesed",
                "startAt": "Tue, 08 Mar 2022 04:30:00 GMT",
                "endAt": "Mon, 14 Mar 2022 15:59:59 GMT"
            },
            {
                "seasonId": 11,
                "bossName": "Kaitenger",
                "startAt": "Tue, 22 Mar 2022 04:30:00 GMT",
                "endAt": "Mon, 28 Mar 2022 15:59:59 GMT"
            },
            {
                "seasonId": 12,
                "bossName": "ShiroKuro",
                "startAt": "Tue, 05 Apr 2022 04:30:00 GMT",
                "endAt": "Mon, 11 Apr 2022 15:59:59 GMT"
            },
            {
                "seasonId": 13,
                "bossName": "Hieronymus_Street",
                "startAt": "Tue, 19 Apr 2022 04:30:00 GMT",
                "endAt": "Mon, 25 Apr 2022 15:59:59 GMT"
            },
            {
                "seasonId": 14,
                "bossName": "Kaitenger",
                "startAt": "Tue, 03 May 2022 04:30:00 GMT",
                "endAt": "Mon, 09 May 2022 15:59:59 GMT"
            },
            {
                "seasonId": 15,
                "bossName": "Binah_Street",
                "startAt": "Tue, 17 May 2022 04:30:00 GMT",
                "endAt": "Mon, 23 May 2022 15:59:59 GMT"
            },
            {
                "seasonId": 16,
                "bossName": "Perorozilla",
                "startAt": "Tue, 31 May 2022 04:30:00 GMT",
                "endAt": "Mon, 06 Jun 2022 15:59:59 GMT"
            },
            {
                "seasonId": 17,
                "bossName": "Kaitenger_Street",
                "startAt": "Tue, 14 Jun 2022 04:30:00 GMT",
                "endAt": "Mon, 20 Jun 2022 15:59:59 GMT"
            },
            {
                "seasonId": 18,
                "bossName": "Binah",
                "startAt": "Tue, 28 Jun 2022 04:30:00 GMT",
                "endAt": "Mon, 04 Jul 2022 15:59:59 GMT"
            },
            {
                "seasonId": 19,
                "bossName": "Perorozilla",
                "startAt": "Tue, 12 Jul 2022 04:30:00 GMT",
                "endAt": "Mon, 18 Jul 2022 15:59:59 GMT"
            },
            {
                "seasonId": 20,
                "bossName": "Hieronymus",
                "startAt": "Tue, 26 Jul 2022 04:30:00 GMT",
                "endAt": "Mon, 01 Aug 2022 15:59:59 GMT"
            },
            {
                "seasonId": 21,
                "bossName": "Chesed_Outdoor",
                "startAt": "Tue, 09 Aug 2022 04:30:00 GMT",
                "endAt": "Mon, 15 Aug 2022 15:59:59 GMT"
            },
            {
                "seasonId": 22,
                "bossName": "Perorozilla_Outdoor",
                "startAt": "Tue, 23 Aug 2022 04:30:00 GMT",
                "endAt": "Mon, 29 Aug 2022 15:59:59 GMT"
            },
            {
                "seasonId": 23,
                "bossName": "HOD",
                "startAt": "Tue, 13 Sep 2022 03:00:00 GMT",
                "endAt": "Mon, 19 Sep 2022 19:59:59 GMT"
            },
            {
                "seasonId": 24,
                "bossName": "ShiroKuro",
                "startAt": "Tue, 27 Sep 2022 03:00:00 GMT",
                "endAt": "Mon, 03 Oct 2022 19:59:59 GMT"
            }
        ]
    }
}

```
</details>