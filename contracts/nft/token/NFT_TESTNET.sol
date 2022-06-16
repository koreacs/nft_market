
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // address contractAddress;
    address contractAddress = 0xC8E5c27Da7e238c114703B46bfd091582Bc26D7f;

    constructor() ERC721("TEST_NFT", "TNFT") {
        // address addr = 0x764d67c50a620771915f71632090e697f4dd8cab;
        // contractAddress = addr;
    }
    event Burned(uint256 nftID);

    function setMarket(address addr) public {
        contractAddress = addr;
    }

    function mintNFT(string memory uri)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, uri);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function mintNFTFor(string memory uri, address owner)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(owner, newItemId);
        _setTokenURI(newItemId, uri);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable, ERC721) returns (bool) {
        return supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721Enumerable, ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function tokensByOwner(address owner) public view returns (string memory) {
        uint256 balance = ERC721.balanceOf(owner);
        string memory _tokens;

        for(uint256 i = 0; i < balance; i++) {
            _tokens = string(abi.encodePacked(_tokens, Strings.toString(super.tokenOfOwnerByIndex(owner, i))));
            
            if((balance - i) != 1)
                _tokens = string(abi.encodePacked(_tokens, ","));
        }
        
        return _tokens;
    }
    
    function transferFromByOwner(address from, address to, uint256 tokenId) public onlyOwner {
        ERC721._transfer(from, to, tokenId);
    }

    //burn nft
    function removeNFT(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);
            
        _burn(_tokenId);
        emit Burned(_tokenId);
    }

   function _mintBatch(
        string[] memory uri,
        uint256[] memory quantity
    ) public {

        for (uint256 i = 0; i < uri.length; i++) {
            for (uint256 j = 0; j < quantity[i]; j++) {
                _tokenIds.increment();
                uint256 newItemId = _tokenIds.current();
                _mint(msg.sender, newItemId);
                _setTokenURI(newItemId, uri[i]);
                setApprovalForAll(contractAddress, true);
            }
        }
    }
}
