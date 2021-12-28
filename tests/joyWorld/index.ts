import { test } from "matchstick-as/assembly/index"
import { testHandleMint } from "./handleMint";
import { testHandleBurn } from "./handleBurn";

export namespace joyWorld {
	export function runtTests(): void {
		test("joyWorld - handleMint",
			testHandleMint
		)
		test("joyWorld - handleBurn",
			testHandleBurn
		)
	}
}