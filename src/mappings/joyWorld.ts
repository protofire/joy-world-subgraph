import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit";
import { OwnershipRenounced__Params } from "../../../opensea-wyvern-exchange-subgraph/generated/openseaWyvernExchange/openseaWyvernExchange";
import {
	Approval,
	ApprovalForAll,
	Transfer
} from "../../generated/joyWorld/joyWorld";
import { events, metadata } from "../modules";

import { joyWorld as joyWorldHelpers } from "./helpers";

export function handleApproval(event: Approval): void {
	let ownerId = event.params.owner.toHex()
	let approvedId = event.params.approved.toHex()
	let tokenId = event.params.tokenId.toHex()


	let blockNumber = event.block.number
	let blockId = blockNumber.toString()
	let txHash = event.transaction.hash
	let timestamp = event.block.timestamp

	let block = metadata.blocks.getOrCreateBlock(blockId, timestamp, blockNumber)
	block.save()

	let transaction = metadata.transactions.getOrCreateTransaction(
		txHash.toHexString(),
		blockId,
		txHash,
		event.transaction.from,
		event.transaction.gasLimit,
		event.transaction.gasPrice,
	)
	transaction.save()

	let approval = events.approvals.getOrCreateApproval(
		approvedId,
		ownerId,
		timestamp.toString(),
		tokenId,
		transaction.id,
		block.id
	)
	approval.save()
}

export function handleApprovalForAll(event: ApprovalForAll): void {
	let blockNumber = event.block.number
	let blockId = blockNumber.toString()
	let txHash = event.transaction.hash
	let timestamp = event.block.timestamp

	let block = metadata.blocks.getOrCreateBlock(blockId, timestamp, blockNumber)
	block.save()

	let transaction = metadata.transactions.getOrCreateTransaction(
		txHash.toHexString(),
		blockId,
		txHash,
		event.transaction.from,
		event.transaction.gasLimit,
		event.transaction.gasPrice,
	)
	transaction.save()
}

export function handleTransfer(event: Transfer): void {
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()
	let tokenId = event.params.tokenId.toHex()
	let blockNumber = event.block.number
	let blockId = blockNumber.toString()
	let txHash = event.transaction.hash
	let timestamp = event.block.timestamp

	let block = metadata.blocks.getOrCreateBlock(blockId, timestamp, blockNumber)
	block.save()

	let transaction = metadata.transactions.getOrCreateTransaction(
		txHash.toHexString(),
		blockId,
		txHash,
		event.transaction.from,
		event.transaction.gasLimit,
		event.transaction.gasPrice,
	)
	transaction.save()

	if (from == ADDRESS_ZERO) {
		joyWorldHelpers.transfers.handleMint(
			event.params.to, tokenId, timestamp, block.id, transaction.id
		)
	} else if (to == ADDRESS_ZERO) {
		joyWorldHelpers.transfers.handleBurn(
			event.params.from, tokenId, timestamp, block.id, transaction.id
		)
	} else {
		joyWorldHelpers.transfers.handleRegularTransfer(
			event.params.from, event.params.to, tokenId, timestamp, block.id, transaction.id
		)
	}
}
