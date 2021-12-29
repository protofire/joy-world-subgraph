import { Address, log, TypedMap } from "@graphprotocol/graph-ts"
import { clearStore, assert } from "matchstick-as/assembly/index"
import { ApprovalForAll } from "../../generated/joyWorld/joyWorld"
import { accounts, events, metadata, tests } from "../../src/modules"

export function testHandleApprovalForAll(): void {
	let operator = Address.fromString("0x9b9cc10852f215bcea3e684ef584eb2b7c24abc9")
	let owner = Address.fromString("0x7b7cc10852f215bcea3e684ef584eb2b7c24b8f7")
	let approved = true

	let event = changetype<ApprovalForAll>(tests.helpers.events.getNewEvent(
		[
			tests.helpers.params.getAddress("owner", owner),
			tests.helpers.params.getAddress("operator", operator),
			tests.helpers.params.getBoolean("approved", approved)
		]
	))

	tests.mappingsWrapper.joyWorld.handleApprovalForAll(event)

	let contractAddress = event.address.toHex()
	let operatorAsHex = operator.toHex()
	let ownerAsHex = owner.toHex()

	// check block
	let blockId = metadata.helpers.getNewMetadataId(contractAddress, event.block.number.toString())

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

	// check owner
	assert.fieldEquals("Account", ownerAsHex, "address", ownerAsHex)

	// check operator
	assert.fieldEquals("Account", operatorAsHex, "address", operatorAsHex)

	// check approvalForAll event
	let operatorOwnerId = accounts.helpers.getOperatorOwnerId(operatorAsHex, ownerAsHex)

	let eventParams = new TypedMap<string, string>()
	eventParams.set("operatorOwner", operatorOwnerId)
	eventParams.set("transaction", txId)
	eventParams.set("block", blockId)

	// check operatorOwner
	assert.fieldEquals("OperatorOwner", operatorOwnerId, "operator", operatorAsHex)
	assert.fieldEquals("OperatorOwner", operatorOwnerId, "owner", ownerAsHex)

	// check ApprovalForAll event
	tests.helpers.runtime.assertMany(
		"ApprovalForAll",
		events.helpers.getNewEventId(
			contractAddress, operatorAsHex, ownerAsHex,
			event.block.timestamp.toString()
		),
		eventParams
	)

	clearStore()
}