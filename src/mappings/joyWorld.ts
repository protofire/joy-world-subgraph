import { log } from "@graphprotocol/graph-ts";
import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit";
import {
	Approval,
	ApprovalForAll,
	Transfer
} from "../../generated/joyWorld/joyWorld";
import { accounts, events, metadata, tokens } from "../modules";

import { joyWorld as joyWorldHelpers } from "./helpers";

export function handleApproval(event: Approval): void {
	let contractAddress = event.address.toHex()
	let ownerAddress = event.params.owner
	let approvedAddress = event.params.approved
	let tokenId = event.params.tokenId.toHex()

	let blockNumber = event.block.number
	let blockId = blockNumber.toString()
	let txHash = event.transaction.hash
	let timestamp = event.block.timestamp

	let block = metadata.blocks.getOrCreateBlock(
		blockId, timestamp, blockNumber, contractAddress
	)
	block.save()

	let transaction = metadata.transactions.getOrCreateTransaction(
		txHash.toHexString(),
		block.id,
		txHash,
		event.transaction.from,
		event.transaction.gasLimit,
		event.transaction.gasPrice,
		contractAddress
	)
	transaction.save()

	let approved = accounts.getOrCreateAccount(approvedAddress)
	approved.save()

	let owner = accounts.getOrCreateAccount(ownerAddress)
	owner.save()

	let token = tokens.joyWorld.setApproval(contractAddress, tokenId, approved.id, owner.id)
	token.save()

	let approval = events.approvals.getOrCreateApproval(
		contractAddress,
		approvedAddress.toHex(),
		ownerAddress.toHex(),
		timestamp.toString(),
		token.id,
		transaction.id,
		block.id
	)
	approval.save()
}

export function handleApprovalForAll(event: ApprovalForAll): void {
	let contractAddress = event.address.toHex()
	let operatorAddress = event.params.operator
	let ownerAddress = event.params.owner
	let blockNumber = event.block.number
	let blockId = blockNumber.toString()
	let txHash = event.transaction.hash
	let timestamp = event.block.timestamp

	let block = metadata.blocks.getOrCreateBlock(
		blockId, timestamp, blockNumber, contractAddress
	)
	block.save()

	let transaction = metadata.transactions.getOrCreateTransaction(
		txHash.toHexString(),
		block.id,
		txHash,
		event.transaction.from,
		event.transaction.gasLimit,
		event.transaction.gasPrice,
		contractAddress
	)
	transaction.save()

	let owner = accounts.getOrCreateAccount(ownerAddress)
	owner.save()

	let operator = accounts.getOrCreateAccount(operatorAddress)
	operator.save()

	let operatorOwner = accounts.getOrCreateOperatorOwner(
		operator.id, owner.id, event.params.approved
	)
	operatorOwner.save()

	let approvalForAll = events.operators.getOrCreateApprovalForAll(
		contractAddress,
		operator.id,
		owner.id,
		timestamp.toString(),
		operatorOwner.id,
		transaction.id,
		block.id
	)
	approvalForAll.save()
}

export function handleTransfer(event: Transfer): void {
	let contractAddress = event.address.toHex()
	let from = event.params.from.toHex()
	let to = event.params.to.toHex()
	let tokenId = event.params.tokenId.toHex()
	let blockNumber = event.block.number
	let blockId = blockNumber.toString()
	let txHash = event.transaction.hash
	let timestamp = event.block.timestamp

	let block = metadata.blocks.getOrCreateBlock(
		blockId, timestamp, blockNumber, contractAddress
	)
	block.save()

	let transaction = metadata.transactions.getOrCreateTransaction(
		txHash.toHexString(),
		block.id,
		txHash,
		event.transaction.from,
		event.transaction.gasLimit,
		event.transaction.gasPrice,
		contractAddress
	)
	transaction.save()

	if (from == ADDRESS_ZERO) {
		joyWorldHelpers.transfers.handleMint(
			contractAddress, event.params.to,
			tokenId, timestamp, block.id, transaction.id
		)
	} else if (to == ADDRESS_ZERO) {
		joyWorldHelpers.transfers.handleBurn(
			contractAddress, event.params.from, tokenId,
			timestamp, block.id, transaction.id
		)
	} else {
		joyWorldHelpers.transfers.handleRegularTransfer(
			contractAddress, event.params.from, event.params.to,
			tokenId, timestamp, block.id, transaction.id
		)
	}
}
