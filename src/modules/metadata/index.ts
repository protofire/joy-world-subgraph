import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Block, Transaction } from "../../../generated/schema"

export namespace metadata {
	export namespace transactions {
		export function getOrCreateTransaction(
			id: string, blockId: string, hash: Bytes,
			from: Bytes, gasLimit: BigInt, gasPrice: BigInt
		): Transaction {
			let meta = Transaction.load(id)
			if (meta == null) {
				meta = new Transaction(id)
				meta.block = blockId
				meta.hash = hash
				meta.from = from
				meta.gasLimit = gasLimit
				meta.gasPrice = gasPrice
			}
			return meta as Transaction
		}
	}

	export namespace blocks {
		export function getOrCreateBlock(
			id: string, timestamp: BigInt, number: BigInt
		): Block {
			let block = Block.load(id)
			if (block == null) {
				block = new Block(id)
				block.timestamp = timestamp
				block.number = number
			}
			return block as Block
		}
	}
}