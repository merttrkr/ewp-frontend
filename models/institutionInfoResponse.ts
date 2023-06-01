export interface InstitutionInfo {
    uniqueId: number;
    uniName: string;
    heiId: string;
}

export interface InstitutionInfoResponse {
    institutionInfos?: InstitutionInfo[];
}