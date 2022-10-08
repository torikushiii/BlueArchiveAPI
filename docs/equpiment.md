# Equipment API

**BASE URL:** `https://api.ennead.cc/buruaka/`

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
        "id": 6000,
        "localizeId": 1494732916,
        "recipeId": 600,
        "category": "Hairpin",
        "rarity": "N",
        "maxLevel": 10,
        "tier": 1,
        "tags": [
            "Equipment",
            "Hairpin"
        ]
    },
    "drops": [
        {
            "stageName": "CHAPTER01_Normal_Main_Stage04",
            "dropAmount": 1,
            "dropChance": 30
        },
        {
            "stageName": "CHAPTER01_Hard_Main_Stage03",
            "dropAmount": 1,
            "dropChance": 60
        },
        {
            "stageName": "CHAPTER02_Normal_Main_Stage01",
            "dropAmount": 1,
            "dropChance": 40
        },
        {
            "stageName": "CHAPTER02_Normal_Main_Stage02",
            "dropAmount": 1,
            "dropChance": 40
        },
        {
            "stageName": "CHAPTER02_Normal_Main_Stage03",
            "dropAmount": 1,
            "dropChance": 30
        },
        {
            "stageName": "CHAPTER02_Hard_Main_Stage03",
            "dropAmount": 1,
            "dropChance": 80
        }
    ]
}
```
</details>