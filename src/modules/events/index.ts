import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit"
import { Approval, Erc721Transaction } from "../../../generated/schema"

export namespace events {

	export namespace helpers {
		export function getNewId(
			from: string, to: string, timestamp: string
		): string {
			return from + "-" + to + "-" + timestamp
		}
	}

	export namespace approvals {

		export function getOrCreateApproval(
			approved: string, owner: string, timestamp: string,
			token: string, transaction: string, block: string
		): Approval {
			let id = helpers.getNewId(approved, owner, timestamp)
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
			timestamp: string, blockId: string, transactionId: string
		): Erc721Transaction {
			let transaction = new Erc721Transaction(helpers.getNewId(ADDRESS_ZERO, to, timestamp))
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
			timestamp: string, blockId: string, transactionId: string
		): Erc721Transaction {
			let transaction = new Erc721Transaction(helpers.getNewId(from, ADDRESS_ZERO, timestamp))
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
			blockId: string, transactionId: string
		): Erc721Transaction {
			let transaction = new Erc721Transaction(helpers.getNewId(from, to, timestamp))
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
