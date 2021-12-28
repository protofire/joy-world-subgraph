import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit"
import { clearStore, test, assert } from "matchstick-as/assembly/index"
import { Transfer } from "../generated/joyWorld/joyWorld"
import { mappings } from "./mappingsWrapper"
import { events, metadata, tests as testsModule, tokens } from "../src/modules"
import { helpers } from "./helpers"

export function runJoyWorldTests(): void {
	test("joyWorld - handleMint",
		() => {
			let from = Address.fromString(ADDRESS_ZERO)
			let to = Address.fromString("0x7b7cc10852f215bcea3e684ef584eb2b7c24b8f7")
			let tokenId = BigInt.fromI32(666)

			let event = changetype<Transfer>(testsModule.helpers.events.getNewEvent(
				[
					testsModule.helpers.params.getAddress("from", from),
					testsModule.helpers.params.getAddress("to", to),
					testsModule.helpers.params.getBigInt("tokenId", tokenId)
				]
			))
			mappings.joyWorld.handleTransfer(event)
			let contractAddress = event.address.toHex()
			let toAsHex = to.toHex()

			// check block
			let blockId = metadata.helpers.getNewMetadataId(event.address.toHex(), event.block.number.toString())

			helpers.testBlock(
				blockId, event.block.timestamp.toString(), event.block.number.toString()
			)

			// check evm transaction
			let txHash = event.transaction.hash.toHexString()
			let txId = metadata.helpers.getNewMetadataId(contractAddress, txHash)

			helpers.testTransaction(
				txId, blockId, txHash, event.transaction.from.toHexString(),
				event.transaction.gasLimit.toString(), event.transaction.gasPrice.toString()
			)

			// check transaction event
			let timestampString = event.block.timestamp.toString()
			let erc721txId = events.helpers.getNewEventId(contractAddress, ADDRESS_ZERO, toAsHex, timestampString)
			assert.fieldEquals("Erc721Transaction", erc721txId, "from", event.params.from.toHex())
			assert.fieldEquals("Erc721Transaction", erc721txId, "to", toAsHex)
			assert.fieldEquals("Erc721Transaction", erc721txId, "token", event.params.tokenId.toHex())
			assert.fieldEquals("Erc721Transaction", erc721txId, "block", blockId)
			assert.fieldEquals("Erc721Transaction", erc721txId, "transaction", txId)
			assert.fieldEquals("Erc721Transaction", erc721txId, "type", events.transactions.constants.TRANSACTION_MINT)

			// check token
			let entityTokenId = tokens.helpers.getTokenId(contractAddress, tokenId.toHex())
			assert.fieldEquals("JoyToken", entityTokenId, "owner", toAsHex)

			// TODO
			/**
			 * Create a generic assert helper
			 * params:
			 * * entityName: string
			 * * entityId: string
			 * * fields: Array<TypedMap(key: string, vale: string)>
			 */

			clearStore()
		}
	)

}