import { useMemo, useSyncExternalStore } from 'react'

export { useSyncExternalStore }

export function useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return useMemo(() => {
    const selected = selector(snapshot)
    return selected
  }, [snapshot, selector, isEqual])
}

export default {
  useSyncExternalStore,
  useSyncExternalStoreWithSelector,
}