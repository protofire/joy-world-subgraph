import { assert } from "matchstick-as"

export namespace helpers {
	export function testBlock(
		blockId: string, timestamp: string, blockNumber: string
	): void {
		assert.fieldEquals("Block", blockId, "timestamp", timestamp)
		assert.fieldEquals("Block", blockId, "number", blockNumber)
	}
}