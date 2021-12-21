import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
// import { log } from '@graphprotocol/graph-ts'
import { JoyToken } from "../../../generated/schema";

export namespace tokens {

	export namespace joyTokens {
		export function getOrCreateToken(tokenId: string, accountId: string): JoyToken {
			let entity = JoyToken.load(tokenId)
			if (entity == null) {
				entity = new JoyToken(tokenId)
				// token.owner = accountId
			}
			return entity as JoyToken
		}
	}
}