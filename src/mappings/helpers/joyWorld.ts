import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { accounts, tokens, events } from "../../modules"

export namespace joyWorld {
	export namespace transfers {
		export function handleMint(
			sourceContractAddress: string,
			to: Bytes, tokenId: string,
			timestamp: BigInt, blockId: string,
			transactionId: string
		): void {
			let account = accounts.getOrCreateAccount(to)
			account.save()

			let token = tokens.joyWorld.mintToken(sourceContractAddress, tokenId, account.id)
			token.save()

			let transaction = events.transactions.getNewMint(
				sourceContractAddress, account.id, tokenId,
				timestamp.toString(), blockId, transactionId
			)
			transaction.save()
		}

		export function handleBurn(
			sourceContractAddress: string,
			from: Bytes, tokenId: string,
			timestamp: BigInt, blockId: string,
			transactionId: string
		): void {
			let account = accounts.getOrCreateAccount(from)
			account.save()

			let token = tokens.joyWorld.burnToken(sourceContractAddress, tokenId, account.id)
			token.save()

			let transaction = events.transactions.getNewBurn(
				sourceContractAddress, account.id, tokenId,
				timestamp.toString(), blockId, transactionId
			)
			transaction.save()
		}

		export function handleRegularTransfer(
			sourceContractAddress: string,
			from: Bytes, to: Bytes,
			tokenId: string, timestamp: BigInt,
			blockId: string, transactionId: string
		): void {
			let seller = accounts.getOrCreateAccount(from)
			seller.save()

			let buyer = accounts.getOrCreateAccount(to)
			buyer.save()

			let token = tokens.joyToys.changeOwner(sourceContractAddress, tokenId, buyer.id)
			token.save()

			let transaction = events.transactions.getNewTransfer(
				sourceContractAddress, seller.id, buyer.id, tokenId,
				timestamp.toString(), blockId, transactionId
			)
			transaction.save()
		}
	}
}