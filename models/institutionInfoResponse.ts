export interface InstitutionInfo {
    uniqueId: number;
    UniName: string;
    heiId: string;
}

export interface InstitutionInfoResponse {
    institutionInfos?: InstitutionInfo[];
}