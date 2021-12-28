import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit"
import { Approval, ApprovalForAll, Erc721Transaction } from "../../../generated/schema"

export namespace events {

	export namespace helpers {
		export function getNewEventId(
			sourceContractAddress: string, from: string, to: string, timestamp: string
		): string {
			return sourceContractAddress + "-" + from + "-" + to + "-" + timestamp
		}
	}

	export namespace operators {
		export function getOrCreateApprovalForAll(
			operator: string, owner: string, timestamp: string,
			operatorOwner: string, transaction: string, block: string,
			sourceContractAddress: string
		): ApprovalForAll {
			let id = helpers.getNewEventId(sourceContractAddress, operator, owner, timestamp)
			let entity = ApprovalForAll.load(id)
			if (entity == null) {
				entity = new ApprovalForAll(id)
				entity.operatorOwner = operatorOwner
				entity.transaction = transaction
				entity.block = block
			}
			return entity as ApprovalForAll
		}
	}

	export namespace approvals {

		export function getOrCreateApproval(
			approved: string, owner: string, timestamp: string,
			token: string, transaction: string, block: string,
			sourceContractAddress: string
		): Approval {
			let id = helpers.getNewEventId(sourceContractAddress, approved, owner, timestamp)
			let entity = Approval.load(id)
			if (entity == null) {
				entity = new Approval(id)
				entity.token = token
				entity.transaction = transaction
				entity.block = block
			}
			return entity as Approval
		}
	}

	export namespace transactions {

		namespace constants {
			export let TRANSACTION_MINT = "MINT"
			export let TRANSACTION_BURN = "BURN"
			export let TRANSACTION_TRANSFER = "TRANSFER"
		}


		export function getNewMint(
			to: string, token: string,
			timestamp: string, blockId: string, transactionId: string,
			sourceContractAddress: string
		): Erc721Transaction {
			let transaction = new Erc721Transaction(helpers.getNewEventId(
				sourceContractAddress, ADDRESS_ZERO, to, timestamp)
			)
			transaction.from = ADDRESS_ZERO
			transaction.to = to
			transaction.token = token
			transaction.block = blockId
			transaction.transaction = transactionId
			transaction.type = constants.TRANSACTION_MINT
			return transaction as Erc721Transaction
		}

		export function getNewBurn(
			from: string, token: string,
			timestamp: string, blockId: string, transactionId: string,
			sourceContractAddress: string
		): Erc721Transaction {
			let transaction = new Erc721Transaction(helpers.getNewEventId(
				sourceContractAddress, from, ADDRESS_ZERO, timestamp)
			)
			transaction.from = from
			transaction.to = ADDRESS_ZERO
			transaction.token = token
			transaction.block = blockId
			transaction.transaction = transactionId
			transaction.type = constants.TRANSACTION_BURN
			return transaction as Erc721Transaction
		}

		export function getNewTransfer(
			from: string, to: string,
			token: string, timestamp: string,
			blockId: string, transactionId: string,
			sourceContractAddress: string
		): Erc721Transaction {
			let transaction = new Erc721Transaction(helpers.getNewEventId(
				sourceContractAddress, from, to, timestamp)
			)
			transaction.from = from
			transaction.to = to
			transaction.token = token
			transaction.block = blockId
			transaction.transaction = transactionId
			transaction.type = constants.TRANSACTION_TRANSFER
			return transaction as Erc721Transaction
		}

	}
}
