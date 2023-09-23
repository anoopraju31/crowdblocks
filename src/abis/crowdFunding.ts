export const CrowdFundingABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'id',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'organizer',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'title',
				type: 'string',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'collectedAmount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'targetAmount',
				type: 'uint256',
			},
		],
		name: 'CampaignComplete',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'id',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'category',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'title',
				type: 'string',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'organizer',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'target',
				type: 'uint256',
			},
		],
		name: 'CampaignCreated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_id',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'donor',
				type: 'address',
			},
		],
		name: 'DonatedToCampaign',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'walletAddress',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'name',
				type: 'string',
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'emailId',
				type: 'string',
			},
		],
		name: 'OrganizerCreated',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'campaigns',
		outputs: [
			{
				internalType: 'address',
				name: 'organizer',
				type: 'address',
			},
			{
				internalType: 'string',
				name: 'title',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'description',
				type: 'string',
			},
			{
				internalType: 'uint256',
				name: 'category',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'startDate',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'targetAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'collectedAmount',
				type: 'uint256',
			},
			{
				internalType: 'bool',
				name: 'isCompleted',
				type: 'bool',
			},
			{
				internalType: 'bool',
				name: 'isValid',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256',
			},
		],
		name: 'checkCampaignCompleted',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_category',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: '_title',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_description',
				type: 'string',
			},
			{
				internalType: 'string[]',
				name: '_images',
				type: 'string[]',
			},
			{
				internalType: 'uint256',
				name: '_deadline',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_target',
				type: 'uint256',
			},
		],
		name: 'createCampaign',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_name',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_contact',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_emailId',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_profile',
				type: 'string',
			},
			{
				internalType: 'uint256',
				name: '_phone',
				type: 'uint256',
			},
		],
		name: 'createOrganizer',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256',
			},
		],
		name: 'donateToCampaign',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getAllActiveCampaigns',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getAllCompletedCampaigns',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256',
			},
		],
		name: 'getCampaignContributions',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'contributor',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'contribution',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'date',
						type: 'uint256',
					},
				],
				internalType: 'struct CrowdBlocks.Contribution[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256',
			},
		],
		name: 'getCampaignImage',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256',
			},
		],
		name: 'getCampaignImages',
		outputs: [
			{
				internalType: 'string[]',
				name: '',
				type: 'string[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getContractBalance',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_address',
				type: 'address',
			},
		],
		name: 'getIdofCampaignsOrganizedByOrganizer',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getNumberOfClosedCampaigns',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'getUserContributions',
		outputs: [
			{
				components: [
					{
						internalType: 'uint256',
						name: 'campaignId',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'contribution',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'date',
						type: 'uint256',
					},
				],
				internalType: 'struct CrowdBlocks.UserContribution[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'isOrganizer',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'numberOfActiveCampaigns',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'numberOfCampaigns',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'organizers',
		outputs: [
			{
				internalType: 'address',
				name: 'walletAddress',
				type: 'address',
			},
			{
				internalType: 'string',
				name: 'name',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'contact',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'emailId',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'profile',
				type: 'string',
			},
			{
				internalType: 'uint256',
				name: 'phone',
				type: 'uint256',
			},
			{
				internalType: 'bool',
				name: 'isValid',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'users',
		outputs: [
			{
				internalType: 'address',
				name: 'walletAddress',
				type: 'address',
			},
			{
				internalType: 'bool',
				name: 'isValid',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
]
