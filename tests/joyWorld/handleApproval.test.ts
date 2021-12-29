import { Address, BigInt, TypedMap } from "@graphprotocol/graph-ts"
import { clearStore, assert } from "matchstick-as/assembly/index"
import { Approval } from "../../generated/joyWorld/joyWorld"
import { mappings } from "../helpers/mappingsWrapper"
import { events, metadata, tests, tokens } from "../../src/modules"
import { helpers } from "../helpers"

export function testHandleApproval(): void {
	let owner = Address.fromString("0x7b7cc10852f215bcea3e684ef584eb2b7c24b8f7")
	let approved = Address.fromString("0x9b9cc10852f215bcea3e684ef584eb2b7c24abc9")
	let tokenId = BigInt.fromI32(666)

	let event = changetype<Approval>(tests.helpers.events.getNewEvent(
		[
			tests.helpers.params.getAddress("owner", owner),
			tests.helpers.params.getAddress("approved", approved),
			tests.helpers.params.getBigInt("tokenId", tokenId)
		]
	))

	mappings.joyWorld.handleApproval(event)

	let contractAddress = event.address.toHex()
	let ownerAsHex = owner.toHex()
	let approvedAsHex = approved.toHex()

	// check block
	let blockId = metadata.helpers.getNewMetadataId(contractAddress, event.block.number.toString())

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

	// check approval event
	let entityTokenId = tokens.helpers.getTokenId(contractAddress, tokenId.toHex())

	let approvalEventParams = new TypedMap<string, string>()
	approvalEventParams.set("token", entityTokenId)
	approvalEventParams.set("transaction", txId)
	approvalEventParams.set("block", blockId)

	tests.helpers.runtime.assertMany(
		"Approval",
		events.helpers.getNewEventId(
			contractAddress, approvedAsHex, ownerAsHex,
			event.block.timestamp.toString()
		),
		approvalEventParams
	)

	// check token
	assert.fieldEquals("JoyToken", entityTokenId, "owner", ownerAsHex)
	assert.fieldEquals("JoyToken", entityTokenId, "approval", approvedAsHex)

	// TODO test owner

	clearStore()
}