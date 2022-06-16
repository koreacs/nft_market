// // SPDX-License-Identifier: ISC

// pragma solidity ^0.8.4;

// import "./interfaces/IBEP20.sol";
// import "../utils/Context.sol";

// contract ZNFTShares is IBEP20, Context {
//     mapping(address => uint256) private balances;

//     mapping(address => mapping(address => uint256)) private allowances;

//     address private _governor;

//     uint256 private _totalSupply;

//     string private _name;
//     string private _symbol;

//     /**
//      * @dev checks whether `caller` is governor;
//      */
//     modifier onlyGovernor() {
//         require(_msgSender() == _governor, "ERC20: caller not governor");
//         _;
//     }

//     /**
//      * @dev sets the {name} and {symbol} of the token.
//      *
//      * All the two variables are immutable and cannot be changed
//      * and set only in the constructor.
//      */
//     constructor(string memory name_, string memory symbol_) {
//         _name = name_;
//         _symbol = symbol_;
//         _governor = _msgSender();
//     }

//     /**
//      * @dev returns the name of the token.
//      */
//     function name() public view virtual override returns (string memory) {
//         return _name;
//     }

//     /**
//      * @dev returns the symbol of the token.
//      */
//     function symbol() public view virtual override returns (string memory) {
//         return _symbol;
//     }

//     /**
//      * @dev returns the decimals of the token
//      */
//     function decimals() public view virtual override returns (uint8) {
//         return 18;
//     }

//     /**
//      * @dev returns the total supply of the token
//      */
//     function totalSupply() public view virtual override returns (uint256) {
//         return _totalSupply;
//     }

//     /**
//      * @dev returns the number of tokens owned by `account`
//      */
//     function balanceOf(address account)
//         public
//         view
//         virtual
//         override
//         returns (uint256)
//     {
//         return balances[account];
//     }

//     /**
//      * @dev returns the amount the `spender` can spend on behalf of the `owner`.
//      */
//     function allowance(address owner, address spender)
//         public
//         view
//         virtual
//         override
//         returns (uint256)
//     {
//         return allowances[owner][spender];
//     }

//     /**
//      * @dev Approve a `spender` to spend tokens on behalf of the `owner`.
//      */
//     function approve(address spender, uint256 value)
//         public
//         virtual
//         override
//         returns (bool)
//     {
//         _approve(_msgSender(), spender, value);
//         return true;
//     }

//     /**
//      * @dev to increase the allowance of `spender` over the `owner` account.
//      *
//      * Requirements
//      * `spender` cannot be zero address
//      */
//     function increaseAllowance(address spender, uint256 addedValue)
//         public
//         virtual
//         returns (bool)
//     {
//         _approve(
//             _msgSender(),
//             spender,
//             allowances[_msgSender()][spender] + addedValue
//         );
//         return true;
//     }

//     /**
//      * @dev to decrease the allowance of `spender` over the `owner` account.
//      *
//      * Requirements
//      * `spender` allowance shoule be greater than the `reducedValue`
//      * `spender` cannot be a zero address
//      */
//     function decreaseAllowance(address spender, uint256 reducedValue)
//         public
//         virtual
//         returns (bool)
//     {
//         uint256 currentAllowance = allowances[_msgSender()][spender];
//         require(
//             currentAllowance >= reducedValue,
//             "ERC20: ReducedValue greater than allowance"
//         );

//         _approve(_msgSender(), spender, currentAllowance - reducedValue);
//         return true;
//     }

//     /**
//      * @dev sets the amount as the allowance of `spender` over the `owner` address
//      *
//      * Requirements:
//      * `owner` cannot be zero address
//      * `spender` cannot be zero address
//      */
//     function _approve(
//         address owner,
//         address spender,
//         uint256 amount
//     ) internal virtual {
//         require(owner != address(0), "ERC20: approve from zero address");
//         require(spender != address(0), "ERC20: approve to zero address");

//         allowances[owner][spender] = amount;
//         emit Approval(owner, spender, amount);
//     }

//     /**
//      * @dev transfers the `amount` of tokens to `recipient`
//      */
//     function transfer(address recipient, uint256 amount)
//         public
//         virtual
//         override
//         returns (bool)
//     {
//         _transfer(_msgSender(), recipient, amount);
//         return true;
//     }

//     /**
//      * @dev transfers the 'amount` from the `sender` to the `recipient`
//      * on behalf of the `sender`.
//      *
//      * Requirements
//      * `sender` and `recipient` should be non zero addresses
//      * `sender` should have balance of more than `amount`
//      * `caller` must have allowance greater than `amount`
//      */
//     function transferFrom(
//         address sender,
//         address recipient,
//         uint256 amount
//     ) public virtual override returns (bool) {
//         _transfer(sender, recipient, amount);

//         uint256 currentAllowance = allowances[sender][_msgSender()];
//         require(currentAllowance >= amount, "ERC20: amount exceeds allowance");
//         _approve(sender, _msgSender(), currentAllowance - amount);

//         return true;
//     }

//     /**
//      * @dev mints the amount of tokens to the `recipient` wallet.
//      *
//      * Requirements :
//      *
//      * The caller must be the `governor` of the contract.
//      * Governor can be an DAO smart contract.
//      */
//     function mint(address recipient, uint256 amount)
//         public
//         virtual
//         onlyGovernor
//         returns (bool)
//     {
//         require(recipient != address(0), "ERC20: mint to a zero address");

//         _beforeTokenTransfer(address(0), recipient, amount);

//         _totalSupply += amount;
//         balances[recipient] += amount;

//         emit Transfer(address(0), recipient, amount);
//         return true;
//     }

//     /**
//      * @dev burns the `amount` tokens from `supply`.
//      *
//      * Requirements
//      * `caller` address balance should be greater than `amount`
//      */
//     function burn(uint256 amount) public virtual onlyGovernor returns (bool) {
//         uint256 currentBalance = balances[_msgSender()];
//         require(
//             currentBalance >= amount,
//             "ERC20: burning amount exceeds balance"
//         );

//         _beforeTokenTransfer(_msgSender(), address(0), amount);

//         balances[_msgSender()] = currentBalance - amount;
//         _totalSupply -= amount;

//         return true;
//     }

//     /**
//      * @dev transfers the `amount` of tokens from `sender` to `recipient`.
//      *
//      * Requirements:
//      * `sender` is not a zero address
//      * `recipient` is also not a zero address
//      * `amount` is less than or equal to balance of the sender.
//      */
//     function _transfer(
//         address sender,
//         address recipient,
//         uint256 amount
//     ) internal virtual {
//         require(sender != address(0), "ERC20: transfer from zero address");
//         require(recipient != address(0), "ERC20: transfer to zero address");

//         _beforeTokenTransfer(sender, recipient, amount);

//         uint256 senderBalance = balances[sender];
//         require(
//             senderBalance >= amount,
//             "ERC20: transfer amount exceeds balance"
//         );

//         balances[sender] = senderBalance - amount;
//         balances[recipient] += amount;

//         emit Transfer(sender, recipient, amount);
//     }

//     /**
//      * @dev returns the current `governor` address.
//      *
//      * `governors` can mint / burn znft shares
//      */
//     function governor() public view virtual returns (address) {
//         return _governor;
//     }

//     /**
//      * @dev transfers the governance of the contract.
//      *
//      * Requirements :
//      * `caller` should be the current governor.
//      * `newGovernor` cannot be a zero address.
//      */
//     function transferGovernance(address newGovernor)
//         public
//         virtual
//         onlyGovernor
//         returns (bool)
//     {
//         require(newGovernor != address(0), "ERC20: zero address cannot govern");

//         _governor = newGovernor;
//         return true;
//     }

//     /**
//      * Hook to Check transactions before initiated.
//      * here we don't have any special business logic.
//      * So Left Empty.
//      */
//     function _beforeTokenTransfer(
//         address from,
//         address to,
//         uint256 amount
//     ) internal virtual {}
// }
