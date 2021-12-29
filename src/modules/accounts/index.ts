import { Bytes, log } from '@graphprotocol/graph-ts';
import { Account, OperatorOwner } from '../../../generated/schema'

export namespace accounts {

	export namespace helpers {

		export function getOperatorOwnerId(
			operatorId: string,
			ownerId: string,
		): string {
			return operatorId + "-" + ownerId
		}
	}

	export function getOrCreateAccount(accountAddress: Bytes): Account {
		let accountId = accountAddress.toHex()
		let account = Account.load(accountId)
		if (account == null) {
			account = new Account(accountId)
			account.address = accountAddress
		}
		return account as Account
	}

	export function getOrCreateOperatorOwner(
		operatorId: string,
		ownerId: string,
		approved: boolean
	): OperatorOwner {
		let operatorOwnerId = helpers.getOperatorOwnerId(operatorId, ownerId)
		let operatorOwner = OperatorOwner.load(operatorOwnerId)
		if (operatorOwner == null) {
			operatorOwner = new OperatorOwner(operatorOwnerId)
			operatorOwner.owner = ownerId
			operatorOwner.operator = operatorId
		}
		operatorOwner.approved = approved
		return operatorOwner as OperatorOwner
	}
}