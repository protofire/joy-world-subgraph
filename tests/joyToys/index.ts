import { test } from "matchstick-as/assembly/index"
import { testHandleMint } from "./handleMint.test";
import { testHandleBurn } from "./handleBurn.test";
import { testHandleTransfer } from "./handleTransfer.test";
import { testHandleApproval } from "./handleApproval.test";
// import { testHandleApprovalForAll } from "./handleApprovalForAll.test";

export namespace joyToys {
	export function runtTests(): void {
		test("joyToys - handleMint",
			testHandleMint
		)
		test("joyToys - handleBurn",
			testHandleBurn
		)
		test("joyToys - handleTransfer",
			testHandleTransfer
		)
		test("joyToys - handleApproval",
			testHandleApproval
		)
		// test("joyToys - handleApprovalForAll",
		// 	testHandleApprovalForAll
		// )
	}
}