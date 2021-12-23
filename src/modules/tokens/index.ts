import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { JoyToken, JoyToy } from "../../../generated/schema";

export namespace tokens {

	export namespace joyTokens {
		export function getOrCreateToken(_tokenId: string, accountId: string): JoyToken {
			let tokenId = "joyToken-".concat(_tokenId)
			let entity = JoyToken.load(tokenId)
			if (entity == null) {
				entity = new JoyToken(tokenId)
				entity.owner = accountId
			}
			return entity as JoyToken
		}

		export function mintToken(
			tokenId: string, owner: string
		): JoyToken {
			let entity = getOrCreateToken(tokenId, owner)
			entity.burned = false
			return entity as JoyToken
		}

		export function burnToken(
			tokenId: string,
			owner: string
		): JoyToken {
			let entity = getOrCreateToken(tokenId, owner)
			entity.burned = true
			entity.owner = ADDRESS_ZERO
			return entity as JoyToken
		}

		export function changeOwner(tokenId: string, newOwner: string): JoyToken {
			let entity = getOrCreateToken(tokenId, newOwner)
			entity.owner = newOwner
			return entity as JoyToken
		}

		export function setApproval(tokenId: string, approval: string, owner: string): JoyToken {
			let entity = getOrCreateToken(tokenId, owner)
			entity.approval = approval
			return entity as JoyToken
		}
	}
	export namespace joyToys {
		export function getOrCreateToken(_tokenId: string, accountId: string): JoyToy {
			let tokenId = "joyToy-".concat(_tokenId)
			let entity = JoyToken.load(tokenId)
			if (entity == null) {
				entity = new JoyToken(tokenId)
				entity.owner = accountId
			}
			return entity as JoyToy
		}

		export function mintToken(
			tokenId: string, owner: string
		): JoyToy {
			let entity = getOrCreateToken(tokenId, owner)
			entity.burned = false
			return entity as JoyToy
		}

		export function burnToken(
			tokenId: string,
			owner: string
		): JoyToy {
			let entity = getOrCreateToken(tokenId, owner)
			entity.burned = true
			entity.owner = ADDRESS_ZERO
			return entity as JoyToy
		}

		export function changeOwner(tokenId: string, newOwner: string): JoyToy {
			let entity = getOrCreateToken(tokenId, newOwner)
			entity.owner = newOwner
			return entity as JoyToy
		}

		export function setApproval(tokenId: string, approval: string, owner: string): JoyToy {
			let entity = getOrCreateToken(tokenId, owner)
			entity.approval = approval
			return entity as JoyToy
		}
	}
}