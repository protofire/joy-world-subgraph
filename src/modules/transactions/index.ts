import { BigInt } from "@graphprotocol/graph-ts"
import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit"
import { Erc721Transaction } from "../../../generated/schema"

export namespace transactions {

	namespace constants {
		export let TRANSACTION_MINT = "MINT"
		export let TRANSACTION_BURN = "BURN"
		export let TRANSACTION_TRANSFER = "TRANSFER"
	}

	export namespace helpers {
		export function getNewTransactionId(
			from: string, to: string, timestamp: string
		): string {
			return from + "-" + to + "-" + timestamp
		}
	}

	export function getNewMint(
		to: string, token: string, timestamp: string, blockId: string
	): Erc721Transaction {
		let transaction = new Erc721Transaction(helpers.getNewTransactionId(ADDRESS_ZERO, to, timestamp))
		transaction.from = ADDRESS_ZERO
		transaction.to = to
		transaction.token = token
		transaction.block = blockId
		transaction.type = constants.TRANSACTION_MINT
		return transaction as Erc721Transaction
	}

	export function getNewBurn(
		from: string, token: string,
		timestamp: string, blockId: string
	): Erc721Transaction {
		let transaction = new Erc721Transaction(helpers.getNewTransactionId(from, ADDRESS_ZERO, timestamp))
		transaction.from = from
		transaction.to = ADDRESS_ZERO
		transaction.token = token
		transaction.block = blockId
		transaction.type = constants.TRANSACTION_BURN
		return transaction as Erc721Transaction
	}

	export function getNewTransfer(
		from: string, to: string,
		token: string, timestamp: string, blockId: string
	): Erc721Transaction {
		let transaction = new Erc721Transaction(helpers.getNewTransactionId(from, to, timestamp))
		transaction.from = from
		transaction.to = to
		transaction.token = token
		transaction.block = blockId
		transaction.type = constants.TRANSACTION_TRANSFER
		return transaction as Erc721Transaction
	}

}