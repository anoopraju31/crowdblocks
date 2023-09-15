export type CheckOrganizerType = {
	data: boolean | undefined
}

export type CampaignType = {
	data:
		| [string, string, string, bigint, bigint, bigint, bigint, boolean, boolean]
		| undefined
}
