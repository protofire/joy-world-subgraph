import { handleTransfer, handleApproval, handleApprovalForAll } from "../src/mappings/joyWorld"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit"
import { clearStore, test, assert } from "matchstick-as/assembly/index"
import { Transfer, Approval, ApprovalForAll } from "../generated/joyWorld/joyWorld"
// import { accounts, tests as testsModule, transactions } from "../src/modules"

test("testing matschtick",
	() => {
		let from = Address.fromString("0x9b9cc10852f215bcea3e684ef584eb2b7c24b8f7") // this works
		let to = Address.fromString("0x7b7cc10852f215bcea3e684ef584eb2b7c24b8f7")
		let tokenId = BigInt.fromI32(666)
		// let event = changetype<Transfer>(testsModule.helpers.events.getNewEvent(
		// 	[
		// 		testsModule.helpers.params.getAddress("from", from),
		// 		testsModule.helpers.params.getAddress("to", to),
		// 		testsModule.helpers.params.getBigInt("tokenId", tokenId)
		// 	]
		// ))
		// handleTest(event)
		// assert.fieldEquals("Token", tokenId.toHexString(), "owner", to.toHexString())
		clearStore()
	}
)
