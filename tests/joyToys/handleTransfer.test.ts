import { Address, BigInt } from "@graphprotocol/graph-ts"
import { clearStore, assert } from "matchstick-as/assembly/index"
import { Transfer } from "../../generated/joyToys/joyToys"
import { events, metadata, tests, tokens } from "../../src/modules"

export function testHandleTransfer(): void {
	let from = Address.fromString("0x7b7cc10852f215bcea3e684ef584eb2b7c24b8f7")
	let to = Address.fromString("0x9b9cc10852f215bcea3e684ef584eb2b7c24abc9")
	let tokenId = BigInt.fromI32(666)

	let event = changetype<Transfer>(tests.helpers.events.getNewEvent(
		[
			tests.helpers.params.getAddress("from", from),
			tests.helpers.params.getAddress("to", to),
			tests.helpers.params.getBigInt("tokenId", tokenId)
		]
	))

	tests.mappingsWrapper.joyToys.handleTransfer(event)

	let contractAddress = event.address.toHex()
	let toAsHex = to.toHex()
	let fromAsHex = from.toHex()

	// check block
	let blockId = metadata.helpers.getNewMetadataId(
		contractAddress, event.block.number.toString()
	)

	tests.helpers.runtime.testBlock(
		blockId, event.block.timestamp.toString(), event.block.number.toString()
	)

	// check evm transaction
	let txHash = event.transaction.hash.toHexString()
	let txId = metadata.helpers.getNewMetadataId(contractAddress, txHash)

	tests.helpers.runtime.testTransaction(
		txId, blockId, txHash, event.transaction.from.toHexString(),
		event.transaction.gasLimit.toString(), event.transaction.gasPrice.toString()
	)

	// check transaction event
	let timestampString = event.block.timestamp.toString()
	let erc721txId = events.helpers.getNewEventId(
		contractAddress, fromAsHex, toAsHex, timestampString
	)

	tests.helpers.runtime.testErc721Tx(
		erc721txId,
		fromAsHex,
		toAsHex,
		event.params.tokenId.toHex(),
		blockId,
		txId,
		events.transactions.constants.TRANSACTION_TRANSFER
	)

	// check token
	let entityTokenId = tokens.helpers.getTokenId(contractAddress, tokenId.toHex())
	assert.fieldEquals("JoyToy", entityTokenId, "owner", toAsHex)

	// check seller
	assert.fieldEquals("Account", toAsHex, "address", toAsHex)

	// check buyer
	assert.fieldEquals("Account", fromAsHex, "address", fromAsHex)


	clearStore()
}