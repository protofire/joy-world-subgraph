import { assert } from "matchstick-as"

export namespace helpers {
	export function testBlock(
		blockId: string, timestamp: string, blockNumber: string
	): void {
		assert.fieldEquals("Block", blockId, "timestamp", timestamp)
		assert.fieldEquals("Block", blockId, "number", blockNumber)
	}

	export function testTransaction(
		txId: string, blockId: string, txHash: string,
		from: string, gasLimit: string, gasPrice: string
	): void {
		assert.fieldEquals("Transaction", txId, "block", blockId)
		assert.fieldEquals("Transaction", txId, "hash", txHash)
		assert.fieldEquals("Transaction", txId, "from", from)
		assert.fieldEquals("Transaction", txId, "gasLimit", gasLimit)
		assert.fieldEquals("Transaction", txId, "gasPrice", gasPrice)
	}
}