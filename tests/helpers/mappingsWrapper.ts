import {
	handleTransfer as joyWorldHandleTransfer,
	handleApproval as joyWorldHandleApproval
} from "../../src/mappings/joyWorld"

export namespace mappings {
	export namespace joyWorld {
		export let handleTransfer = joyWorldHandleTransfer
		export let handleApproval = joyWorldHandleApproval
	}
}