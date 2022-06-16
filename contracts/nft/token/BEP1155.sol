// // SPDX-License-Identifier: ISC

// pragma solidity ^0.8.4;

// import "./interfaces/IBEP1155.sol";
// import "./interfaces/IBEP1155Metadata.sol";
// import "./interfaces/IBEP1155Receiver.sol";
// import "../dao/interfaces/IDAO.sol";
// import "../utils/Address.sol";
// import "../utils/Context.sol";
// import "../utils/BEP165.sol";

// /**
//  * @dev Implementation of the basic standard multi-token.
//  *
//  */
// contract BEP1155 is Context, BEP165, IBEP1155, IBEP1155MetadataURI {
//     using Address for address;

//     // Address of DAO to validate minting.
//     address public dao;

//     // Mapping from token ID to account balances
//     mapping(uint256 => mapping(address => uint256)) private _balances;

//     // Mapping from account to operator approvals
//     mapping(address => mapping(address => bool)) private _operatorApprovals;

//     // Mapping the supply of tokens
//     mapping(uint256 => uint256) private _totalSupply;

//     // Used as the URI for all token types by relying on ID substitution, e.g. https://token-cdn-domain/{id}.json
//     string private _uri;

//     /**
//      * @dev See {_setURI}.
//      */
//     constructor(string memory uri_, address _dao) {
//         _setURI(uri_);
//         dao = _dao;
//     }

//     /**
//      * @dev See {IBEP165-supportsInterface}.
//      */
//     function supportsInterface(bytes4 interfaceId)
//         public
//         view
//         virtual
//         override(BEP165, IBEP165)
//         returns (bool)
//     {
//         return
//             interfaceId == type(IBEP1155).interfaceId ||
//             interfaceId == type(IBEP1155MetadataURI).interfaceId ||
//             super.supportsInterface(interfaceId);
//     }

//     /**
//      * @dev See {IBEP1155MetadataURI-uri}.
//      *
//      * This implementation returns the same URI for *all* token types. It relies
//      * on the token type ID substitution mechanism
//      *
//      * Clients calling this function must replace the `\{id\}` substring with the
//      * actual token type ID.
//      */
//     function uri(uint256) public view virtual override returns (string memory) {
//         return _uri;
//     }

//     /**
//      * @dev Total amount of tokens in with a given id.
//      */
//     function totalSupply(uint256 id) public view virtual returns (uint256) {
//         return _totalSupply[id];
//     }

//     function exists(uint256 id) public view virtual returns (bool) {
//         return totalSupply(id) > 0;
//     }

//     /**
//      * @dev See {IBEP1155-balanceOf}.
//      *
//      * Requirements:
//      *
//      * - `account` cannot be the zero address.
//      */
//     function balanceOf(address account, uint256 id)
//         public
//         view
//         virtual
//         override
//         returns (uint256)
//     {
//         require(
//             account != address(0),
//             "BEP1155: balance query for the zero address"
//         );
//         return _balances[id][account];
//     }

//     /**
//      * @dev See {IBEP1155-balanceOfBatch}.
//      *
//      * Requirements:
//      *
//      * - `accounts` and `ids` must have the same length.
//      */
//     function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
//         public
//         view
//         virtual
//         override
//         returns (uint256[] memory)
//     {
//         require(
//             accounts.length == ids.length,
//             "BEP1155: accounts and ids length mismatch"
//         );

//         uint256[] memory batchBalances = new uint256[](accounts.length);

//         for (uint256 i = 0; i < accounts.length; ++i) {
//             batchBalances[i] = balanceOf(accounts[i], ids[i]);
//         }

//         return batchBalances;
//     }

//     /**
//      * @dev See {IBEP1155-setApprovalForAll}.
//      */
//     function setApprovalForAll(address operator, bool approved)
//         public
//         virtual
//         override
//     {
//         require(
//             _msgSender() != operator,
//             "BEP1155: setting approval status for self"
//         );

//         _operatorApprovals[_msgSender()][operator] = approved;
//         emit ApprovalForAll(_msgSender(), operator, approved);
//     }

//     /**
//      * @dev See {IBEP1155-isApprovedForAll}.
//      */
//     function isApprovedForAll(address account, address operator)
//         public
//         view
//         virtual
//         override
//         returns (bool)
//     {
//         return _operatorApprovals[account][operator];
//     }

//     /**
//      * @dev See {IBEP1155-safeTransferFrom}.
//      */
//     function safeTransferFrom(
//         address from,
//         address to,
//         uint256 id,
//         uint256 amount,
//         bytes memory data
//     ) public virtual override {
//         require(
//             from == _msgSender() || isApprovedForAll(from, _msgSender()),
//             "BEP1155: caller is not owner nor approved"
//         );
//         _safeTransferFrom(from, to, id, amount, data);
//     }

//     /**
//      * @dev See {IBEP1155-safeBatchTransferFrom}.
//      */
//     function safeBatchTransferFrom(
//         address from,
//         address to,
//         uint256[] memory ids,
//         uint256[] memory amounts,
//         bytes memory data
//     ) public virtual override {
//         require(
//             from == _msgSender() || isApprovedForAll(from, _msgSender()),
//             "BEP1155: transfer caller is not owner nor approved"
//         );
//         _safeBatchTransferFrom(from, to, ids, amounts, data);
//     }

//     /**
//      * @dev mints `tokenId` and `amount` of tokens to the owner.
//      *
//      * `owner` should've to be passed on while minting.
//      */
//     function mint(
//         address _owner,
//         uint256 _tokenId,
//         uint256 _amount
//     ) public virtual {
//         require(
//             IDAO(dao).isMerchant(_owner),
//             "DAO: minter should be valid merchant"
//         );
//         require(!exists(_tokenId), "BEP1155: tokenId exits");
//         _mint(_owner, _tokenId, _amount, "0x00");
//     }

//     /**
//      * @dev Transfers `amount` tokens of token type `id` from `from` to `to`.
//      *
//      * Emits a {TransferSingle} event.
//      *
//      * Requirements:
//      *
//      * - `to` cannot be the zero address.
//      * - `from` must have a balance of tokens of type `id` of at least `amount`.
//      * - If `to` refers to a smart contract, it must implement {IBEP1155Receiver-onBEP1155Received} and return the
//      * acceptance magic value.
//      */
//     function _safeTransferFrom(
//         address from,
//         address to,
//         uint256 id,
//         uint256 amount,
//         bytes memory data
//     ) internal virtual {
//         require(to != address(0), "BEP1155: transfer to the zero address");

//         address operator = _msgSender();

//         _beforeTokenTransfer(
//             operator,
//             from,
//             to,
//             _asSingletonArray(id),
//             _asSingletonArray(amount),
//             data
//         );

//         uint256 fromBalance = _balances[id][from];
//         require(
//             fromBalance >= amount,
//             "BEP1155: insufficient balance for transfer"
//         );
//         _balances[id][from] = fromBalance - amount;
//         _balances[id][to] += amount;

//         emit TransferSingle(operator, from, to, id, amount);

//         _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
//     }

//     /**
//      * @dev xref:ROOT:BEP1155.adoc#batch-operations[Batched] version of {_safeTransferFrom}.
//      *
//      * Emits a {TransferBatch} event.
//      *
//      * Requirements:
//      *
//      * - If `to` refers to a smart contract, it must implement {IBEP1155Receiver-onBEP1155BatchReceived} and return the
//      * acceptance magic value.
//      */
//     function _safeBatchTransferFrom(
//         address from,
//         address to,
//         uint256[] memory ids,
//         uint256[] memory amounts,
//         bytes memory data
//     ) internal virtual {
//         require(
//             ids.length == amounts.length,
//             "BEP1155: ids and amounts length mismatch"
//         );
//         require(to != address(0), "BEP1155: transfer to the zero address");

//         address operator = _msgSender();

//         _beforeTokenTransfer(operator, from, to, ids, amounts, data);

//         for (uint256 i = 0; i < ids.length; ++i) {
//             uint256 id = ids[i];
//             uint256 amount = amounts[i];

//             uint256 fromBalance = _balances[id][from];
//             require(
//                 fromBalance >= amount,
//                 "BEP1155: insufficient balance for transfer"
//             );
//             _balances[id][from] = fromBalance - amount;
//             _balances[id][to] += amount;
//         }

//         emit TransferBatch(operator, from, to, ids, amounts);

//         _doSafeBatchTransferAcceptanceCheck(
//             operator,
//             from,
//             to,
//             ids,
//             amounts,
//             data
//         );
//     }

//     /**
//      * @dev Sets a new URI for all token types, by relying on the token type ID
//      * substitution mechanism
//      *
//      * By this mechanism, any occurrence of the `\{id\}` substring in either the
//      * URI or any of the amounts in the JSON file at said URI will be replaced by
//      * clients with the token type ID.
//      *
//      * For example, the `https://token-cdn-domain/\{id\}.json` URI would be
//      * interpreted by clients as
//      * `https://token-cdn-domain/000000000000000000000000000000000000000000000000000000000004cce0.json`
//      * for token type ID 0x4cce0.
//      *
//      * See {uri}.
//      *
//      * Because these URIs cannot be meaningfully represented by the {URI} event,
//      * this function emits no events.
//      */
//     function _setURI(string memory newuri) internal virtual {
//         _uri = newuri;
//     }

//     /**
//      * @dev Creates `amount` tokens of token type `id`, and assigns them to `account`.
//      *
//      * Emits a {TransferSingle} event.
//      *
//      * Requirements:
//      *
//      * - `account` cannot be the zero address.
//      * - If `account` refers to a smart contract, it must implement {IBEP1155Receiver-onBEP1155Received} and return the
//      * acceptance magic value.
//      */
//     function _mint(
//         address account,
//         uint256 id,
//         uint256 amount,
//         bytes memory data
//     ) internal virtual {
//         require(account != address(0), "BEP1155: mint to the zero address");

//         address operator = _msgSender();

//         _beforeTokenTransfer(
//             operator,
//             address(0),
//             account,
//             _asSingletonArray(id),
//             _asSingletonArray(amount),
//             data
//         );

//         _balances[id][account] += amount;
//         _totalSupply[id] += amount;

//         emit TransferSingle(operator, address(0), account, id, amount);
//         _doSafeTransferAcceptanceCheck(
//             operator,
//             address(0),
//             account,
//             id,
//             amount,
//             data
//         );
//     }

//     /**
//      * @dev xref:ROOT:BEP1155.adoc#batch-operations[Batched] version of {_mint}.
//      *
//      * Requirements:
//      *
//      * - `ids` and `amounts` must have the same length.
//      * - If `to` refers to a smart contract, it must implement {IBEP1155Receiver-onBEP1155BatchReceived} and return the
//      * acceptance magic value.
//      */
//     function _mintBatch(
//         address to,
//         uint256[] memory ids,
//         uint256[] memory amounts,
//         bytes memory data
//     ) internal virtual {
//         require(to != address(0), "BEP1155: mint to the zero address");
//         require(
//             ids.length == amounts.length,
//             "BEP1155: ids and amounts length mismatch"
//         );

//         address operator = _msgSender();

//         _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);

//         for (uint256 i = 0; i < ids.length; i++) {
//             _balances[ids[i]][to] += amounts[i];
//             _totalSupply[ids[i]] += amounts[i];
//         }

//         emit TransferBatch(operator, address(0), to, ids, amounts);

//         _doSafeBatchTransferAcceptanceCheck(
//             operator,
//             address(0),
//             to,
//             ids,
//             amounts,
//             data
//         );
//     }

//     /**
//      * @dev Destroys `amount` tokens of token type `id` from `account`
//      *
//      * Requirements:
//      *
//      * - `account` cannot be the zero address.
//      * - `account` must have at least `amount` tokens of token type `id`.
//      */
//     function _burn(
//         address account,
//         uint256 id,
//         uint256 amount
//     ) internal virtual {
//         require(account != address(0), "BEP1155: burn from the zero address");

//         address operator = _msgSender();

//         _beforeTokenTransfer(
//             operator,
//             account,
//             address(0),
//             _asSingletonArray(id),
//             _asSingletonArray(amount),
//             ""
//         );

//         uint256 accountBalance = _balances[id][account];
//         require(
//             accountBalance >= amount,
//             "BEP1155: burn amount exceeds balance"
//         );

//         _balances[id][account] = accountBalance - amount;
//         _totalSupply[id] -= amount;
//         emit TransferSingle(operator, account, address(0), id, amount);
//     }

//     /**
//      * @dev xref:ROOT:BEP1155.adoc#batch-operations[Batched] version of {_burn}.
//      *
//      * Requirements:
//      *
//      * - `ids` and `amounts` must have the same length.
//      */
//     function _burnBatch(
//         address account,
//         uint256[] memory ids,
//         uint256[] memory amounts
//     ) internal virtual {
//         require(account != address(0), "BEP1155: burn from the zero address");
//         require(
//             ids.length == amounts.length,
//             "BEP1155: ids and amounts length mismatch"
//         );

//         address operator = _msgSender();

//         _beforeTokenTransfer(operator, account, address(0), ids, amounts, "");

//         for (uint256 i = 0; i < ids.length; i++) {
//             uint256 id = ids[i];
//             uint256 amount = amounts[i];

//             uint256 accountBalance = _balances[id][account];
//             require(
//                 accountBalance >= amount,
//                 "BEP1155: burn amount exceeds balance"
//             );
//             _balances[id][account] = accountBalance - amount;
//             _totalSupply[ids[i]] -= amounts[i];
//         }

//         emit TransferBatch(operator, account, address(0), ids, amounts);
//     }

//     /**
//      * @dev Hook that is called before any token transfer. This includes minting
//      * and burning, as well as batched variants.
//      *
//      * The same hook is called on both single and batched variants. For single
//      * transfers, the length of the `id` and `amount` arrays will be 1.
//      *
//      * Calling conditions (for each `id` and `amount` pair):
//      *
//      * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
//      * of token type `id` will be  transferred to `to`.
//      * - When `from` is zero, `amount` tokens of token type `id` will be minted
//      * for `to`.
//      * - when `to` is zero, `amount` of ``from``'s tokens of token type `id`
//      * will be burned.
//      * - `from` and `to` are never both zero.
//      * - `ids` and `amounts` have the same, non-zero length.
//      *
//      * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
//      */
//     function _beforeTokenTransfer(
//         address operator,
//         address from,
//         address to,
//         uint256[] memory ids,
//         uint256[] memory amounts,
//         bytes memory data
//     ) internal virtual {}

//     function _doSafeTransferAcceptanceCheck(
//         address operator,
//         address from,
//         address to,
//         uint256 id,
//         uint256 amount,
//         bytes memory data
//     ) private {
//         if (to.isContract()) {
//             try
//                 IBEP1155Receiver(to).onBEP1155Received(
//                     operator,
//                     from,
//                     id,
//                     amount,
//                     data
//                 )
//             returns (bytes4 response) {
//                 if (
//                     response != IBEP1155Receiver(to).onBEP1155Received.selector
//                 ) {
//                     revert("BEP1155: BEP1155Receiver rejected tokens");
//                 }
//             } catch Error(string memory reason) {
//                 revert(reason);
//             } catch {
//                 revert("BEP1155: transfer to non BEP1155Receiver implementer");
//             }
//         }
//     }

//     function _doSafeBatchTransferAcceptanceCheck(
//         address operator,
//         address from,
//         address to,
//         uint256[] memory ids,
//         uint256[] memory amounts,
//         bytes memory data
//     ) private {
//         if (to.isContract()) {
//             try
//                 IBEP1155Receiver(to).onBEP1155BatchReceived(
//                     operator,
//                     from,
//                     ids,
//                     amounts,
//                     data
//                 )
//             returns (bytes4 response) {
//                 if (
//                     response !=
//                     IBEP1155Receiver(to).onBEP1155BatchReceived.selector
//                 ) {
//                     revert("BEP1155: BEP1155Receiver rejected tokens");
//                 }
//             } catch Error(string memory reason) {
//                 revert(reason);
//             } catch {
//                 revert("BEP1155: transfer to non BEP1155Receiver implementer");
//             }
//         }
//     }

//     function _asSingletonArray(uint256 element)
//         private
//         pure
//         returns (uint256[] memory)
//     {
//         uint256[] memory array = new uint256[](1);
//         array[0] = element;

//         return array;
//     }
// }
