import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit"
import { clearStore, assert } from "matchstick-as/assembly/index"
import { Transfer } from "../../generated/joyWorld/joyWorld"
import { mappings } from "../mappingsWrapper"
import { events, metadata, tests, tokens } from "../../src/modules"
import { helpers } from "../helpers"

export function testHandleMint(): void {
	let from = Address.fromString(ADDRESS_ZERO)
	let to = Address.fromString("0x7b7cc10852f215bcea3e684ef584eb2b7c24b8f7")
	let tokenId = BigInt.fromI32(666)

	let event = changetype<Transfer>(tests.helpers.events.getNewEvent(
		[
			tests.helpers.params.getAddress("from", from),
			tests.helpers.params.getAddress("to", to),
			tests.helpers.params.getBigInt("tokenId", tokenId)
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

	helpers.testErc721Tx(
		erc721txId,
		event.params.from.toHex(),
		toAsHex,
		event.params.tokenId.toHex(),
		blockId,
		txId,
		events.transactions.constants.TRANSACTION_MINT
	)

	// check token
	let entityTokenId = tokens.helpers.getTokenId(contractAddress, tokenId.toHex())
	assert.fieldEquals("JoyToken", entityTokenId, "owner", toAsHex)

	clearStore()
}