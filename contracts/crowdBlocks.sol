// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdBlocks {
    uint public numberOfCampaigns;

    struct Organizer {
        address walletAddress;
        string name;
        string contact;
        string emailId;
        string profile;
        uint phone;
        uint[] campaigns;
        bool isValid;
    }

    struct Contribution {
        address contributor;
        uint contribution;
        uint date;
    }

    struct Campaign {
        address organizer;
        string title;
        string description;
        string[] images;
        uint startDate;
        uint deadline;
        uint targetAmount;
        uint collectedAmount;
        Contribution[] contributions;
        bool isCompleted;
        bool isValid;
    }

    mapping(address => Organizer) public organizers;
    mapping(uint => Campaign) public campaigns;

    // events
    event OrganizerCreated(address walletAddress, string name, string emailId);
    event CampaignCreated(
        uint id,
        string title,
        address organizer,
        uint target
    );

    // modifier
    modifier onlyOrganizer() {
        require(
            organizers[msg.sender].isValid,
            "Only organizer is allowed to create campaign"
        );
        _;
    }

    /**
     * @notice Create a new organizer profile.
     * @dev This function allows a user to create a new organizer profile with the provided information.
     * @param _name The name of the organizer.
     * @param _contact The contact information of the organizer.
     * @param _emailId The email address of the organizer.
     * @param _profile Additional profile information about the organizer.
     * @param _phone The phone number of the organizer.
     * @dev The function ensures that an organizer with the caller's address doesn't already exist.
     * @dev Emits an `OrganizerCreated` event upon successful creation.
     * @param _name The name of the newly created organizer.
     * @param _emailId The email address of the newly created organizer.
     * @dev This function can only be called by the user's Ethereum address.
     * @dev Reverts if an organizer with the caller's address already exists.
     * @param _name The name of the existing organizer with the same address.
     */
    function createOrganizer(
        string memory _name,
        string memory _contact,
        string memory _emailId,
        string memory _profile,
        uint _phone
    ) public {
        require(
            !organizers[msg.sender].isValid,
            "Organizer exists with this address"
        );

        Organizer storage newOrganizer = organizers[msg.sender];

        newOrganizer.walletAddress = msg.sender;
        newOrganizer.name = _name;
        newOrganizer.contact = _contact;
        newOrganizer.emailId = _emailId;
        newOrganizer.profile = _profile;
        newOrganizer.phone = _phone;
        newOrganizer.isValid = true;

        emit OrganizerCreated(msg.sender, _name, _emailId);
    }

    /**
     * @dev Create a new crowdfunding campaign.
     * @param _title The title of the campaign.
     * @param _description The description of the campaign.
     * @param _images An array of image URLs related to the campaign.
     * @param _deadline The deadline (timestamp) for the campaign.
     * @param _target The target amount of funds to be raised.
     *
     * This function allows anyone to create a new crowdfunding campaign by providing
     * the necessary details such as the title, description, images, deadline, and
     * target funding amount. The campaign is created with the sender (creator) as
     * the organizer, and it is marked as valid and added to the list of campaigns.
     *
     * Emits a `CampaignCreated` event upon successful creation.
     */
    function createCampaign(
        string memory _title,
        string memory _description,
        string[] memory _images,
        uint _deadline,
        uint _target
    ) public onlyOrganizer {
        Campaign storage newCampaign = campaigns[++numberOfCampaigns];

        newCampaign.organizer = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.images = _images;
        newCampaign.startDate = block.timestamp;
        newCampaign.deadline = _deadline;
        newCampaign.targetAmount = _target;
        newCampaign.isValid = true;

        emit CampaignCreated(numberOfCampaigns, _title, msg.sender, _target);
    }
}