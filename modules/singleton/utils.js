const data = require("../../assets/localize/LocalizeEtc.json");
const statData = require("../../assets/localize/CharacterStat.json");
const characterLocalize = require("../../assets/localize/LocalizeCharacterProfile.json");

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

module.exports.getCharacterInfo = async (ID) => {
    for (const keyData in characterLocalize.DataList) {
        if (characterLocalize.DataList[keyData].CharacterId === ID) {
            return {
                "ArtistName": {
                    "KR": characterLocalize.DataList[keyData].ArtistNameKr,
                    "JP": characterLocalize.DataList[keyData].ArtistNameJp,
                    "TH": characterLocalize.DataList[keyData].ArtistNameTh,
                    "TW": characterLocalize.DataList[keyData].ArtistNameTw,
                    "EN": characterLocalize.DataList[keyData].ArtistNameEn,
                    "DE": characterLocalize.DataList[keyData].ArtistNameDe,
                    "FR": characterLocalize.DataList[keyData].ArtistNameFr,
                },
                "VoiceActor": characterLocalize.DataList[keyData].CharacterVoiceEn,
                "StatusMessage": {
                    "KR": characterLocalize.DataList[keyData].StatusMessageKr,
                    "JP": characterLocalize.DataList[keyData].StatusMessageJp,
                    "TH": characterLocalize.DataList[keyData].StatusMessageTh,
                    "TW": characterLocalize.DataList[keyData].StatusMessageTw,
                    "EN": characterLocalize.DataList[keyData].StatusMessageEn,
                    "DE": characterLocalize.DataList[keyData].StatusMessageDe,
                    "FR": characterLocalize.DataList[keyData].StatusMessageFr,
                },
                "FullName": {
                    "KR": characterLocalize.DataList[keyData].FullNameKr,
                    "JP": characterLocalize.DataList[keyData].FullNameJp,
                    "TH": characterLocalize.DataList[keyData].FullNameTh,
                    "TW": characterLocalize.DataList[keyData].FullNameTw,
                    "EN": characterLocalize.DataList[keyData].FullNameEn,
                    "DE": characterLocalize.DataList[keyData].FullNameDe,
                    "FR": characterLocalize.DataList[keyData].FullNameFr,
                },
                "SchoolYear": {
                    "KR": characterLocalize.DataList[keyData].SchoolYearKr,
                    "JP": characterLocalize.DataList[keyData].SchoolYearJp,
                    "TH": characterLocalize.DataList[keyData].SchoolYearTh,
                    "TW": characterLocalize.DataList[keyData].SchoolYearTw,
                    "EN": characterLocalize.DataList[keyData].SchoolYearEn,
                    "DE": characterLocalize.DataList[keyData].SchoolYearDe,
                    "FR": characterLocalize.DataList[keyData].SchoolYearFr,
                },
                "CharacterAge": {
                    "KR": characterLocalize.DataList[keyData].CharacterAgeKr,
                    "JP": characterLocalize.DataList[keyData].CharacterAgeJp,
                    "TH": characterLocalize.DataList[keyData].CharacterAgeTh,
                    "TW": characterLocalize.DataList[keyData].CharacterAgeTw,
                    "EN": characterLocalize.DataList[keyData].CharacterAgeEn,
                    "DE": characterLocalize.DataList[keyData].CharacterAgeDe,
                    "FR": characterLocalize.DataList[keyData].CharacterAgeFr,
                },
                "BirthDate": {
                    "KR": characterLocalize.DataList[keyData].BirthdayKr,
                    "JP": characterLocalize.DataList[keyData].BirthdayJp,
                    "TH": characterLocalize.DataList[keyData].BirthdayTh,
                    "TW": characterLocalize.DataList[keyData].BirthdayTw,
                    "EN": characterLocalize.DataList[keyData].BirthdayEn,
                    "DE": characterLocalize.DataList[keyData].BirthdayDe,
                    "FR": characterLocalize.DataList[keyData].BirthdayFr,
                },
                "CharHeight": {
                    "KR": characterLocalize.DataList[keyData].CharHeightKr,
                    "JP": characterLocalize.DataList[keyData].CharHeightJp,
                    "TH": characterLocalize.DataList[keyData].CharHeightTh,
                    "TW": characterLocalize.DataList[keyData].CharHeightTw,
                    "EN": characterLocalize.DataList[keyData].CharHeightEn,
                    "DE": characterLocalize.DataList[keyData].CharHeightDe,
                    "FR": characterLocalize.DataList[keyData].CharHeightFr,
                },
                "Hobby": {
                    "KR": characterLocalize.DataList[keyData].HobbyKr,
                    "JP": characterLocalize.DataList[keyData].HobbyJp,
                    "TH": characterLocalize.DataList[keyData].HobbyTh,
                    "TW": characterLocalize.DataList[keyData].HobbyTw,
                    "EN": characterLocalize.DataList[keyData].HobbyEn,
                    "DE": characterLocalize.DataList[keyData].HobbyDe,
                    "FR": characterLocalize.DataList[keyData].HobbyFr,
                },
                "ProfileIntroduction": {
                    "KR": characterLocalize.DataList[keyData].ProfileIntroductionKr,
                    "JP": characterLocalize.DataList[keyData].ProfileIntroductionJp,
                    "TH": characterLocalize.DataList[keyData].ProfileIntroductionTh,
                    "TW": characterLocalize.DataList[keyData].ProfileIntroductionTw,
                    "EN": characterLocalize.DataList[keyData].ProfileIntroductionEn,
                    "DE": characterLocalize.DataList[keyData].ProfileIntroductionDe,
                    "FR": characterLocalize.DataList[keyData].ProfileIntroductionFr,
                }
            }
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