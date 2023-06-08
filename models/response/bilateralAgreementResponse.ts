
export interface BilateralAgreement {
    ownUniNameWithHeiId: string,
    partnerUniNameWithHeiId: string,
    ownUniName: string,
    partnerUniName: string,
    agreementStateDescription: string,
    agreementState: string,
    lastUpdateDate: string,
    generationDate: string,
    bilateralAgreement_id: number,
    ownIIACode: string,
    partnerIIACode: string,
    ownErasmusIdCode: string,
    partnerErasmusIdCode: string,
    createrUniName: string
}

export interface BilateralAgreementResponse {
    BilateralAgreements?: BilateralAgreement[];
}