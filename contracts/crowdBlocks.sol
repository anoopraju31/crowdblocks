// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdBlocks {
    enum campaignType {
        EDUCATION,
        COMMUNAL,
        HEALTHCARE,
        ANIMAL,
        ENVIRONMENT
    }
    uint public numberOfActiveCampaigns;

    struct Organizer {
        address walletAddress;
        string name;
        string contact;
        string emailId;
        string profile;
        uint phone;
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

    // Modifiers
    modifier onlyOrganizer() {
        require(
            organizers[msg.sender].isValid,
            "Only registered organiser is allowed to create campaign!"
        );
        _;
    }

    modifier onlyOnGoingCampaign(uint _id) {
        require(campaigns[_id].isCompleted == false, "Campaign has closed!");
        _;
    }

    // Events
    event OrganizerCreated(address walletAddress, string name, string emailId);
    event CampaignCreated(
        uint id,
        string title,
        address organizer,
        uint target
    );
    event DonatedToCampaign(uint _id, address donor);
    event CampaignComplete(
        uint id,
        address organizer,
        string title,
        uint collectedAmount
    );

    mapping(address => Organizer) private organizers;
    Campaign[] private campaigns;

    function getNumberOfCampaigns() public view returns (uint) {
        return campaigns.length;
    }

    function getNumberOfClosedCampaigns() public view returns (uint) {
        return campaigns.length - numberOfActiveCampaigns;
    }

    function createOrganizer(
        string memory _name,
        string memory _contact,
        string memory _emailId,
        string memory _profile,
        uint _phone
    ) public {
        require(
            !organizers[msg.sender].isValid,
            "Organizer with address already exists!"
        );

        Organizer memory newOrganizer;

        newOrganizer.walletAddress = msg.sender;
        newOrganizer.name = _name;
        newOrganizer.contact = _contact;
        newOrganizer.emailId = _emailId;
        newOrganizer.profile = _profile;
        newOrganizer.phone = _phone;
        newOrganizer.isValid = true;

        organizers[msg.sender] = newOrganizer;

        emit OrganizerCreated(msg.sender, _name, _emailId);
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        string[] memory _images,
        uint _deadline,
        uint _target
    ) public onlyOrganizer {
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future!"
        );

        Campaign memory newCampaign;

        newCampaign.organizer = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.images = _images;
        newCampaign.startDate = block.timestamp;
        newCampaign.deadline = _deadline;
        newCampaign.targetAmount = _target;
        newCampaign.isValid = true;

        campaigns.push(newCampaign);

        emit CampaignCreated(campaigns.length, _title, msg.sender, _target);
    }

    function getCampaignDetails(
        uint _id
    )
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string[] memory,
            uint,
            uint,
            uint,
            bool
        )
    {
        return (
            campaigns[_id].organizer,
            campaigns[_id].title,
            campaigns[_id].description,
            campaigns[_id].images,
            campaigns[_id].deadline,
            campaigns[_id].targetAmount,
            campaigns[_id].collectedAmount,
            campaigns[_id].isCompleted
        );
    }

    function getCampaignContributionsDetails(
        uint _id
    ) public view returns (Contribution[] memory) {
        return campaigns[_id].contributions;
    }

    function getOrganizerDetails(
        address _organizer
    ) public view returns (Organizer memory) {
        return organizers[_organizer];
    }

    function getCollectedAmount(uint _id) public view returns (uint) {
        return campaigns[_id].collectedAmount;
    }

    function donateToCampaign(
        uint _id
    ) public payable onlyOnGoingCampaign(_id) {
        Contribution memory newContribution;

        newContribution.contributor = msg.sender;
        newContribution.contribution = msg.value;
        newContribution.date = block.timestamp;

        (bool sent, ) = payable(address(this)).call{value: msg.value}("");

        if (!sent) {
            campaigns[_id].collectedAmount += msg.value;
            campaigns[_id].contributions.push(newContribution);
            emit DonatedToCampaign(_id, msg.sender);
        }

        if (campaigns[_id].collectedAmount >= campaigns[_id].targetAmount) {
            campaignCompleted(_id);
        }
    }

    function campaignCompleted(uint _id) private onlyOnGoingCampaign(_id) {
        campaigns[_id].isCompleted = true;

        (bool sent, ) = payable(campaigns[_id].organizer).call{
            value: campaigns[_id].collectedAmount
        }("");

        if (sent) {
            numberOfActiveCampaigns--;
        }

        emit CampaignComplete(
            _id,
            campaigns[_id].organizer,
            campaigns[_id].title,
            campaigns[_id].collectedAmount
        );
    }

    function didDeadlineCompleted(uint _id) public onlyOnGoingCampaign(_id) {
        if (campaigns[_id].collectedAmount >= campaigns[_id].targetAmount) {
            campaignCompleted(_id);
        }
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getAllActiveCampaigns() public view returns (uint[] memory) {
        uint[] memory allActiveCampaigns = new uint[](numberOfActiveCampaigns);
        uint idx;

        for (uint i = 0; i < campaigns.length; i++) {
            if (campaigns[i].isCompleted == false) {
                allActiveCampaigns[idx++] = i;
            }
        }

        return allActiveCampaigns;
    }

    function getAllCompletedCampaigns() public view returns (uint[] memory) {
        uint[] memory allCompletedCampaigns = new uint[](
            campaigns.length - numberOfActiveCampaigns
        );
        uint idx;

        for (uint i = 0; i < campaigns.length; i++) {
            if (campaigns[i].isCompleted) {
                allCompletedCampaigns[idx++] = i;
            }
        }

        return allCompletedCampaigns;
    }
}
