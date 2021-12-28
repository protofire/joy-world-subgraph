import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { shared } from '..';
import { JoyToken, JoyToy } from "../../../generated/schema";

export namespace tokens {

	export namespace helpers {
		export function getTokenId(sourceContractAddress: string, id: string): string {
			return sourceContractAddress + "-" + id
		}
	}

	export namespace joyWorld {

		export function getOrCreateToken(
			sourceContractAddress: string, _tokenId: string, accountId: string
		): JoyToken {
			let tokenId = helpers.getTokenId(sourceContractAddress, _tokenId)
			let entity = JoyToken.load(tokenId)
			if (entity == null) {
				entity = new JoyToken(tokenId)
				entity.owner = accountId
			}
			return entity as JoyToken
		}

		export function mintToken(
			sourceContractAddress: string, tokenId: string, owner: string
		): JoyToken {
			let entity = getOrCreateToken(sourceContractAddress, tokenId, owner)
			entity.burned = false
			return entity as JoyToken
		}

		export function burnToken(
			sourceContractAddress: string,
			tokenId: string,
			owner: string
		): JoyToken {
			let entity = getOrCreateToken(sourceContractAddress, tokenId, owner)
			entity.burned = true
			entity.owner = ADDRESS_ZERO
			return entity as JoyToken
		}

		export function changeOwner(
			sourceContractAddress: string, tokenId: string, newOwner: string
		): JoyToken {
			let entity = getOrCreateToken(sourceContractAddress, tokenId, newOwner)
			entity.owner = newOwner
			return entity as JoyToken
		}

		export function setApproval(
			sourceContractAddress: string, tokenId: string, approval: string, owner: string
		): JoyToken {
			let entity = getOrCreateToken(sourceContractAddress, tokenId, owner)
			entity.approval = approval
			return entity as JoyToken
		}
	}
	export namespace joyToys {
		export function getOrCreateToken(sourceContractAddress: string, _tokenId: string, accountId: string): JoyToy {
			let tokenId = helpers.getTokenId(sourceContractAddress, _tokenId)
			let entity = JoyToy.load(tokenId)
			if (entity == null) {
				entity = new JoyToy(tokenId)
				entity.owner = accountId
			}
			return entity as JoyToy
		}

		export function mintToken(
			sourceContractAddress: string, tokenId: string, owner: string
		): JoyToy {
			let entity = getOrCreateToken(sourceContractAddress, tokenId, owner)
			entity.burned = false
			return entity as JoyToy
		}

		export function burnToken(
			sourceContractAddress: string,
			tokenId: string,
			owner: string
		): JoyToy {
			let entity = getOrCreateToken(sourceContractAddress, tokenId, owner)
			entity.burned = true
			entity.owner = ADDRESS_ZERO
			return entity as JoyToy
		}

		export function changeOwner(
			sourceContractAddress: string, tokenId: string, newOwner: string
		): JoyToy {
			let entity = getOrCreateToken(sourceContractAddress, tokenId, newOwner)
			entity.owner = newOwner
			return entity as JoyToy
		}

		export function setApproval(
			sourceContractAddress: string, tokenId: string, approval: string, owner: string
		): JoyToy {
			let entity = getOrCreateToken(sourceContractAddress, tokenId, owner)
			entity.approval = approval
			return entity as JoyToy
		}
	}
}