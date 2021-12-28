import { test } from "matchstick-as/assembly/index"
import { testHandleMint } from "./handleMint";
import { testHandleBurn } from "./handleBurn";
import { testHandleTransfer } from "./handleTransfer";

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
	}
}