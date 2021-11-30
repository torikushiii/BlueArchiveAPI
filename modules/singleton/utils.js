const data = require("../../assets/localize/LocalizeEtcExcelTable.json");
const statData = require("../../assets/localize/CharacterStat.json")

module.exports.capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1).toLowerCase();
}

module.exports.getEquipmentName = async (ID) => {
    for (const keyData in data.DataList) {
        if (data.DataList[keyData].Key === ID) {
            return data.DataList[keyData].NameEn;
        }
    }
}

module.exports.getEquipmentDescription = async (ID) => {
    for (const keyData in data.DataList) {
        if (data.DataList[keyData].Key === ID) {
            return data.DataList[keyData].DescriptionEn;
        }
    }
}

module.exports.getEquipmentTypes = async (item) => {
    const data = ba.BlueArchiveEquipment.getDataByTier(item);
    if (data) {
        return data.ID;
    }
    else {
        return null;
    }
}

module.exports.getCharacterName = async (ID) => {
    for (const keyData in data.DataList) {
        if (data.DataList[keyData].Key === ID) {
            return (data.DataList[keyData].NameEn) ? data.DataList[keyData].NameEn : "???";
        }
    }
}

module.exports.getCharacterStat = async (ID) => {
    for (const keyData in statData.DataList) {
        if (statData.DataList[keyData].CharacterId === ID) {
            return {
                "AttackLevel1": statData.DataList[keyData].AttackPower1,
                "AttackLevel100": statData.DataList[keyData].AttackPower100,
                "MaxHPLevel1": statData.DataList[keyData].MaxHP1,
                "MaxHPLevel100": statData.DataList[keyData].MaxHP100,
                "DefenseLevel1": statData.DataList[keyData].DefensePower1,
                "DefenseLevel100": statData.DataList[keyData].DefensePower100,
                "HealPowerLevel1": statData.DataList[keyData].HealPower1,
                "HealPowerLevel100": statData.DataList[keyData].HealPower100,
                "DefensePenetrationLevel1": statData.DataList[keyData].DefensePenetration1,
                "DefensePenetrationLevel100": statData.DataList[keyData].DefensePenetration100,
                "AmmoCount": statData.DataList[keyData].AmmoCount,
                "AmmoCost": statData.DataList[keyData].AmmoCost,
                "Range": statData.DataList[keyData].Range,
                "MoveSpeed": statData.DataList[keyData].MoveSpeed
            }
        }
    }
}

module.exports.getCharacterTerrain = async (ID) => {
    for (const keyData in statData.DataList) {
        if (statData.DataList[keyData].CharacterId === ID) {
            return {
                "Urban": this.terrainTypes.Urban[statData.DataList[keyData].StreetBattleAdaptation],
                "Desert": this.terrainTypes.Desert[statData.DataList[keyData].OutdoorBattleAdaptation],
                "Indoor": this.terrainTypes.Indoor[statData.DataList[keyData].IndoorBattleAdaptation],
            }
        }
    }
}

exports.terrainTypes = {
    "Urban": {
        "SS": {
            "DamageDealt": "130%(1.3x)",
            "ShieldBlockRate": "75%",
        },
        "S": {
            "DamageDealt": "120%(1.2x)",
            "ShieldBlockRate": "60%",
        },
        "A": {
            "DamageDealt": "110%(1.1x)",
            "ShieldBlockRate": "45%",
        },
        "B": {
            "DamageDealt": "100%(1x)",
            "ShieldBlockRate": "30%",
        },
        "C": {
            "DamageDealt": "90%(0.9x)",
            "ShieldBlockRate": "15%",
        },
        "D": {
            "DamageDealt": "80%(0.8x)",
            "ShieldBlockRate": "0%",
        }
    },
    "Desert": {
        "SS": {
            "DamageDealt": "130%(1.3x)",
            "ShieldBlockRate": "75%",
        },
        "S": {
            "DamageDealt": "120%(1.2x)",
            "ShieldBlockRate": "60%",
        },
        "A": {
            "DamageDealt": "110%(1.1x)",
            "ShieldBlockRate": "45%",
        },
        "B": {
            "DamageDealt": "100%(1x)",
            "ShieldBlockRate": "30%",
        },
        "C": {
            "DamageDealt": "90%(0.9x)",
            "ShieldBlockRate": "15%",
        },
        "D": {
            "DamageDealt": "80%(0.8x)",
            "ShieldBlockRate": "0%",
        }
    },
    "Indoor": {
        "SS": {
            "DamageDealt": "130%(1.3x)",
            "ShieldBlockRate": "75%",
        },
        "S": {
            "DamageDealt": "120%(1.2x)",
            "ShieldBlockRate": "60%",
        },
        "A": {
            "DamageDealt": "110%(1.1x)",
            "ShieldBlockRate": "45%",
        },
        "B": {
            "DamageDealt": "100%(1x)",
            "ShieldBlockRate": "30%",
        },
        "C": {
            "DamageDealt": "90%(0.9x)",
            "ShieldBlockRate": "15%",
        },
        "D": {
            "DamageDealt": "80%(0.8x)",
            "ShieldBlockRate": "0%",
        }
    }
}