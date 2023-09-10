// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdBlocks {
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

    mapping(address => Organizer) public organizers;

    event OrganizerCreated(address walletAddress, string name, string emailId);

    function createOrganizer(
        string memory _name,
        string memory _contact,
        string memory _emailId,
        string memory _profile,
        uint _phone
    ) public {
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
}
