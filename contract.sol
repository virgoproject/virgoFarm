pragma solidity 0.5.16;

interface IBEP20 {
    /**
     * @dev Returns the amount of tokens in existence.
   */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the token decimals.
   */
    function decimals() external view returns (uint8);

    /**
     * @dev Returns the token symbol.
   */
    function symbol() external view returns (string memory);

    /**
    * @dev Returns the token name.
  */
    function name() external view returns (string memory);

    /**
     * @dev Returns the bep token owner.
   */
    function getOwner() external view returns (address);

    /**
     * @dev Returns the amount of tokens owned by `account`.
   */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
   * allowed to spend on behalf of `owner` through {transferFrom}. This is
   * zero by default.
   *
   * This value changes when {approve} or {transferFrom} are called.
   */
    function allowance(address _owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * IMPORTANT: Beware that changing an allowance with this method brings the risk
   * that someone may use both the old and the new allowance by unfortunate
   * transaction ordering. One possible solution to mitigate this race
   * condition is to first reduce the spender's allowance to 0 and set the
   * desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   *
   * Emits an {Approval} event.
   */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
   * allowance mechanism. `amount` is then deducted from the caller's
   * allowance.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
   * another (`to`).
   *
   * Note that `value` may be zero.
   */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
   * a call to {approve}. `value` is the new allowance.
   */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
   * overflow.
   *
   * Counterpart to Solidity's `+` operator.
   *
   * Requirements:
   * - Addition cannot overflow.
   */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
   * overflow (when the result is negative).
   *
   * Counterpart to Solidity's `-` operator.
   *
   * Requirements:
   * - Subtraction cannot overflow.
   */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
   * overflow (when the result is negative).
   *
   * Counterpart to Solidity's `-` operator.
   *
   * Requirements:
   * - Subtraction cannot overflow.
   */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
   * overflow.
   *
   * Counterpart to Solidity's `*` operator.
   *
   * Requirements:
   * - Multiplication cannot overflow.
   */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
   * division by zero. The result is rounded towards zero.
   *
   * Counterpart to Solidity's `/` operator. Note: this function uses a
   * `revert` opcode (which leaves remaining gas untouched) while Solidity
   * uses an invalid opcode to revert (consuming all remaining gas).
   *
   * Requirements:
   * - The divisor cannot be zero.
   */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
   * division by zero. The result is rounded towards zero.
   *
   * Counterpart to Solidity's `/` operator. Note: this function uses a
   * `revert` opcode (which leaves remaining gas untouched) while Solidity
   * uses an invalid opcode to revert (consuming all remaining gas).
   *
   * Requirements:
   * - The divisor cannot be zero.
   */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
   * Reverts when dividing by zero.
   *
   * Counterpart to Solidity's `%` operator. This function uses a `revert`
   * opcode (which leaves remaining gas untouched) while Solidity uses an
   * invalid opcode to revert (consuming all remaining gas).
   *
   * Requirements:
   * - The divisor cannot be zero.
   */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
   * Reverts with custom message when dividing by zero.
   *
   * Counterpart to Solidity's `%` operator. This function uses a `revert`
   * opcode (which leaves remaining gas untouched) while Solidity uses an
   * invalid opcode to revert (consuming all remaining gas).
   *
   * Requirements:
   * - The divisor cannot be zero.
   */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
contract Context {
    // Empty internal constructor, to prevent people from mistakenly deploying
    // an instance of this contract, which should be used via inheritance.
    constructor () internal { }

    function _msgSender() internal view returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
   */
    constructor () internal {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
   */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
   */
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
   * `onlyOwner` functions anymore. Can only be called by the current owner.
   *
   * NOTE: Renouncing ownership will leave the contract without an owner,
   * thereby removing any functionality that is only available to the owner.
   */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
   * Can only be called by the current owner.
   */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
   */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

/**
 * Virgo's stacking contract
 * Permit users to lock their VGO, making them earn 0.5% interest each week
 * Tokens are locked for a month, after this period they can be withdrawn at any time
 */
contract VirgoFarm is Context, Ownable {
    using SafeMath for uint256;

    struct Stack {
        uint256 amount;
        uint256 effectiveAmount;
        uint256 unlockTime;
        uint256 lockDuration;
        uint256 earnings;
        uint256 totalEarnings;
    }

    Stack[] private _stacks;
    mapping (address => uint256[]) _stackersStacks;

    IBEP20 constant _token = IBEP20(0xFb526228ff1C019E4604C7e7988C097D96bD5b70);

    uint256 private _toDistribute = 0;
    uint256 private _distributed = 0;
    uint256 private _lastDistribution = 0;

    uint256 private _toDistributeThisRound = 0;
    uint256 private _currentIteration = 0;

    uint256 private _effectiveLock = 0;
    uint256 private _lockedAmount = 0;

    uint256 constant _perThousand = 1000;
    uint256 constant _tenThousand = 10000;
    uint256 constant _baseWeeklyRate = 1; //per 1000
    uint256 constant _weeklyAdditionalRate = 485; //per 10000
    uint256 constant _maxPerInterval = 4331500000000;
    uint256 constant _minLockAmount = 10000000000;
    uint256 constant _distributionInterval = 120;

    constructor() public {}

    /**
     * Returns how much tokens the contract has at its disposal for distribution
     */
    function getToDistribute() external view returns (uint256) {
        return _toDistribute;
    }

    /**
     * Returns how much tokens the contract has to distribute this round
     */
    function getToDistributeThisRound() external view returns (uint256) {
        return _toDistributeThisRound;
    }

    /**
     * Returns how much tokens has been distributed since contract's start
     */
    function getDistributed() external view returns (uint256) {
        return _distributed;
    }

    /**
     * Returns last distribution's block height
     */
    function getLastDistribution() external view returns (uint256) {
        return _lastDistribution;
    }

    function getTotalLocked() external view returns (uint256) {
        return _lockedAmount;
    }

    function getLocksCount(address account) external view returns (uint256) {
        return _stackersStacks[account].length;
    }

    function getLock(address account, uint256 index) external view returns (uint256, uint256, uint256, uint256, uint256, uint256) {
        require(_stackersStacks[account].length > index, "index out of range");

        Stack memory stack = _stacks[_stackersStacks[account][index]];

        return (stack.amount, stack.effectiveAmount, stack.unlockTime, stack.lockDuration, stack.earnings, stack.totalEarnings);
    }

    /**
    * Add tokens to contract's distribution funds
    */
    function addFunds(uint256 amount) external returns (bool) {
        require(amount > 0, "you must send tokens");
        uint256 allowance = _token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Please allow token before adding funds");

        _token.transferFrom(msg.sender, address(this), amount);
        _toDistribute = _toDistribute.add(amount);

        return true;
    }

    function lock(uint256 amount, uint256 lockDuration) external returns (bool) {
        return _lock(msg.sender, amount, lockDuration);
    }

    function lockFor(address account, uint256 amount, uint256 lockDuration) onlyOwner external returns (bool){
        return _lock(account, amount, lockDuration);
    }

    /**
     * Lock specified amount into the contract, transfering tokens from sender to contract and increasing sender's locked balance
     * If locked balance was 0 then add sender to stackers array, which we will iterate through during distribution
     *
     * Require that:
     * No distribution is occuring (toDistributeThisRound == 0)
     * Amount to lock is superior or equal to minimal lock amount
     * Sender's allowance is sufficient
     * Sender's balance is sufficient (or will revert on _token.transferFrom)
     */
    function _lock(address account, uint256 amount, uint256 lockDuration) internal returns (bool) {
        require(_toDistributeThisRound == 0, "A distribution is occuring! Please try again in a few minutes.");
        require(amount >= _minLockAmount, "Lock amount must be greater or equal to minimal lock amount");
        require(lockDuration >= 1 && lockDuration <= 104, "lockTime not in range");
        uint256 allowance = _token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Please allow token before locking");

        _token.transferFrom(msg.sender, address(this), amount);

        uint256 effectiveAmount = amount.mul(_tenThousand.add(_weeklyAdditionalRate.mul(lockDuration.sub(1)))).div(_tenThousand);

        Stack memory stack = Stack(amount, effectiveAmount, block.timestamp.add(lockDuration.mul(604800)), lockDuration, 0, 0);

        _stacks.push(stack);
        _stackersStacks[account].push(_stacks.length-1);

        _lockedAmount = _lockedAmount.add(stack.amount);
        _effectiveLock = _effectiveLock.add(stack.effectiveAmount);

        return true;
    }

    function retrieveEarnings(uint256 index) external returns (bool) {
        require(index < _stackersStacks[msg.sender].length, "index out of range");

        Stack storage stack = _stacks[_stackersStacks[msg.sender][index]];

        require(stack.earnings > 0, "no earnings to retrieve");
        _token.transfer(msg.sender, stack.earnings);
        stack.earnings = 0;

        return true;
    }

    function unlock(uint256 index) external returns (bool) {
        require(_toDistributeThisRound == 0, "A distribution is occuring! Please try again in a few minutes.");
        require(index < _stackersStacks[msg.sender].length, "index out of range");

        Stack storage stack = _stacks[_stackersStacks[msg.sender][index]];

        require(stack.unlockTime < block.timestamp, "Lock not expired yet");

        _token.transfer(msg.sender, stack.earnings.add(stack.amount));

        _lockedAmount = _lockedAmount.sub(stack.amount);
        _effectiveLock = _effectiveLock.sub(stack.effectiveAmount);

        _stacks[_stackersStacks[msg.sender][index]] = _stacks[_stacks.length-1];
        _stacks.pop();
        _stackersStacks[msg.sender][index] = _stackersStacks[msg.sender][_stackersStacks[msg.sender].length-1];
        _stackersStacks[msg.sender].pop();

        return true;
    }

    /**
     * Init a new distribution round, calculating how much to give this round, setting lastDistribution to current block height and
     * reseting currentIteration
     *
     * Require that:
     * enough blocks elasped since last distribution
     * No distribution is already ongoing
     */
    function initDistribution() external returns (bool) {
        require(_lastDistribution.add(_distributionInterval) <= block.timestamp, "latest distribution is too recent");
        require(_toDistributeThisRound == 0, "current round not fully distributed");

        _toDistributeThisRound = _effectiveLock.div(_perThousand.div(_baseWeeklyRate));
        if(_toDistributeThisRound > _maxPerInterval)
            _toDistributeThisRound = _maxPerInterval;

        _currentIteration = 0;

        _lastDistribution = block.timestamp;

        return true;
    }

    /**
     * distribute rewards for up to maxIterations stackers
     * If end of stackers is not reached, next call to this function will start at the index it previously stopped
     * If end of stackers is reached, end current distribution round
     * This permit us to distribute rewards over several contract calls, preventing gas outage
     *
     * Require that:
     * A distribution is ongoing
     */
    function distribute(uint256 maxIterations) external returns (bool) {
        require(_toDistributeThisRound > 0, "no active round");
        if(_currentIteration.add(maxIterations) > _stacks.length)
            maxIterations = _stacks.length.sub(_currentIteration);

        for(uint i = 0; i < maxIterations; i++){
            Stack storage stack = _stacks[_currentIteration+i];
            uint256 toDistrib = stack.effectiveAmount.mul(_toDistributeThisRound).div(_effectiveLock);
            stack.earnings = stack.earnings.add(toDistrib);
            stack.totalEarnings = stack.totalEarnings.add(toDistrib);
        }

        if(_currentIteration.add(maxIterations) == _stacks.length){
            _toDistribute = _toDistribute.sub(_toDistributeThisRound);
            _distributed = _distributed.add(_toDistributeThisRound);
            _toDistributeThisRound = 0;
        }

        _currentIteration = _currentIteration.add(maxIterations);

        return true;
    }
}
