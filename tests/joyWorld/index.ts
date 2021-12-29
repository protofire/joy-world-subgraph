import { test } from "matchstick-as/assembly/index"
import { testHandleMint } from "./handleMint.test";
import { testHandleBurn } from "./handleBurn.test";
import { testHandleTransfer } from "./handleTransfer.test";
import { testHandleApproval } from "./handleApproval.test";

export namespace joyWorld {
	export function runtTests(): void {
		test("joyWorld - handleMint",
			testHandleMint
		)
		test("joyWorld - handleBurn",
			testHandleBurn
		)
		test("joyWorld - handleTransfer",
			testHandleTransfer
		)
		test("joyWorld - handleApproval",
			testHandleApproval
		)
	}
}