import { TypedMap } from "@graphprotocol/graph-ts"
import { tests } from "../../src/modules"

export namespace helpers {
	export function testBlock(
		blockId: string, timestamp: string, blockNumber: string
	): void {
		let params = new TypedMap<string, string>()
		params.set("timestamp", timestamp)
		params.set("number", blockNumber)

		tests.helpers.runtime.assertMany(
			"Block", blockId, params
		)
	}

	export function testTransaction(
		txId: string, blockId: string, txHash: string,
		from: string, gasLimit: string, gasPrice: string
	): void {
		let params = new TypedMap<string, string>()
		params.set("block", blockId)
		params.set("hash", txHash)
		params.set("from", from)
		params.set("gasLimit", gasLimit)
		params.set("gasPrice", gasPrice)

		tests.helpers.runtime.assertMany(
			"Transaction", txId, params
		)
	}

	export function testErc721Tx(
		erc721TxId: string, from: string, to: string,
		token: string, block: string, txId: string, type: string
	): void {

		let erc721TxParams = new TypedMap<string, string>()
		erc721TxParams.set("from", from)
		erc721TxParams.set("to", to)
		erc721TxParams.set("token", token)
		erc721TxParams.set("block", block)
		erc721TxParams.set("transaction", txId)
		erc721TxParams.set("type", type)

		tests.helpers.runtime.assertMany(
			"Erc721Transaction", erc721TxId, erc721TxParams
		)
	}
}