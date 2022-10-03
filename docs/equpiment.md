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
                "ID": 1011104
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 30
        },
        {
            "stageName": "[Hard] Main Chapter 01 - Stage 03",
            "stageInfo": {
                "ID": 1012103
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 60
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 01",
            "stageInfo": {
                "ID": 1021101
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 40
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 02",
            "stageInfo": {
                "ID": 1021102
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 40
        },
        {
            "stageName": "[Normal] Main Chapter 02 - Stage 03",
            "stageInfo": {
                "ID": 1021103
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 30
        },
        {
            "stageName": "[Hard] Main Chapter 02 - Stage 03",
            "stageInfo": {
                "ID": 1022103
            },
            "stageRewardID": 6000,
            "dropAmount": 1,
            "dropChance": 80
        }
    ]
}
```
</details>