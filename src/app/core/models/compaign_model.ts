export type Campaign = {
    type: CampaignType,
    title: string,
    description: string,
    score: number,
    expireDate: string,
    id: string
}

export type CampaignType = {
    icon: string
    id: number
    label: string
};