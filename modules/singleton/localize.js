module.exports.getName = async (ID) => {
    const data = require("../../assets/localize/LocalizeEtcExcelTable.json");
    for (const keyData in data.DataList) {
        if (data.DataList[keyData].Key === ID) {
            return data.DataList[keyData].NameEn;
        }
    }
}

module.exports.getDescription = async (ID) => {
    const data = require("../../assets/localize/LocalizeEtcExcelTable.json");
    for (const keyData in data.DataList) {
        if (data.DataList[keyData].Key === ID) {
            return data.DataList[keyData].DescriptionEn;
        }
    }
}

module.exports.getTypes = async (item) => {
    const data = ba.BlueArchiveEquipment.getDataByTier(item);
    if (data) {
        return data.ID;
    }
    else {
        return null;
    }
}