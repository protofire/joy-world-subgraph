import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { JoyToken } from "../../../generated/schema";

export namespace tokens {

	export namespace joyTokens {
		export function getOrCreateToken(tokenId: string, accountId: string): JoyToken {
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

		export function changeOwner(tokenId: string, owner: string): JoyToken {
			let entity = getOrCreateToken(tokenId, owner)
			entity.owner = owner
			return entity as JoyToken
		}

		export function setApproval(tokenId: string, approval: string, owner: string): JoyToken {
			let entity = getOrCreateToken(tokenId, owner)
			entity.approval = approval
			return entity as JoyToken
		}
	}
}