import { useAtom } from "jotai";
import { globalStateAtom } from "~/state/globalState";
  const [globalState, setGlobalState] = useAtom(globalStateAtom);
